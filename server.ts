import express from 'express';
import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'FamilyFirstLifeBusiness@gmail.com';

const rateWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 15;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipRequests.get(ip) || []).filter((ts) => now - ts < rateWindowMs);
  if (recent.length >= maxRequestsPerWindow) {
    ipRequests.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipRequests.set(ip, recent);
  return false;
}

function cleanSingleLine(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLen);
}

function cleanMultiLine(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface InquiryPayload {
  type: 'consultation' | 'career';
  fullName: string;
  email: string;
  phone: string;
  state: string;
  coverage?: string;
  preferredLanguage?: string;
  licenseStatus?: string;
  message?: string;
}

async function deliverEmail(
  subject: string,
  textBody: string,
  htmlBody: string,
  replyTo: string
): Promise<{ delivered: boolean; provider?: string }> {
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || '465');

  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Yousif Dawood Website" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return { delivered: true, provider: 'smtp' };
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || 'onboarding@resend.dev';
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [RECIPIENT_EMAIL],
        reply_to: replyTo,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email provider responded with status ${response.status}`);
    }

    return { delivered: true, provider: 'resend' };
  }

  return { delivered: false };
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '16kb' }));

  app.post('/api/inquiries', async (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many requests. Please wait a few minutes before submitting again.',
      });
    }

    const body = req.body as Partial<InquiryPayload> | undefined;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ ok: false, error: 'Invalid request payload.' });
    }

    const inquiryType = body.type === 'career' ? 'career' : body.type === 'consultation' ? 'consultation' : null;
    if (!inquiryType) {
      return res.status(400).json({ ok: false, error: 'Invalid inquiry type.' });
    }

    const fullName = cleanSingleLine(body.fullName, 120);
    const email = cleanSingleLine(body.email, 160);
    const phone = cleanSingleLine(body.phone, 30);
    const state = cleanSingleLine(body.state, 80);
    const coverage = cleanSingleLine(body.coverage, 80);
    const preferredLanguage = cleanSingleLine(body.preferredLanguage, 30);
    const licenseStatus = cleanSingleLine(body.licenseStatus, 80);
    const message = cleanMultiLine(body.message, 1500);

    if (!fullName || !email || !phone || !state) {
      return res.status(400).json({ ok: false, error: 'Missing required fields.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email address.' });
    }

    if (phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ ok: false, error: 'Invalid phone number.' });
    }

    const referenceId = `YD-${Math.floor(100000 + Math.random() * 900000)}`;
    const subject =
      inquiryType === 'career'
        ? `[Agent Application ${referenceId}] ${fullName} (${state})`
        : `[Consultation Request ${referenceId}] ${fullName} (${state})`;

    const rows: [string, string][] = [
      ['Reference ID', referenceId],
      ['Inquiry Type', inquiryType === 'career' ? 'Agent Recruitment / Career' : 'Client Consultation'],
      ['Full Name', fullName],
      ['Email', email],
      ['Phone', phone],
      ['State', state],
    ];

    if (inquiryType === 'consultation') {
      if (coverage) rows.push(['Coverage Interest', coverage]);
      if (preferredLanguage) rows.push(['Preferred Language', preferredLanguage]);
      if (message) rows.push(['Notes', message]);
    } else {
      if (licenseStatus) rows.push(['Licensing Status', licenseStatus]);
    }

    const textBody = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #0f172a; max-width: 600px;">
        <h2 style="margin-bottom: 12px;">${escapeHtml(subject)}</h2>
        <table style="border-collapse: collapse; width: 100%;">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 180px;">${escapeHtml(k)}</td>
              <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(v)}</td>
            </tr>`
            )
            .join('')}
        </table>
      </div>
    `;

    try {
      const result = await deliverEmail(subject, textBody, htmlBody, email);
      return res.json({
        ok: true,
        delivered: result.delivered,
        recipient: RECIPIENT_EMAIL,
        referenceId,
      });
    } catch (err) {
      console.error('[Email Delivery Error]', err);
      return res.json({
        ok: true,
        delivered: false,
        recipient: RECIPIENT_EMAIL,
        referenceId,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.use((req: Request, res: Response, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api/')) {
        return next();
      }
      return res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
