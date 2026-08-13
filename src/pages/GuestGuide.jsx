import React from 'react';
import Plate from '../components/Plate';
import { travel, faqs, contacts, plates } from '../data/site';

export default function GuestGuide() {
  return (
    <>
      <section className="shell page-head">
        <div>
          <p className="eyebrow reveal">Guest Guide</p>
          <h1 className="reveal">Everything else you might ask</h1>
          <p className="lede reveal">{travel.intro}</p>
        </div>
        {/* The venue photograph has been replaced by a picture of the couple.
            Set plates.guide in src/data/site.js to swap it. */}
        {plates.guide && (
          <Plate
            className="reveal plate--wide"
            src={plates.guide}
            alt="Nkiruka and Ositadinma"
          />
        )}
      </section>

      <section className="section section--ivory" id="travel">
        <div className="shell">
          <p className="eyebrow reveal">Travel &amp; arrival</p>
          <hr className="rule reveal" style={{ marginBlock: '18px clamp(24px, 4vw, 40px)' }} />
          <div className="grid-2">
            {travel.tips.map((t) => (
              <article className="card reveal" key={t.title}>
                <h3 style={{ fontSize: 'clamp(21px, 2.6vw, 27px)' }}>{t.title}</h3>
                <p style={{ color: 'var(--ink-soft)', marginTop: 10 }}>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faqs">
        <div className="shell" style={{ maxWidth: 860 }}>
          <p className="eyebrow reveal">Questions</p>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4.6vw, 46px)', marginBlock: '12px 26px' }}>
            Asked and answered
          </h2>
          <div className="faq reveal">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--espresso" id="contact">
        <div className="shell" style={{ maxWidth: 860 }}>
          <p className="eyebrow reveal">Contact</p>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4.6vw, 46px)', marginBlock: '12px 20px' }}>
            Who to call
          </h2>
          <p className="reveal" style={{ color: 'var(--taupe)', marginBottom: 20 }}>
            Please save these before the day. On the morning itself, phones get
            very busy.
          </p>
          {contacts.map((c) => (
            <div className="contact-card reveal" key={c.role}>
              <div className="role">{c.role}</div>
              <div className="name" style={{ color: 'var(--ivory)' }}>
                {c.name}
              </div>
              {c.phone && (
                <a href={`tel:${c.phone.replace(/[^\d+]/g, '')}`} style={{ color: 'var(--gold)' }}>
                  {c.phone}
                </a>
              )}
              {c.email && (
                <a href={`mailto:${c.email}`} style={{ color: 'var(--gold)' }}>
                  {c.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
