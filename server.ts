import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { getDb } from './db';

const app = express();
const PORT = 3000;

// Set up json parser with standard sizing for base64 resumes
app.use(express.json({ limit: '15mb' }));

// Initialize DB schema on boot
getDb().catch(err => {
  console.error('Failed to initialize database schema on boot:', err);
});

// Email sending helper
async function sendMail({ to, subject, text, html, attachments }: {
  to: string;
  subject: string;
  text?: string;
  html: string;
  attachments?: any[];
}) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || 'no-reply@teli-global.org';

  if (!host || !user || !pass) {
    console.warn(`
======================================================================
⚠️  EMAIL DISPATCH NOTICE
An email dispatch was triggered to: [ ${to} ]
Subject: ${subject}

SMTP environment variables are not yet configured in your Settings panel.
Please define the following variables in AI Studio to enable live email delivery:
  - SMTP_HOST (e.g., smtp.gmail.com)
  - SMTP_PORT (e.g., 465 or 587)
  - SMTP_USER (e.g., your-email@domain.com)
  - SMTP_PASS (your email/app password)
  - SMTP_FROM (e.g., info@teli-global.org)

Submissions have been securely saved to the local SQLite database submissions.db!
======================================================================
    `);
    return { success: false, reason: 'SMTP not configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port || '465'),
      secure: port === '465',
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      attachments,
    });

    console.log(`✉️ Email successfully delivered to ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    return { success: false, error: error.message };
  }
}

// API Endpoints
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required contact fields.' });
    }

    // Save to DB using getDb helper
    const dbHelper = await getDb();
    const insertedId = await dbHelper.insertContact(req.body);

    res.status(200).json({
      success: true,
      id: insertedId,
      emailSent: false,
      reason: "Email dispatch disabled by request."
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    res.status(500).json({ error: 'Failed to process submission.', details: error.message });
  }
});

app.post('/api/apply', async (req, res) => {
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

    // Save to DB using getDb helper
    const dbHelper = await getDb();
    const insertedId = await dbHelper.insertApplication(req.body);

    res.status(200).json({
      success: true,
      id: insertedId,
      emailSent: false,
      reason: "Email dispatch disabled by request."
    });
  } catch (error: any) {
    console.error('Error handling application submission:', error);
    res.status(500).json({ error: 'Failed to process application.', details: error.message });
  }
});

// Admin Submissions Retrieval API (for local/Cloud Run DB storage)
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'teli2027';
    const providedToken = req.headers.authorization?.split(' ')[1] || req.query.token;

    if (!providedToken || providedToken !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized access. Invalid or missing admin credential.' });
    }

    const dbHelper = await getDb();
    const { contacts, applications } = await dbHelper.getSubmissions();

    res.status(200).json({
      contacts,
      applications,
    });
  } catch (error: any) {
    console.error('Error fetching submissions from database:', error);
    res.status(500).json({ error: 'Failed to fetch database submissions.', details: error.message });
  }
});

// Server configuration & static asset/Vite routing
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 TELI Full-Stack Server boot complete on http://localhost:${PORT}`);
  });
}

startServer();
