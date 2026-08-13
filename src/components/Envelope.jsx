import React, { useState } from 'react';
import { couple, dateLabel } from '../data/site';
import { playSong } from '../lib/audio';

/**
 * The front door of the site: an aged parchment envelope, sealed with oxblood
 * wax and stamped with the KO monogram, styled to match the printed Save the
 * Date. The flap folds open to reveal the invitation.
 *
 * The song starts on the same click that breaks the seal - browsers only allow
 * audio to begin inside a real user gesture.
 */
export default function Envelope({ onOpen }) {
  const [opened, setOpened] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleOpen = () => {
    if (opened) return;

    playSong();

    setOpened(true);
    setTimeout(() => {
      setLeaving(true);
      setTimeout(onOpen, 900);
    }, 2100);
  };

  return (
    <div className={`env-screen ${leaving ? 'is-leaving' : ''}`}>
      <div className="env-layout">
        <header className="env-head">
          <p className="env-invite">Save the Date</p>
          <p className="env-eyebrow">
            Some moments are too precious to celebrate without the people who
            matter most.
          </p>
        </header>

        <div
          className="env-stage"
          role="button"
          tabIndex={0}
          aria-label={`Open the invitation from ${couple.bride} and ${couple.groom}`}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
        >
          <div className={`envelope ${opened ? 'is-open' : ''}`}>
            {/* The printed parchment face */}
            <div className="env-face">
              <div className="face-text">
                <h1 className="face-names">
                  {couple.bride} &amp; {couple.groom}
                </h1>
                <div className="face-orn" aria-hidden="true">
                  <i>&#9670;</i>
                </div>
                <p className="face-hash">{couple.hashtag}</p>
                <p className="face-date">{dateLabel.numeric}</p>
              </div>
              {/* Shadow cast by the closed flap; it fades as the flap lifts. */}
              <div className="env-shade" aria-hidden="true" />
            </div>

            {/* Folding flap, blind-debossed with the monogram */}
            <div className="env-flap">
              <div className="env-flap-inner">
                <img
                  className="flap-mono"
                  src="/images/monogram-ko.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
            </div>

            <span className={`env-seal ${opened ? 'is-broken' : ''}`}>
              <img
                className="env-seal-mono"
                src="/images/monogram-ko-seal.png"
                alt=""
                aria-hidden="true"
              />
            </span>
          </div>
        </div>

        <footer className="env-foot">
          <p className="env-hint">
            {opened
              ? 'A formal invitation, lovingly penned, will follow'
              : 'Break the seal to open'}
          </p>
          <button type="button" className="env-skip" onClick={onOpen}>
            Skip
          </button>
        </footer>
      </div>
    </div>
  );
}
