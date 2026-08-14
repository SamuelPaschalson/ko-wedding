/**
 * RSVP intake endpoint.
 *
 * One POST from the browser does three things:
 *   1. writes the response into the couple's Google Form (and therefore the
 *      linked responses sheet),
 *   2. emails the guest a confirmation,
 *   3. emails the couple a notification.
 *
 * Runs as a Node serverless function (Vercel / Netlify / any Node host).
 * All secrets come from environment variables.
 *
 * WHY this exists: a browser cannot read Google's reply (no CORS headers), so
 * it cannot tell a written row from a 401 Unauthorized. Posting from the
 * server side means the status code is visible and real errors surface.
 */
import nodemailer from 'nodemailer';

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const GOOGLE_FORM_ID =
  process.env.GOOGLE_FORM_ID ??
  '1FAIpQLSd2GAru-FGqRhJanLTfWnaLfS_l2yhWzD_gni8UPA93xjYqNQ';

const GOOGLE_FORM_ENTRIES = {
  attending: process.env.GOOGLE_FORM_ENTRY_ATTENDING ?? 'entry.877086558',
  guestOf: process.env.GOOGLE_FORM_ENTRY_GUEST_OF ?? 'entry.52031101',
  fullName: process.env.GOOGLE_FORM_ENTRY_NAME ?? 'entry.1757151896',
  email: process.env.GOOGLE_FORM_ENTRY_EMAIL ?? 'entry.1275981927',
  phone: process.env.GOOGLE_FORM_ENTRY_PHONE ?? 'entry.1653168447',
  comments: process.env.GOOGLE_FORM_ENTRY_COMMENTS ?? 'entry.2606285',
};

/* Copied character for character from the live form. Google silently discards
   a value it does not recognise, so do not tidy the spacing. */
const ATTENDING_OPTIONS = {
  attending: "Yes, I'll be there",
  declined: "Sorry, can't make it",
};

const SMTP_USER = process.env.SMTP_USER ?? '';
/** Gmail app password. Spaces are allowed in the env value; Gmail ignores them. */
const SMTP_PASS = (process.env.SMTP_PASS ?? '').replace(/\s+/g, '');
const COUPLE_EMAIL = process.env.COUPLE_NOTIFICATION_EMAIL ?? SMTP_USER;
const FROM_NAME = process.env.MAIL_FROM_NAME ?? 'Nkiruka & Ositadinma';

