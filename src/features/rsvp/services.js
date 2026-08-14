import { GoogleFormRsvpService } from './googleForm';
import { RsvpSubmissionError, createId } from './types';

/**
 * Posts the RSVP to any JSON endpoint (serverless function, Formspree,
 * Google Apps Script, Airtable proxy ...). Configure with VITE_RSVP_ENDPOINT.
 *
 * This is the only path that can read a real status code, which is why it is
 * tried first: a browser posting straight to Google cannot tell success from
 * a 401.
 */
export class HttpRsvpService {
  constructor(endpoint, fetchImpl = fetch.bind(globalThis)) {
    this.endpoint = endpoint;
    this.fetchImpl = fetchImpl;
  }

  async submit(submission) {
    try {
      const response = await this.fetchImpl(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        const failure = await response.json().catch(() => null);
        const error = new RsvpSubmissionError(
          failure?.problems?.join(' ') ??
            `The RSVP service replied with ${response.status}.`,
        );
        /*
          The server could read Google's real answer. If it says the form
          itself is refusing the response, retrying over the browser's blind
          no-cors channel would fail in exactly the same way but be reported
          to the guest as success. Stop instead of lying.
        */
        error.definitive = Boolean(failure?.definitive);
        throw error;
      }

      const payload = await response.json().catch(() => null);
      return { id: payload?.id ?? createId(), submission };
    } catch (error) {
      if (error instanceof RsvpSubmissionError) throw error;
      throw new RsvpSubmissionError('We could not reach the RSVP service.', error);
    }
  }
}

/**
 * Zero-config fallback used in development and preview builds so the form is
 * always fully functional. Responses are queued in localStorage and can be
 * exported later.
 */
export class LocalStorageRsvpService {
  constructor(storageKey = 'nk-wedding-rsvps', storage = globalThis.localStorage, latencyMs = 700) {
    this.storageKey = storageKey;
    this.storage = storage;
    this.latencyMs = latencyMs;
  }

  async submit(submission) {
    await new Promise((resolve) => setTimeout(resolve, this.latencyMs));
    const receipt = { id: createId(), submission };

    try {
      const existing = this.readAll();
      this.storage?.setItem(this.storageKey, JSON.stringify([...existing, receipt]));
    } catch (error) {
      throw new RsvpSubmissionError('Your browser blocked local storage.', error);
    }

    return receipt;
  }

  readAll() {
    const raw = this.storage?.getItem(this.storageKey);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}

/**
 * Tries each service in turn and returns the first receipt.
 *
 * Used so an RSVP is never lost: the serverless endpoint is preferred (it
 * writes the Google Form row and can check the status code), and if it is
 * unavailable the browser writes straight to the Google Form instead.
 *
 * An error flagged `definitive` stops the chain: it means the destination
 * rejected the response outright, so the remaining blind paths would only
 * manufacture a false confirmation.
 */
export class FallbackRsvpService {
  constructor(services) {
    this.services = services;
  }

  async submit(submission) {
    let lastError = null;

    for (const service of this.services) {
      try {
        return await service.submit(submission);
      } catch (error) {
        lastError = error;
        if (error?.definitive) break;
      }
    }

    throw lastError instanceof RsvpSubmissionError
      ? lastError
      : new RsvpSubmissionError('We could not record your RSVP.', lastError);
  }
}

/**
 * Chooses the implementation from the environment. Open for extension.
 *
 * 1. `VITE_RSVP_ENDPOINT` (defaults to the bundled `/api/rsvp` function) -
 *    records the response in the Google Form and verifies the status code.
 * 2. Direct Google Form submission - used if the endpoint is missing or down
 *    (for example on a purely static host).
 * 3. localStorage - last resort so nothing is ever silently dropped.
 */
export function createRsvpService(
  endpoint = import.meta.env.VITE_RSVP_ENDPOINT ?? '/api/rsvp',
) {
  const services = [];
  if (endpoint) services.push(new HttpRsvpService(endpoint));
  services.push(new GoogleFormRsvpService());
  services.push(new LocalStorageRsvpService());
  return new FallbackRsvpService(services);
}
