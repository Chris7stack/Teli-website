import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import Database from 'better-sqlite3';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Set up json parser with standard sizing for base64 resumes
app.use(express.json({ limit: '15mb' }));

// Initialize SQLite database to store submissions
const db = new Database('submissions.db');

// Create tables if they do not exist
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
    const { firstName, lastName, email, phone, institution, role, program, message, timestamp } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required contact fields.' });
    }

    // 1. Save to SQLite DB
    const stmt = db.prepare(`
      INSERT INTO contact_submissions (first_name, last_name, email, phone, institution, role, program, message, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(firstName, lastName, email, phone || '', institution || '', role || '', program || '', message || '', timestamp || new Date().toISOString());

    // 2. Prepare Email Body (Directed to info@teli-global.org)
    const emailSubject = `[Contact Inquiry] ${firstName} ${lastName} - ${program}`;
    const emailHtml = `
      <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Contact Inquiry Received</h2>
        <p>A user has submitted a request via the TELI Contact page.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 180px;">Name</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Institution</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${institution || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Role/Title</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${role || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Portfolio of Interest</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${program}</td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <h4 style="margin-top: 0; color: #0f172a;">Message:</h4>
          <p style="white-space: pre-wrap; margin-bottom: 0;">${message || 'No message provided.'}</p>
        </div>

        <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          Submission Timestamp: ${timestamp || new Date().toISOString()} | Ref Database ID: ${info.lastInsertRowid}
        </p>
      </div>
    `;

    // 3. Dispatch Email to info@teli-global.org
    const mailResult = await sendMail({
      to: 'info@teli-global.org',
      subject: emailSubject,
      html: emailHtml,
    });

    res.status(200).json({
      success: true,
      id: info.lastInsertRowid,
      emailSent: mailResult.success,
      reason: mailResult.reason || null,
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
      phone,
      institution,
      role,
      experience,
      statement,
      challenges,
      mentorPreference,
      resumeName,
      resumeBase64,
      appRefId,
      timestamp,
    } = req.body;

    if (!firstName || !lastName || !email || !statement || !challenges) {
      return res.status(400).json({ error: 'Missing required application fields.' });
    }

    // 1. Save to SQLite DB
    const stmt = db.prepare(`
      INSERT INTO applications (
        first_name, last_name, email, phone, institution, role, experience,
        statement, challenges, mentor_preference, resume_name, resume_base64, app_ref_id, timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      firstName,
      lastName,
      email,
      phone || '',
      institution || '',
      role || '',
      experience || '',
      statement,
      challenges,
      mentorPreference || '',
      resumeName || '',
      resumeBase64 || '',
      appRefId || '',
      timestamp || new Date().toISOString()
    );

    // 2. Prepare Email Body (Directed to apply@teli-global.org)
    const emailSubject = `[Fellowship Application] ${firstName} ${lastName} - ${appRefId}`;
    const emailHtml = `
      <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Fellowship Application</h2>
        <p>A new candidate has submitted an application for the <strong>2027 TELI Leadership Fellows Cohort</strong>.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 180px;">Application Ref ID</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #0284c7;">${appRefId}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Applicant Name</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Institution</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${institution || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Current Role</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${role || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Experience</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${experience || 'N/A'} years</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Mentor Preference</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${mentorPreference || 'None specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Resume Filename</td>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${resumeName || 'No resume attached'}</td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <h4 style="margin-top: 0; color: #0f172a;">Statement of Purpose:</h4>
          <p style="white-space: pre-wrap; margin-bottom: 0;">${statement}</p>
        </div>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <h4 style="margin-top: 0; color: #0f172a;">Institutional Challenges Response:</h4>
          <p style="white-space: pre-wrap; margin-bottom: 0;">${challenges}</p>
        </div>

        <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          Submission Timestamp: ${timestamp || new Date().toISOString()} | Ref Database ID: ${info.lastInsertRowid}
        </p>
      </div>
    `;

    // 3. Setup attachment if present
    const attachments: any[] = [];
    if (resumeBase64 && resumeName) {
      // Split the data URL if it contains metadata prefix (e.g., "data:application/pdf;base64,")
      const base64Data = resumeBase64.includes('base64,') 
        ? resumeBase64.split('base64,')[1] 
        : resumeBase64;
      
      attachments.push({
        filename: resumeName,
        content: Buffer.from(base64Data, 'base64'),
      });
    }

    // 4. Dispatch Email to apply@teli-global.org
    const mailResult = await sendMail({
      to: 'apply@teli-global.org',
      subject: emailSubject,
      html: emailHtml,
      attachments,
    });

    res.status(200).json({
      success: true,
      id: info.lastInsertRowid,
      emailSent: mailResult.success,
      reason: mailResult.reason || null,
    });
  } catch (error: any) {
    console.error('Error handling application submission:', error);
    res.status(500).json({ error: 'Failed to process application.', details: error.message });
  }
});

// Admin Submissions Retrieval API (for local/Cloud Run DB storage)
app.get('/api/admin/submissions', (req, res) => {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'teli2027';
    const providedToken = req.headers.authorization?.split(' ')[1] || req.query.token;

    if (!providedToken || providedToken !== adminPassword) {
      return res.status(401).json({ error: 'Unauthorized access. Invalid or missing admin credential.' });
    }

    const contacts = db.prepare('SELECT * FROM contact_submissions ORDER BY id DESC').all();
    const applications = db.prepare('SELECT * FROM applications ORDER BY id DESC').all();

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
