import React, { useState } from 'react';
import Plate from '../components/Plate';
import Countdown from '../components/Countdown';
import { rsvp, plates, couple, events } from '../data/site';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  attending: 'yes',
  events: 'both',
  message: '',
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
      form.attending === 'yes' ? `Attending: ${form.events}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.email ? `Email: ${form.email}` : null,
      form.message ? `Message: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setState({ tone: 'error', text: 'Please add your name so we know who is coming.' });
      return;
    }

    // WHY the fallback: until an endpoint is pasted into site.js, the form
    // still works — it hands the completed RSVP to WhatsApp instead of
    // silently doing nothing.
    if (!rsvp.endpoint) {
      const url = `https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(asText())}`;
      window.open(url, '_blank', 'noopener');
      setState({ tone: 'ok', text: 'Opening WhatsApp, send the message and you are counted.' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(rsvp.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Bad response');
      setForm(EMPTY);
      setState({
        tone: 'ok',
        text:
          form.attending === 'yes'
            ? 'Thank you, your seat is confirmed. See you on the 26th.'
            : 'Thank you for letting us know. We will miss you, and we will send photographs.',
      });
    } catch {
      setState({
        tone: 'error',
        text: 'That did not send. Please try again, or message the RSVP coordinator on the Guest Guide page.',
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
              <label id="attending-label">Will you be joining us?</label>
              <div className="choice-row" role="radiogroup" aria-labelledby="attending-label">
                <label className="choice">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={form.attending === 'yes'}
                    onChange={set('attending')}
                  />
                  <span>Joyfully accepts</span>
                </label>
                <label className="choice">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={form.attending === 'no'}
                    onChange={set('attending')}
                  />
                  <span>Regretfully declines</span>
                </label>
              </div>
            </div>

            {form.attending === 'yes' && (
              <>
                {/* No party-size field on purpose. Each response counts as one
                    named seat, which keeps the final count exact. */}
                <div className="field">
                  <label htmlFor="rsvp-events">Which part will you be at?</label>
                  <select id="rsvp-events" value={form.events} onChange={set('events')}>
                    <option value="both">Both, church and reception</option>
                    <option value="church">{events[0].title} only</option>
                    <option value="reception">{events[1].title} only</option>
                  </select>
                </div>
              </>
            )}

            <div className="field">
              <label htmlFor="rsvp-phone">Phone number</label>
              <input
                id="rsvp-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={set('phone')}
              />
            </div>

            <div className="field">
              <label htmlFor="rsvp-email">Email (optional)</label>
              <input
                id="rsvp-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set('email')}
              />
            </div>

            <div className="field">
              <label htmlFor="rsvp-message">A note for us</label>
              <textarea
                id="rsvp-message"
                placeholder="A blessing, a warning, a song request. All welcome."
                value={form.message}
                onChange={set('message')}
              />
            </div>

            <div>
              <button className="btn" type="submit" disabled={sending} style={{ marginTop: 0 }}>
                {sending ? 'Sending…' : 'Send RSVP'}
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
