import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, institution, role, program, message, timestamp } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required contact fields.' });
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || 'no-reply@teli-global.org';

    if (!host || !user || !pass) {
      console.warn('SMTP configuration missing on Vercel. Please define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM.');
      return res.status(500).json({ 
        error: 'Email service is not yet configured on your server/Vercel.',
        details: 'Missing SMTP credentials. Please define SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS as Environment Variables in your Vercel Dashboard.'
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port || '465'),
      secure: port === '465',
      auth: {
        user,
        pass,
      },
    });

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
          Submission Timestamp: ${timestamp || new Date().toISOString()}
        </p>
      </div>
    `;

    const info = await transporter.sendMail({
      from,
      to: 'info@teli-global.org',
      subject: `[Contact Inquiry] ${firstName} ${lastName} - ${program}`,
      html: emailHtml,
    });

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error('Error handling contact submission on Vercel:', error);
    return res.status(500).json({ error: 'Failed to send email inquiry.', details: error.message });
  }
}
