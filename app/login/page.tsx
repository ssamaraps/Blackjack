'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', email);
        router.push('/blackjack');
      } else {
        setError(data.message || 'Falha no login.');
      }
    } catch {
      setError('Erro ao conectar ao servidor.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-950 to-black text-yellow-100 p-6">
      <div className="login-container bg-[#1a0826]/90 backdrop-blur-sm border border-yellow-400/30 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">🎴 Login Blackjack</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-md bg-foreground text-background border border-accent outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-md bg-foreground text-background border border-accent outline-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="button button-primary mt-2 w-full">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