const WEDDING = {
  date: 'Saturday, 26 September 2026',
  time: '10:30 AM prompt',
  venue:
    'St. Charles Borromeo Catholic Church, 1004 Estate, Victoria Island, Lagos, then Queens Park Event Center',
  hashtag: '#OfficiallyKOd',
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parsePayload(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body ?? {};
}

/** Writes the response into the Google Form. */
async function sendToGoogleForm(payload) {
  const attending = payload.attendance === 'attending';

  const comments = [
    attending && payload.events ? `Attending: ${payload.events}` : null,
    (payload.messageToCouple ?? '').trim() || null,
  ]
    .filter(Boolean)
    .join('\n');

  const body = new URLSearchParams();
  body.set(GOOGLE_FORM_ENTRIES.fullName, payload.fullName ?? '');
  body.set(GOOGLE_FORM_ENTRIES.email, payload.email ?? '');
  body.set(GOOGLE_FORM_ENTRIES.phone, payload.phone ?? '');
  body.set(
    GOOGLE_FORM_ENTRIES.attending,
    attending ? ATTENDING_OPTIONS.attending : ATTENDING_OPTIONS.declined,
  );
  body.set(GOOGLE_FORM_ENTRIES.guestOf, payload.guestOf ?? '');
  body.set(GOOGLE_FORM_ENTRIES.comments, comments);
  body.set('fvv', '1');
  body.set('pageHistory', '0');

  // Note: the special 'emailAddress' parameter is never sent. It switches the
  // form into verified-email mode, which requires a signed-in Google account
  // and answers 401 to anonymous posts.
  const response = await fetch(
    `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    },
  );

  // Google answers 200 on success and 302 to a confirmation page; both are fine.
  if (!response.ok && response.status !== 302) {
    throw new Error(`Google Form replied with ${response.status}.`);
  }
}

function createTransport() {
  if (!SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? 'true') === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function guestConfirmationHtml(payload) {
  const attending = payload.attendance === 'attending';
  const firstName = (payload.fullName ?? '').trim().split(/\s+/)[0] || 'friend';

  const details = attending
    ? `<table role="presentation" style="margin:24px 0;font:16px Georgia,serif;color:#2b2018">
         <tr><td style="padding:4px 16px 4px 0;color:#6d5e50">Date</td><td>${WEDDING.date}</td></tr>
         <tr><td style="padding:4px 16px 4px 0;color:#6d5e50">Time</td><td>${WEDDING.time}</td></tr>
         <tr><td style="padding:4px 16px 4px 0;color:#6d5e50">Where</td><td>${WEDDING.venue}</td></tr>
       </table>`
    : '';

  const message = attending
    ? `<p style="font:16px Georgia,serif;color:#2b2018">Thank you for saying yes, ${escapeHtml(
        firstName,
      )}. Your seat is confirmed and we cannot wait to celebrate with you.</p>
       <p style="font:16px Georgia,serif;color:#2b2018">A reminder that this is an adults-only celebration with no plus-ones, and access is strictly by invitation.</p>`
    : `<p style="font:16px Georgia,serif;color:#2b2018">Thank you for letting us know, ${escapeHtml(
        firstName,
      )}. You will be missed, and we are grateful for your love and prayers.</p>`;

  return `<div style="background:#f3ebdf;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#faf6ef;padding:32px;border:1px solid #dccdb9">
      <p style="font:400 34px 'Pinyon Script',Georgia,serif;text-align:center;color:#6e4a2e;margin:0">Nkiruka &amp; Ositadinma</p>
      <p style="font:12px Helvetica,Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;text-align:center;color:#b08d57">RSVP received</p>
      ${message}
      ${details}
      <p style="font:16px Georgia,serif;color:#2b2018">If anything changes, simply reply to this email.</p>
      <p style="font:italic 18px Georgia,serif;text-align:center;color:#6e4a2e">${WEDDING.hashtag}</p>
    </div>
  </div>`;
}

function coupleNotificationHtml(payload) {
  const rows = [
    ['Name', payload.fullName ?? ''],
    ['Email', payload.email ?? ''],
    ['Phone', payload.phone ?? ''],
    ['Attending', payload.attendance === 'attending' ? 'Yes' : 'No'],
    ['Whose guest', payload.guestOf ?? ''],
    ['Seats', payload.attendance === 'attending' ? '1 (this guest only)' : '0'],
    ['Which part', (payload.events ?? '').trim() || '-'],
    ['Message', (payload.messageToCouple ?? '').trim() || '-'],
    ['Submitted', payload.submittedAt ?? new Date().toISOString()],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6d5e50;white-space:nowrap">${label}</td><td style="padding:6px 0">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join('');

  return `<div style="font:16px Georgia,serif;color:#2b2018">
    <h2 style="font:20px Helvetica,Arial,sans-serif;color:#6e4a2e">New RSVP</h2>
    <table role="presentation">${body}</table>
  </div>`;
}

/* -------------------------------------------------------------------------- */
/* Handler                                                                    */
/* -------------------------------------------------------------------------- */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN ?? '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const payload = parsePayload(req.body);

  if (!payload.fullName || !payload.email || !EMAIL_PATTERN.test(payload.email)) {
    res.status(400).json({ error: 'A name and a valid email address are required.' });
    return;
  }

  const results = { googleForm: false, guestEmail: false, coupleEmail: false };
  const problems = [];

  /*
    Every response is written to the form, acceptances and declines alike.
    This differs from the karen-patrick original, which skipped declines, but
    their form had no attendance question. This one does, and the couple asked
    for every invited guest to respond, so a decline is data worth keeping.
  */
  try {
    await sendToGoogleForm(payload);
    results.googleForm = true;
  } catch (error) {
    problems.push(`Google Form: ${error.message}`);
  }

  const transport = createTransport();
  if (transport) {
    const from = `"${FROM_NAME}" <${SMTP_USER}>`;
    const attending = payload.attendance === 'attending';

    try {
      await transport.sendMail({
        from,
        to: payload.email,
        replyTo: COUPLE_EMAIL,
        subject: attending
          ? 'Your RSVP is confirmed, Nkiruka & Ositadinma, 26 September 2026'
          : 'We received your RSVP, Nkiruka & Ositadinma',
        html: guestConfirmationHtml(payload),
      });
      results.guestEmail = true;
    } catch (error) {
      problems.push(`Guest email: ${error.message}`);
    }

    try {
      await transport.sendMail({
        from,
        to: COUPLE_EMAIL,
        replyTo: payload.email,
        subject: `RSVP - ${payload.fullName} (${attending ? 'attending' : 'declined'})`,
        html: coupleNotificationHtml(payload),
      });
      results.coupleEmail = true;
    } catch (error) {
      problems.push(`Couple email: ${error.message}`);
    }
  } else {
    problems.push('SMTP credentials are not configured.');
  }

  // The RSVP counts as accepted if it was recorded anywhere.
  if (results.googleForm === false && !results.coupleEmail) {
    res.status(502).json({ error: 'We could not record your RSVP.', problems });
    return;
  }

  res.status(200).json({
    id: `rsvp_${Date.now().toString(36)}`,
    ...results,
    ...(problems.length > 0 ? { problems } : {}),
  });
}
