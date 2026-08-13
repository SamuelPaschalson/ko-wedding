import React from 'react';
import Plate from '../components/Plate';
import {
  events,
  orderOfEvents,
  showOrderOfEvents,
  parking,
  plates,
  dateLabel,
} from '../data/site';

export default function WeddingDay() {
  return (
    <>
      <section className="shell page-head">
        <div>
          <p className="eyebrow reveal">The Wedding Day</p>
          <h1 className="reveal">One Saturday, two beginnings</h1>
          <p className="lede reveal">
            {dateLabel.long}, {dateLabel.year}. We’ll say “I do” in the morning,
            raise our glasses from the early afternoon, and dance our way into
            forever at {events[1].venue}. Everything you need to celebrate with
            us is right here, all that’s missing is you.
          </p>
        </div>
        <Plate className="reveal" src={plates.day} mono alt="" />
      </section>

      <section className="section section--ivory">
        <div className="shell grid-2">
          {events.map((e) => (
            <article className="card reveal" key={e.id}>
              <p className="eyebrow">{e.label}</p>
              <h3>{e.title}</h3>
              <dl>
                <dt>Date</dt>
                <dd>{dateLabel.short}</dd>
                <dt>Time</dt>
                <dd>
                  {e.time}
                  <br />
                  <span style={{ color: 'var(--ink-soft)' }}>{e.doors}</span>
                </dd>
                <dt>Venue</dt>
                <dd>
                  {e.venue}
                  <br />
                  {e.address}
                </dd>
                <dt>Dress</dt>
                <dd>{e.dress}</dd>
              </dl>
              <p className="card-note">{e.note}</p>
              <a className="btn btn--ghost" href={e.map} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* The reception run-sheet is not final yet, so it is switched off in
          src/data/site.js. Set `showOrderOfEvents = true` there and this whole
          section reappears exactly as it was. */}
      {showOrderOfEvents && (
        <section className="section">
          <div className="shell">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 48px)' }}>
              <p className="eyebrow reveal">Order of events</p>
              <h2 className="reveal" style={{ fontSize: 'clamp(30px, 5vw, 48px)', marginTop: 12 }}>
                How the reception runs
              </h2>
            </div>
            <ol className="runsheet reveal">
              {orderOfEvents.map((row) => (
                <li key={row.time}>
                  <time>{row.time}</time>
                  <span>{row.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="section section--espresso">
        <div className="shell grid-2">
          <div className="reveal">
            <p className="eyebrow">{parking.headline}</p>
            <h2 style={{ fontSize: 'clamp(28px, 4.4vw, 42px)', marginTop: 12 }}>
              Getting in without stress
            </h2>
          </div>
          <ul className="list-check reveal" style={{ fontSize: 16 }}>
            {parking.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell" style={{ textAlign: 'center' }}>
          <p className="lede reveal" style={{ marginInline: 'auto' }}>
            Colours of the day: champagne tones and shades of brown. This is an
            adults-only celebration, and venue access is strictly by invitation.
          </p>
          <a className="btn reveal" href="#/">
            See the full palette
          </a>
        </div>
      </section>
    </>
  );
}
