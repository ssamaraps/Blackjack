import { NextRequest, NextResponse } from 'next/server';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponseBody {
  access_token: string;
  username: string;
}

export async function POST(req: NextRequest) {
  const body: LoginRequestBody = await req.json();

  if (!body.email || !body.password) {
    return NextResponse.json({ error: 'Campos obrigatórios' }, { status: 400 });
  }

  if (body.password === process.env.NEXT_PUBLIC_TEST_PASSWORD && body.email === process.env.NEXT_PUBLIC_TEST_EMAIL) {
    return NextResponse.json({
      access_token: 'token_simulado_123',
      username: body.email, 
    } as LoginResponseBody);
  } else {
    return NextResponse.json({ error: 'Inválido' }, { status: 401 });
  }
}
