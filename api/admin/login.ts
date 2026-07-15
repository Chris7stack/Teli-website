import {
  createSessionToken,
  getSessionCookie,
} from './auth.js';

import {
  adminLoginRateLimit,
  getClientIp,
} from '../rateLimit.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const clientIp = getClientIp(req);
    const rateLimitResult = await adminLoginRateLimit.limit(clientIp);

    res.setHeader(
      'X-RateLimit-Limit',
      rateLimitResult.limit.toString()
    );
    res.setHeader(
      'X-RateLimit-Remaining',
      rateLimitResult.remaining.toString()
    );
    res.setHeader(
      'X-RateLimit-Reset',
      rateLimitResult.reset.toString()
    );

    if (!rateLimitResult.success) {
      return res.status(429).json({
        error:
          'Too many login attempts. Please wait 15 minutes and try again.',
      });
    }

    const providedPassword =
      typeof req.body?.password === 'string'
        ? req.body.password
        : '';

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD is not configured.');

      return res.status(500).json({
        error:
          'Administrative authentication is not configured.',
      });
    }

    if (
      !providedPassword ||
      providedPassword !== adminPassword
    ) {
      return res.status(401).json({
        error: 'Invalid administrative password.',
      });
    }

    const sessionToken = await createSessionToken();

    res.setHeader(
      'Set-Cookie',
      getSessionCookie(sessionToken)
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    console.error('Admin login error:', error);

    return res.status(500).json({
      error:
        'Unable to establish an administrative session.',
    });
  }
}
