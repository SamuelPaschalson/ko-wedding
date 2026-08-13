import React from 'react';
import Plate from '../components/Plate';
import { bridalParty, plates } from '../data/site';

export default function BridalParty() {
  return (
    <>
      <section className="shell page-head">
        <div>
          <p className="eyebrow reveal">Our People</p>
          <h1 className="reveal">The ones standing with us</h1>
          <p className="lede reveal">
            Every one of them has carried something for us, a secret, a suitcase,
            a phone call at an unreasonable hour. On the day, look for them in
            mocha and ivory.
          </p>
        </div>
        <Plate className="reveal" src={plates.party} mono alt="" />
      </section>

      {bridalParty.map((group, i) => (
        <section
          className={`section${i % 2 === 1 ? ' section--ivory' : ''}`}
          key={group.group}
        >
          <div className="shell">
            <p className="eyebrow reveal">{group.group}</p>
            <hr className="rule reveal" style={{ marginBlock: '18px clamp(24px, 4vw, 44px)' }} />
            <div className="grid-3">
              {group.people.map((p) => (
                <div className="person reveal" key={p.role + p.name}>
                  <Plate src={p.photo} alt={p.name} label={p.role} />
                  <div className="person-name">{p.name}</div>
                  <div className="person-role">{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
