import React from 'react';
import Plate from '../components/Plate';
import { asoebi, plates } from '../data/site';

const SWATCHES = [
  { name: 'Ivory', hex: '#f3ebdf' },
  { name: 'Oat', hex: '#dccdb9' },
  { name: 'Taupe', hex: '#a38f79' },
  { name: 'Mocha', hex: '#6e4a2e' },
  { name: 'Espresso', hex: '#241a15' },
  { name: 'Gold', hex: '#b08d57' },
];

export default function Asoebi() {
  return (
    <>
      <section className="shell page-head">
        <div>
          <p className="eyebrow reveal">Asoebi &amp; Dress Code</p>
          <h1 className="reveal">Dress with us</h1>
          <p className="lede reveal">{asoebi.intro}</p>
        </div>
        <Plate className="reveal" src={plates.asoebi} alt="Asoebi fabric" label="Fabric photograph" />
      </section>

      <section className="section section--ivory">
        <div className="shell">
          <p className="eyebrow reveal">The palette</p>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4.4vw, 44px)', marginTop: 12 }}>
            Six colours, no exceptions
          </h2>
          <div className="swatches reveal">
            {SWATCHES.map((s) => (
              <div className="swatch" key={s.name}>
                <i style={{ background: s.hex }} aria-hidden="true" />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid-2">
          {asoebi.families.map((f) => (
            <article className="card reveal" key={f.side}>
              <p className="eyebrow">Asoebi</p>
              <h3>{f.side}</h3>
              <dl>
                <dt>Fabric</dt>
                <dd>{f.fabric}</dd>
                <dt>Price</dt>
                <dd>{f.price}</dd>
                <dt>Contact</dt>
                <dd>
                  {f.contact.name}
                  <br />
                  {f.contact.phone}
                </dd>
              </dl>
            </article>
          ))}
        </div>

        <div className="shell" style={{ marginTop: 'clamp(20px, 3vw, 40px)' }}>
          <article className="card reveal">
            <p className="eyebrow">Fabric pick-up</p>
            <h3>Where to collect</h3>
            <dl>
              <dt>Address</dt>
              <dd>{asoebi.pickup.where}</dd>
              <dt>Hours</dt>
              <dd>{asoebi.pickup.when}</dd>
              <dt>Deadline</dt>
              <dd>{asoebi.pickup.deadline}</dd>
            </dl>
            <p className="card-note">{asoebi.pickup.note}</p>
          </article>
        </div>
      </section>

      <section className="section section--espresso">
        <div className="shell grid-2">
          <div className="reveal">
            <p className="eyebrow">{asoebi.guestDressCode.title}</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginBlock: '12px 16px' }}>
              Wear these
            </h2>
            <ul className="list-check">
              {asoebi.guestDressCode.yes.map((y) => (
                <li key={y}>{y}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <p className="eyebrow">Kindly avoid</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginBlock: '12px 16px' }}>
              Leave these at home
            </h2>
            <ul className="list-cross">
              {asoebi.guestDressCode.no.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
