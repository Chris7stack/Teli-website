import { getDb } from './api/db';

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      statement,
      challenges,
    } = req.body;

    if (!firstName || !lastName || !email || !statement || !challenges) {
      return res.status(400).json({ error: 'Missing required application fields.' });
    }

    // Save to Postgres/SQLite database so it shows in the Admin Dashboard
    const dbHelper = await getDb();
    const insertedId = await dbHelper.insertApplication(req.body);

    return res.status(200).json({
      success: true,
      id: insertedId,
      emailSent: false,
      reason: "Email dispatch disabled by request."
    });
  } catch (error: any) {
    console.error('Error handling application submission on Vercel:', error);
    return res.status(500).json({ error: 'Failed to process application.', details: error.message });
  }
}
