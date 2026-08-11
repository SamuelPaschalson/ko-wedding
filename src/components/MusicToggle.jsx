import React, { useEffect, useState } from 'react';
import { playSong, pauseSong, isPlaying, onPlaybackChange } from '../lib/audio';

/**
 * Floating music button. It does not own the audio any more — the envelope
 * starts the song when the guest opens the letter, and this button simply
 * mirrors and controls that same shared track.
 */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(() => isPlaying());

  useEffect(() => onPlaybackChange(setPlaying), []);

  const toggle = () => {
    if (playing) {
      pauseSong();
    } else {
      playSong();
    }
  };

  return (
    <button
      className="music"
      data-playing={playing}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      <i aria-hidden="true" />
    </button>
  );
}
