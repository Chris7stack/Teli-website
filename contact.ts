import { getDb } from './db';

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required contact fields.' });
    }

    // Save to Postgres/SQLite database so it shows in the Admin Dashboard
    const dbHelper = await getDb();
    const insertedId = await dbHelper.insertContact(req.body);

    return res.status(200).json({
      success: true,
      id: insertedId,
      emailSent: false,
      reason: "Email dispatch disabled by request."
    });
  } catch (error: any) {
    console.error('Error handling contact submission on Vercel:', error);
    return res.status(500).json({ error: 'Failed to process submission.', details: error.message });
  }
}
