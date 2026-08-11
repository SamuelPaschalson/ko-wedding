/**
 * One shared audio element for the whole site.
 *
 * WHY a singleton: the song is started by the envelope (inside the guest's
 * click, which is what browsers require) and then controlled by the floating
 * music button on the site behind it. Both need to be talking to the same
 * <audio>, otherwise opening the letter would start a second copy of the song.
 */

const SRC = '/song.mp3';

let audio = null;

export function getAudio() {
  if (typeof window === 'undefined') return null;
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0; // faded up by playSong so it never blares
  }
  return audio;
}

/** Fade to the house volume over ~1.2s. */
function fadeIn(el, target = 0.35) {
  const step = target / 24;
  const id = setInterval(() => {
    const next = Math.min(target, el.volume + step);
    el.volume = next;
    if (next >= target) clearInterval(id);
  }, 50);
  return id;
}

/**
 * Must be called from inside a user gesture (a click or key press) or the
 * browser will refuse. Returns true when the song is actually playing.
 */
export async function playSong() {
  const el = getAudio();
  if (!el) return false;
  try {
    el.volume = 0;
    await el.play();
    fadeIn(el);
    return true;
  } catch {
    return false;
  }
}

export function pauseSong() {
  const el = getAudio();
  if (el) el.pause();
}

export function isPlaying() {
  const el = getAudio();
  return !!el && !el.paused;
}

/** Subscribe to play/pause so UI can stay in sync. Returns an unsubscribe. */
export function onPlaybackChange(handler) {
  const el = getAudio();
  if (!el) return () => {};
  const update = () => handler(!el.paused);
  el.addEventListener('play', update);
  el.addEventListener('pause', update);
  el.addEventListener('ended', update);
  return () => {
    el.removeEventListener('play', update);
    el.removeEventListener('pause', update);
    el.removeEventListener('ended', update);
  };
}
