import { rsvpForm } from '../data/site';

/**
 * Builds the `application/x-www-form-urlencoded` body Google Forms expects.
 *
 * `payload` is a flat map of Google field names to answers, e.g.
 * { 'entry.877086558': "Yes, I'll be there", emailAddress: 'a@b.com' }.
 */
export function buildGoogleFormBody(payload) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([name, value]) => {
    body.set(name, value == null ? '' : String(value));
  });
  return body;
}

/**
 * Posts the RSVP straight to the couple's Google Form from the browser.
 *
 * Google Forms does not send CORS headers, so the request is made in
 * `no-cors` mode: the row is written, but the browser will not let us read
 * the response. A network-level failure still throws, which is the only
 * signal we can act on.
 */
export async function submitToGoogleForm(payload, fetchImpl = fetch.bind(globalThis)) {
  await fetchImpl(rsvpForm.action, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: buildGoogleFormBody(payload).toString(),
  });
}
