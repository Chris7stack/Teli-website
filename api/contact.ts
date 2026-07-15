import { getDb } from './db.js';

import {
  contactRateLimit,
  getClientIp,
} from './rateLimit.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const clientIp = getClientIp(req);
    const rateLimitResult = await contactRateLimit.limit(clientIp);

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
          'Too many contact submissions. Please wait before trying again.',
      });
    }

    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        error: 'Missing required contact fields.',
      });
    }

    const dbHelper = await getDb();
    const insertedId = await dbHelper.insertContact(req.body);

    return res.status(200).json({
      success: true,
      id: insertedId,
      emailSent: false,
      reason: 'Email dispatch disabled by request.',
    });
  } catch (error: any) {
    console.error(
      'Error handling contact submission on Vercel:',
      error
    );

    return res.status(500).json({
      error: 'Failed to process submission.',
      details: error.message,
    });
  }
}
