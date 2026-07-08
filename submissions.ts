import Database from 'better-sqlite3';

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

    // Initialize/retrieve SQLite database
    const db = new Database('submissions.db');

    // Make sure tables exist before querying
    db.exec(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT,
        institution TEXT,
        role TEXT,
        program TEXT,
        message TEXT,
        timestamp TEXT
      );

      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT,
        institution TEXT,
        role TEXT,
        experience TEXT,
        statement TEXT,
        challenges TEXT,
        mentor_preference TEXT,
        resume_name TEXT,
        resume_base64 TEXT,
        app_ref_id TEXT,
        timestamp TEXT
      );
    `);

    const contacts = db.prepare('SELECT * FROM contact_submissions ORDER BY id DESC').all();
    const applications = db.prepare('SELECT * FROM applications ORDER BY id DESC').all();

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
