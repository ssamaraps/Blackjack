import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const correctEmail = process.env.TEST_EMAIL;
  const correctPassword = process.env.TEST_PASSWORD;

  if (email === correctEmail && password === correctPassword) {
    // Simula token (pode futuramente ser JWT)
    const token = 'token-simulado-login-ok';
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json(
    { success: false, message: 'E-mail ou senha inválidos.' },
    { status: 401 }
  );
}
