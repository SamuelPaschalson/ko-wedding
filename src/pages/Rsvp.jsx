import React, { useState } from 'react';
import Plate from '../components/Plate';
import Countdown from '../components/Countdown';
import { rsvp, rsvpForm, plates, couple, events } from '../data/site';
import { submitToGoogleForm } from '../lib/googleForm';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  attending: 'yes',
  guestOf: '',
  events: 'both',
  message: '',
};

const EVENT_LABELS = {
  both: 'Both, church and reception',
  church: `${events[0].title} only`,
  reception: `${events[1].title} only`,
};

export default function Rsvp() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ tone: '', text: '' });
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const asText = () =>
    [
      `RSVP for ${couple.bride} & ${couple.groom}`,
      `Name: ${form.name}`,
      `Attending: ${form.attending === 'yes' ? 'Yes' : 'Sadly no'}`,
      // One response per named guest, so the count is always exactly one seat.
      form.attending === 'yes' ? 'Seats: 1 (this guest only)' : null,
      form.attending === 'yes' ? `At: ${EVENT_LABELS[form.events]}` : null,
      form.guestOf ? `Guest of: ${form.guestOf}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.email ? `Email: ${form.email}` : null,
      form.message ? `Message: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

  const buildPayload = () => {
    const f = rsvpForm.fields;
    const email = form.email.trim();

    // The form has no "which part" question, so that answer rides along in the
    // comments box where the couple will actually see it.
    const comments = [
      form.attending === 'yes' ? `Attending: ${EVENT_LABELS[form.events]}` : null,
      form.message.trim() || null,
    ]
      .filter(Boolean)
      .join('\n');

    return {
      [f.attending]: rsvpForm.attendingOptions[form.attending],
      [f.guestOf]: form.guestOf,
      [f.name]: form.name.trim(),
      [f.email]: email,
      [f.phone]: form.phone.trim(),
      [f.comments]: comments,
      // Off by default: the verified-email parameter makes Google demand a
      // signed-in account and reject anonymous posts with 401.
      ...(rsvpForm.sendRespondentEmail ? { [f.respondentEmail]: email } : null),
      fvv: '1',
      pageHistory: '0',
    };
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setState({ tone: 'error', text: 'Please add your name so we know who is coming.' });
      return;
    }
    if (!form.email.trim()) {
      setState({ tone: 'error', text: 'Please add your email address, the guest list is kept by name and email.' });
      return;
    }
    if (!form.phone.trim()) {
      setState({ tone: 'error', text: 'Please add a WhatsApp number so we can reach you.' });
      return;
    }
    if (!form.guestOf) {
      setState({ tone: 'error', text: 'Please tell us whose guest you are.' });
      return;
    }

    setSending(true);
    try {
      await submitToGoogleForm(buildPayload());
      const accepted = form.attending === 'yes';
      setForm(EMPTY);
      setState({
        tone: 'ok',
        text: accepted
          ? 'Thank you, your seat is confirmed. See you on the 26th.'
          : 'Thank you for letting us know. We will miss you, and we will send photographs.',
      });
    } catch {
      // Last resort, hand the completed RSVP to WhatsApp so it is never lost.
      const url = `https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(asText())}`;
      window.open(url, '_blank', 'noopener');
      setState({
        tone: 'error',
        text: 'That did not send, so we have opened WhatsApp with your details. Please press send there.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="shell page-head">
        <div>
          <p className="eyebrow reveal">RSVP</p>
          <h1 className="reveal">Say you will be there</h1>
          <p className="lede reveal">
            Kindly respond by {rsvp.deadline}. This is an invitation-only
            celebration with no plus-ones, so every guest must respond
            individually, using their own name. If your invitation names more
            than one person, please fill this form once for each of them.
          </p>
        </div>
        <Plate className="reveal" src={plates.rsvp} mono alt="" />
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Countdown />
        </div>
      </section>

      <section className="section section--ivory">
        <div className="shell">
          <form className="form reveal" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="rsvp-name">Your full name</label>
              <input
                id="rsvp-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={set('name')}
                required
              />
            </div>

            <div className="field">
              <label id="attending-label">Can you attend?</label>
              <div className="choice-row" role="radiogroup" aria-labelledby="attending-label">
                <label className="choice">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={form.attending === 'yes'}
                    onChange={set('attending')}
                  />
                  <span>Yes, I will be there</span>
                </label>
                <label className="choice">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={form.attending === 'no'}
                    onChange={set('attending')}
                  />
                  <span>Sorry, cannot make it</span>
                </label>
              </div>
            </div>

            <div className="field">
              <label htmlFor="rsvp-guest-of">Whose guest are you?</label>
              <select id="rsvp-guest-of" value={form.guestOf} onChange={set('guestOf')} required>
                <option value="">Choose</option>
                {rsvpForm.guestOfOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {form.attending === 'yes' && (
              <>
                {/* No party-size field on purpose. Each response counts as one
                    named seat, which keeps the final count exact. */}
                <div className="field">
                  <label htmlFor="rsvp-events">Which part will you be at?</label>
                  <select id="rsvp-events" value={form.events} onChange={set('events')}>
                    <option value="both">{EVENT_LABELS.both}</option>
                    <option value="church">{EVENT_LABELS.church}</option>
                    <option value="reception">{EVENT_LABELS.reception}</option>
                  </select>
                </div>
              </>
            )}

            <div className="field">
              <label htmlFor="rsvp-phone">WhatsApp number</label>
              <input
                id="rsvp-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={set('phone')}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="rsvp-email">Email address</label>
              <input
                id="rsvp-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set('email')}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="rsvp-message">Comments</label>
              <textarea
                id="rsvp-message"
                placeholder="A blessing, a warning, a song request. All welcome."
                value={form.message}
                onChange={set('message')}
              />
            </div>

            <div>
              <button className="btn" type="submit" disabled={sending} style={{ marginTop: 0 }}>
                {sending ? 'Sending\u2026' : 'Send RSVP'}
              </button>
            </div>

            {state.text && (
              <p className="form-status" data-tone={state.tone} role="status">
                {state.text}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
