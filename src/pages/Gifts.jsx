import React, { useState } from 'react';
import Plate from '../components/Plate';
import { gifts, plates } from '../data/site';

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copyable = value && !value.startsWith('TODO');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <dt>{label}</dt>
      <dd>
        {value}
        {copyable && (
          <button
            type="button"
            onClick={copy}
            style={{
              marginLeft: 12,
              background: 'none',
              border: 0,
              padding: 0,
              cursor: 'pointer',
              font: 'inherit',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--cocoa)',
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </dd>
    </>
  );
}

export default function Gifts() {
  return (
    <>
      <section className="shell page-head">
        <div>
          <p className="eyebrow reveal">Gifts</p>
          <h1 className="reveal">Nothing is expected</h1>
          <p className="lede reveal">{gifts.note}</p>
        </div>
        <Plate className="reveal" src={plates.gifts} alt="" label="Detail photograph" />
      </section>

      <section className="section section--ivory">
        <div className="shell grid-2">
          {gifts.registries.map((r) => (
            <article className="card reveal" key={r.name}>
              <p className="eyebrow">Registry</p>
              <h3>{r.name}</h3>
              <p style={{ color: 'var(--ink-soft)', marginTop: 8 }}>{r.detail}</p>
              <a
                className="btn btn--ghost"
                href={r.url.startsWith('http') ? r.url : '#/gifts'}
                target={r.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                Open registry
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell" style={{ maxWidth: 720 }}>
          <article className="card reveal">
            <p className="eyebrow">If you would rather send something</p>
            <h3>Bank details</h3>
            <dl>
              <CopyRow label="Account name" value={gifts.bank.accountName} />
              <CopyRow label="Bank" value={gifts.bank.bank} />
              <CopyRow label="Naira account" value={gifts.bank.naira} />
              <CopyRow label="Domiciliary" value={gifts.bank.domiciliary} />
            </dl>
            <p className="card-note">
              Please put your name in the narration so we know who to thank.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
