import React, { useState } from 'react';
import { couple, dateLabel, events } from '../data/site';
import { playSong } from '../lib/audio';
import Mandala from './Mandala';

/**
 * The front door of the site: a black, silver-laced envelope whose flap folds
 * open to reveal the invitation.
 *
 * The song starts on the same click that breaks the seal — browsers only allow
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
      {/* Corner lacework, echoing the printed suite */}
      <Mandala className="env-corner env-corner--tl" />
      <Mandala className="env-corner env-corner--br" />

      <div className="env-layout">
        <header className="env-head">
          <p className="env-eyebrow">Together with their families</p>
          <p className="env-invite">You are invited</p>
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
            {/* The printed face of the envelope */}
            <div className="env-face">
              <Mandala className="face-lace face-lace--left" />
              <Mandala className="face-lace face-lace--right" />

              <div className="face-text">
                <h1 className="face-names">
                  <span>{couple.bride}</span>
                  <em>and</em>
                  <span>{couple.groomShort}</span>
                </h1>
                <div className="face-rule" aria-hidden="true" />
                <p className="face-date">{dateLabel.numeric}</p>
                <p className="face-venue">{events[1].venue}</p>
              </div>
            </div>

            {/* Folding flap */}
            <div className="env-flap">
              <div className="env-flap-inner">
                <Mandala className="flap-lace" />
              </div>
            </div>

            <span className={`env-seal ${opened ? 'is-broken' : ''}`}>
              <span className="env-seal-inner">KO</span>
            </span>
          </div>
        </div>

        <footer className="env-foot">
          <p className="env-hint">
            {opened ? 'Welcome, come on in' : 'Tap the seal to open'}
          </p>
          <button type="button" className="env-skip" onClick={onOpen}>
            Skip
          </button>
        </footer>
      </div>
    </div>
  );
}
