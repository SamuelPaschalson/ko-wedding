/**
 * RSVP intake endpoint.
 *
 * One POST from the browser writes the response into the couple's Google Form
 * (and therefore the linked responses sheet). No email, no other side effects.
 *
 * Runs as a Node serverless function (Vercel / Netlify / any Node host).
 *
 * WHY this exists: a browser cannot read Google's reply (no CORS headers), so
 * it cannot tell a written row from a rejection. Posting from the server side
 * means the status code is visible and real errors surface instead of being
 * reported to the guest as success.
 */

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

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

/**
 * Explains an authentication rejection in terms of the setting that causes it.
 *
 * Google answers 401 when the form will only accept responses from a signed-in
 * Google account. Nothing in this code can satisfy that: the guest's browser
 * has no Google session, and neither does this server. It has to be switched
 * off in the form itself.
 */
function signInRequiredMessage() {
  return [
    'The form is refusing anonymous responses (401).',
    'In the form: Settings > Responses, set "Collect email addresses" to',
    '"Responder input" (not "Verified") and turn off "Limit to 1 response".',
    'Also make sure the form is not restricted to a Workspace organisation.',
  ].join(' ');
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

  // The special 'emailAddress' parameter is never sent: it switches the form
  // into verified-email mode, which demands a signed-in Google account.
  const response = await fetch(
    `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Some Google endpoints reject requests with no user agent.
        'User-Agent': 'Mozilla/5.0 (compatible; wedding-site RSVP)',
      },
      body: body.toString(),
      redirect: 'follow',
    },
  );

  // Google answers 200 on success and 302 to a confirmation page; both are fine.
  if (response.ok || response.status === 302) return;

  if (response.status === 401 || response.status === 403) {
    const error = new Error(signInRequiredMessage());
    error.requiresFormSettingsChange = true;
    throw error;
  }

  throw new Error(`Google Form replied with ${response.status}.`);
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

  /*
    Every response is written to the form, acceptances and declines alike.
    This differs from the karen-patrick original, which skipped declines, but
    their form had no attendance question. This one does, and the couple asked
    for every invited guest to respond, so a decline is data worth keeping.
  */
  try {
    await sendToGoogleForm(payload);
  } catch (error) {
    res.status(502).json({
      error: 'We could not record your RSVP.',
      problems: [`Google Form: ${error.message}`],
      // Tells the browser not to retry the same rejection over a channel where
      // it cannot see the failure, which would look like success to the guest.
      ...(error.requiresFormSettingsChange ? { definitive: true } : {}),
    });
    return;
  }

  res.status(200).json({
    id: `rsvp_${Date.now().toString(36)}`,
    googleForm: true,
  });
}
