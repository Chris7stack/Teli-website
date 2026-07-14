import { getDb } from '../db.js';

export default async function handler(req: any, res: any) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'teli2027';
    const providedToken = req.headers.authorization?.split(' ')[1] || req.query.token;

    if (!providedToken || providedToken !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized access. Invalid or missing admin credential.' });
    }

    // Get DB helper (PostgreSQL or SQLite)
    const dbHelper = await getDb();
    const { contacts, applications } = await dbHelper.getSubmissions();

    return res.status(200).json({
      contacts,
      applications,
    });
  } catch (error: any) {
    console.error('Error fetching submissions on Vercel serverless endpoint:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve database entries.', 
      details: error.message 
    });
  }
}
