/** RSVP domain types. Framework-agnostic on purpose. */

/**
 * @typedef {'attending' | 'declined'} Attendance
 *
 * @typedef {Object} RsvpSubmission
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {Attendance} attendance
 * @property {string} guestOf      Whose guest they are, from the form's dropdown.
 * @property {string} events       Which part of the day they will be at.
 * @property {string} messageToCouple
 * @property {string} submittedAt
 *
 * @typedef {Object} RsvpReceipt
 * @property {string} id
 * @property {RsvpSubmission} submission
 */

/**
 * Persistence boundary (Dependency Inversion): the UI depends on this
 * contract, not on fetch, Google Forms or localStorage.
 *
 * @typedef {Object} RsvpService
 * @property {(submission: RsvpSubmission) => Promise<RsvpReceipt>} submit
 */

export class RsvpSubmissionError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'RsvpSubmissionError';
    this.cause = cause;
  }
}

export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `rsvp_${Date.now().toString(36)}`;
}
