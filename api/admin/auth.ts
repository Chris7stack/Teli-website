import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'teli_admin_session';
const SESSION_DURATION_SECONDS = 60 * 60; // 1 hour

function getSessionSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      'SESSION_SECRET must be configured and contain at least 32 characters.'
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({
    role: 'admin',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject('teli-admin')
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(
  token: string
): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      algorithms: ['HS256'],
      subject: 'teli-admin',
    });

    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export function getSessionCookie(token: string): string {
  return [
    `${COOKIE_NAME}=${token}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${SESSION_DURATION_SECONDS}`,
  ].join('; ');
}

export function getExpiredSessionCookie(): string {
  return [
    `${COOKIE_NAME}=`,
    'HttpOnly',
    'Secure',
   'SameSite=Lax',
    'Path=/',
    'Max-Age=0',
  ].join('; ');
}

export function readSessionCookie(
  cookieHeader?: string
): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map(cookie => cookie.trim());

  const sessionCookie = cookies.find(cookie =>
    cookie.startsWith(`${COOKIE_NAME}=`)
  );

  if (!sessionCookie) {
    return null;
  }

  return sessionCookie.substring(`${COOKIE_NAME}=`.length);
}
