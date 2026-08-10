import React from 'react';
import Countdown from '../components/Countdown';
import { couple, dateLabel, events, plates, palette, rsvp } from '../data/site';

export default function Home() {
  // The hero is the couple's pre-wedding portrait, full-bleed behind the
  // champagne wash so the names still read.
  const hasPhoto = Boolean(plates.home);

  return (
    <>
      <section className={`hero${hasPhoto ? ' hero--photo' : ' hero--plain'}`}>
        {hasPhoto && (
          <div className="hero-plate hero-plate--single" aria-hidden="true">
            {/* Wide crop for desktop, full 4:5 frame for phones. CSS swaps them. */}
            <div
              className="hero-half hero-half--wide"
              style={{ backgroundImage: `url(${plates.home})` }}
            />
            <div
              className="hero-half hero-half--tall"
              style={{ backgroundImage: `url(${plates.homeMobile || plates.home})` }}
            />
          </div>
        )}

        <div className="hero-inner">
          <p className="hero-pre">Together with their families</p>
          <h1 className="hero-names">
            {couple.bride}
            <span className="amp">&amp;</span>
            {couple.groom}
          </h1>
          <div className="hero-flourish" aria-hidden="true" />
          <p className="hero-meta">
            <span>{dateLabel.short}</span>
            <span>{events[1].venue}</span>
            <span>{dateLabel.city}</span>
          </p>
          <p className="hero-welcome lede">
            Two families, one long-awaited Saturday, and a room full of the people
            who prayed us here. Come early, eat well, and dance until the band
            gives up. We cannot wait to see you.
          </p>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <i />
          Scroll
        </div>
      </section>

      <section className="section section--espresso">
        <div className="shell">
          <p className="eyebrow reveal" style={{ textAlign: 'center' }}>
            Counting down to {dateLabel.numeric}
          </p>
          <div style={{ height: 26 }} />
          <div className="reveal">
            <Countdown />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid-2">
          {events.map((e) => (
            <article className="card reveal" key={e.id}>
              <p className="eyebrow">{e.label}</p>
              <h3>{e.title}</h3>
              <dl>
                <dt>Time</dt>
                <dd>{e.time}</dd>
                <dt>Where</dt>
                <dd>
                  {e.venue}
                  <br />
                  {e.address}
                </dd>
                <dt>Dress</dt>
                <dd>{e.dress}</dd>
              </dl>
              <a className="btn btn--ghost" href="#/wedding-day">
                Full details
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Colours of the day — moved here from the old Asoebi page */}
      <section className="section section--ivory" id="colours">
        <div className="shell">
          <div style={{ maxWidth: 640 }}>
            <p className="eyebrow reveal">Colours of the day</p>
            <h2
              className="reveal"
              style={{ fontSize: 'clamp(30px, 5vw, 52px)', marginBlock: '12px 14px' }}
            >
              Champagne &amp; brown
            </h2>
            <p className="lede reveal">{palette.intro}</p>
          </div>

          <div className="palette-groups">
            {palette.groups.map((g) => (
              <div className="palette-group reveal" key={g.name}>
                <p className="eyebrow">{g.name}</p>
                <div className="swatches">
                  {g.swatches.map((s) => (
                    <div className="swatch" key={s.name}>
                      <i style={{ background: s.hex }} aria-hidden="true" />
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="dress-note reveal">
            <p>{palette.note}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell" style={{ textAlign: 'center' }}>
          <p className="eyebrow reveal">One more thing</p>
          <h2
            className="reveal"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', marginBlock: '14px 18px' }}
          >
            Will you be there?
          </h2>
          <p className="lede reveal" style={{ marginInline: 'auto' }}>
            Kindly respond by {rsvp.deadline} so we can hold your seat and your
            plate. It takes about a minute.
          </p>
          <a className="btn reveal" href="#/rsvp">
            RSVP now
          </a>
        </div>
      </section>
    </>
  );
}
