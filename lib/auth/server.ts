import { cookies } from 'next/headers';
import { forbidden, redirect } from 'next/navigation';
import { cache } from 'react';

import { ROUTES } from '@/core/constants/routes.constant';

import { Role } from './roles';

type TokenPayload = {
  sub: number;
  email: string;
  role: Role;
};

const decodeAccessToken = (token: string): TokenPayload => {
  const payloadB64 = token.split('.')[1];
  const json = Buffer.from(payloadB64, 'base64url').toString('utf8');

  return JSON.parse(json) as TokenPayload;
};

const getServerToken = cache(async (): Promise<string | undefined> => {
  const cookieStore = await cookies();

  return cookieStore.get('accessToken')?.value;
});

const requireToken = async (): Promise<string> => {
  const token = await getServerToken();
  if (!token) redirect(ROUTES.auth.signIn);

  return token;
};

const requireRole = async (role: Role): Promise<string> => {
  const token = await requireToken();
  const payload = decodeAccessToken(token);
  if (payload.role !== role) forbidden();

  return token;
};

const redirectIfAuthenticated = async (): Promise<void> => {
  const token = await getServerToken();
  if (token) redirect(ROUTES.home);
};

export { requireToken, requireRole, redirectIfAuthenticated, decodeAccessToken, Role };
