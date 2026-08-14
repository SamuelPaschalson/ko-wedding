import { rsvpForm } from '../../data/site';
import { RsvpSubmissionError, createId } from './types';

/**
 * Google Form field mapping.
 *
 * The `entry.<id>` names come from the couple's pre-filled link. They live in
 * `src/data/site.js` so the whole form definition sits in one place.
 */
export const GOOGLE_FORM_ENTRIES = rsvpForm.fields;

export function googleFormResponseUrl(action = rsvpForm.action) {
  return action;
}

/** Builds the `application/x-www-form-urlencoded` body Google Forms expects. */
export function buildGoogleFormBody(submission) {
  const f = GOOGLE_FORM_ENTRIES;
  const body = new URLSearchParams();

  // If the form's "WhatsApp number" question has Google's built-in Number
  // response validation turned on, a leading '+' fails it and the whole
  // submission gets rejected with a 400 that names no specific field. Send
  // digits only so that validation (if present) can't trip on it.
  const digitsOnlyPhone = (submission.phone ?? '').replace(/[^\d]/g, '');

  body.set(f.name, submission.fullName);
  body.set(f.email, submission.email);
  body.set(f.phone, digitsOnlyPhone);
  body.set(
    f.attending,
    submission.attendance === 'attending'
      ? rsvpForm.attendingOptions.yes
      : rsvpForm.attendingOptions.no,
  );
  body.set(f.guestOf, submission.guestOf);

  // The form has no "which part of the day" question, so that answer rides
  // along in the comments box where the couple will actually see it.
  const comments = [
    submission.attendance === 'attending' && submission.events
      ? `Attending: ${submission.events}`
      : null,
    submission.messageToCouple?.trim() || null,
  ]
    .filter(Boolean)
    .join('\n');
  body.set(f.comments, comments);

  /*
    Deliberately NOT sending the special 'emailAddress' parameter. It makes
    Google treat the post as a VERIFIED email submission, which requires a
    signed-in Google account and answers 401 Unauthorized to anonymous posts
    from this site. The address is already captured by the ordinary Email
    Address question above.
  */
  if (rsvpForm.sendRespondentEmail) {
    body.set(f.respondentEmail, submission.email);
  }

  body.set('fvv', '1');
  body.set('pageHistory', '0');

  return body;
}

/**
 * Posts the RSVP straight to the couple's Google Form from the browser.
 *
 * Google Forms does not send CORS headers, so the request is made in
 * `no-cors` mode: the row is written, but the browser will not let us read
 * the response. A network-level failure still throws, which is the only
 * signal we can act on.
 *
 * This is the fallback path used when the site is hosted without the
 * serverless `/api/rsvp` function, which can read the real status code.
 */
export class GoogleFormRsvpService {
  constructor(action = rsvpForm.action, fetchImpl = fetch.bind(globalThis)) {
    this.action = action;
    this.fetchImpl = fetchImpl;
  }

  async submit(submission) {
    try {
      await this.fetchImpl(googleFormResponseUrl(this.action), {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: buildGoogleFormBody(submission).toString(),
      });
      return { id: createId(), submission };
    } catch (error) {
      throw new RsvpSubmissionError('We could not reach the RSVP form.', error);
    }
  }
}
