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

    const emailCorreto = process.env.NEXT_PUBLIC_TEST_EMAIL;
    const senhaCorreta = process.env.NEXT_PUBLIC_TEST_PASSWORD;

    if (email === emailCorreto && password === senhaCorreta) {
      localStorage.setItem('token', 'token-simulado-login-ok');
      localStorage.setItem('username', email);
      router.push('/blackjack');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="login-container">
        <h1 className="text-3xl font-bold mb-6">🎴 Login Blackjack</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button type="submit" className="button button-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
