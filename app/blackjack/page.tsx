'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Card {
  code: string;
  value: string;
  suit: string;
  image: string;
}

interface DrawResponse {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
}

type GameStatus =
  | 'Esperando Nova Rodada'
  | 'Jogando'
  | 'Blackjack!'
  | 'Perdeu'
  | 'Stand'
  | 'Fim de Jogo';

function calculatePoints(cards: Card[]) {
  let points = 0;
  let aces = 0;

  for (const card of cards) {
    if (['KING', 'QUEEN', 'JACK'].includes(card.value)) points += 10;
    else if (card.value === 'ACE') {
      points += 11;
      aces += 1;
    } else points += parseInt(card.value);

    while (points > 21 && aces > 0) {
      points -= 10;
      aces -= 1;
    }
  }
  return points;
}

export default function BlackjackPage() {
  const router = useRouter();
  const [deckId, setDeckId] = useState('');
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [hiddenDealerCards, setHiddenDealerCards] = useState<Card[]>([]);
  const [status, setStatus] = useState<GameStatus>('Esperando Nova Rodada');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const createDeck = async () => {
    try {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
      const data = await res.json();

      const newDeckId = data.deck_id;
      setDeckId(newDeckId);

      const drawRes = await fetch(
        `https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=4`
      );
      const drawData: DrawResponse = await drawRes.json();

      const playerInit = [drawData.cards[0], drawData.cards[1]];
      const dealerInit = [drawData.cards[2], drawData.cards[3]];

      setPlayerCards(playerInit);
      setHiddenDealerCards(dealerInit);
      setDealerCards([]);
      setStatus('Jogando');
      setResult('');
    } catch (err) {
      console.error('Erro ao criar deck:', err);
    }
  };

  // 🂡 Jogador puxa carta
  const drawCard = async () => {
    if (!deckId || status !== 'Jogando') return;

    try {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data: DrawResponse = await res.json();

      const newCard = data.cards[0];
      const updatedPlayer = [...playerCards, newCard];
      setPlayerCards(updatedPlayer);

      const playerPoints = calculatePoints(updatedPlayer);

      if (playerPoints > 21) {
        setStatus('Perdeu');
        setResult('💀 Dealer Ganhou!');
        setDealerCards(hiddenDealerCards);
        return;
      }

      let dealerTemp = [...hiddenDealerCards];
      let dealerPoints = calculatePoints(dealerTemp);
      if (dealerPoints < 17) {
        const dealerRes = await fetch(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
        const dealerData: DrawResponse = await dealerRes.json();
        dealerTemp.push(dealerData.cards[0]);
      }
      setHiddenDealerCards(dealerTemp);

      if (playerPoints === 21) setStatus('Blackjack!');
      else setStatus('Jogando');
    } catch (err) {
      console.error('Erro ao puxar carta:', err);
    }
  };

  const stand = async () => {
    if (!deckId) return;

    let dealerTemp = [...hiddenDealerCards];
    let dealerPoints = calculatePoints(dealerTemp);

    while (dealerPoints < 17) {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data: DrawResponse = await res.json();
      dealerTemp.push(data.cards[0]);
      dealerPoints = calculatePoints(dealerTemp);
    }

    setDealerCards(dealerTemp);
    const playerPoints = calculatePoints(playerCards);

    if (dealerPoints > 21 || playerPoints > dealerPoints) setResult('🎉 Você Ganhou!');
    else if (dealerPoints === playerPoints) setResult('🤝 Empate!');
    else setResult('💀 Dealer Ganhou!');

    setStatus('Fim de Jogo');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-950 to-black text-yellow-100 p-6">
      <div className="bg-[rgba(26,8,38,0.9)] backdrop-blur-sm border border-yellow-400/30 rounded-2xl shadow-2xl p-8 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-2 text-yellow-400">🃏 Blackjack</h1>
        <p className="text-yellow-200/70 mb-6">
          Tente chegar o mais próximo de 21 sem ultrapassar!
        </p>

        <div className="bg-[rgba(42,18,64,0.7)] rounded-lg p-4 mb-6 border border-yellow-500/20">
          <p>
            Status:{' '}
            <span className="font-semibold text-yellow-300">{status}</span>
          </p>
          {result && (
            <p className="text-lg text-yellow-400 font-bold mt-2 animate-pulse">
              {result}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="font-semibold mb-2 text-yellow-400">Jogador</h2>
            <div className="flex justify-center flex-wrap gap-2 mb-2">
              {playerCards.map((card) => (
                <img
                  key={card.code}
                  src={card.image}
                  alt={card.code}
                  className="w-20 rounded-md shadow-md"
                />
              ))}
            </div>
            <p className="text-sm text-yellow-200/70">
              Pontuação: {calculatePoints(playerCards)}
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2 text-yellow-400">Dealer</h2>
            <div className="flex justify-center flex-wrap gap-2 mb-2">
              {dealerCards.map((card) => (
                <img
                  key={card.code}
                  src={card.image}
                  alt={card.code}
                  className="w-20 rounded-md shadow-md"
                />
              ))}
            </div>
            <p className="text-sm text-yellow-200/70">
              {status === 'Fim de Jogo'
                ? `Pontuação: ${calculatePoints(
                    dealerCards.length ? dealerCards : hiddenDealerCards
                  )}`
                : 'Pontuação: ?'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={createDeck}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition"
          >
            Nova Rodada
          </button>
          <button
            onClick={drawCard}
            disabled={status !== 'Jogando'}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Pedir Carta
          </button>
          <button
            onClick={stand}
            disabled={status !== 'Jogando'}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Parar
          </button>
          <button
            onClick={logout}
            className="bg-gray-700 hover:bg-gray-800 text-yellow-200 px-4 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
