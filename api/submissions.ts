import { getDb } from '../db.js';
import {
  readSessionCookie,
  verifySessionToken,
} from './auth.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const sessionToken = readSessionCookie(
      req.headers.cookie
    );

    if (
      !sessionToken ||
      !(await verifySessionToken(sessionToken))
    ) {
      return res.status(401).json({
        error: 'Administrative authentication is required.',
      });
    }

    const dbHelper = await getDb();
    const { contacts, applications } =
      await dbHelper.getSubmissions();

    return res.status(200).json({
      contacts,
      applications,
    });
  } catch (error: any) {
    console.error(
      'Error fetching administrative submissions:',
      error
    );

    return res.status(500).json({
      error: 'Failed to retrieve database entries.',
    });
  }
}
