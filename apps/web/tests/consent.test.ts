import { describe, expect, it } from 'vitest';
import {
  CONSENT_VERSION,
  createConsent,
  parseConsent,
  shouldShowConsent,
} from '../src/lib/consent';

/**
 * Consent parsing must fail closed: anything we cannot fully understand means
 * the visitor is asked again. Silently treating a malformed value as consent
 * would defeat the point of the notice.
 */
describe('parseConsent', () => {
  it('accepts the value this build writes', () => {
    const stored = createConsent(new Date('2026-10-25T09:30:00.000Z'));
    expect(parseConsent(JSON.stringify(stored))).toEqual(stored);
  });

  it('returns null for missing storage', () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent('')).toBeNull();
  });

  it('returns null for malformed JSON', () => {
    expect(parseConsent('{not json')).toBeNull();
    expect(parseConsent('"just a string"')).toBeNull();
    expect(parseConsent('null')).toBeNull();
  });

  it('returns null when the version is from an older build', () => {
    const raw = JSON.stringify({ version: CONSENT_VERSION - 1, choice: 'essential', at: '2026-10-25T09:30:00.000Z' });
    expect(parseConsent(raw)).toBeNull();
  });

  it('returns null for a choice this build does not implement', () => {
    const raw = JSON.stringify({ version: CONSENT_VERSION, choice: 'advertising', at: '2026-10-25T09:30:00.000Z' });
    expect(parseConsent(raw)).toBeNull();
  });

  it('returns null when the timestamp is not a real date', () => {
    const raw = JSON.stringify({ version: CONSENT_VERSION, choice: 'essential', at: 'not-a-date' });
    expect(parseConsent(raw)).toBeNull();
  });

  it('drops unknown extra fields instead of echoing them back', () => {
    const raw = JSON.stringify({
      version: CONSENT_VERSION,
      choice: 'essential',
      at: '2026-10-25T09:30:00.000Z',
      injected: 'value',
    });
    expect(parseConsent(raw)).toEqual({
      version: CONSENT_VERSION,
      choice: 'essential',
      at: '2026-10-25T09:30:00.000Z',
    });
  });
});

describe('shouldShowConsent', () => {
  it('shows the notice when nothing valid is stored', () => {
    expect(shouldShowConsent(null)).toBe(true);
    expect(shouldShowConsent('{"version":99}')).toBe(true);
  });

  it('hides the notice once acknowledged', () => {
    expect(shouldShowConsent(JSON.stringify(createConsent()))).toBe(false);
  });
});

describe('createConsent', () => {
  it('records the essential choice and a valid ISO timestamp', () => {
    const now = new Date('2026-10-25T09:30:00.000Z');
    const consent = createConsent(now);
    expect(consent.choice).toBe('essential');
    expect(consent.version).toBe(CONSENT_VERSION);
    expect(consent.at).toBe(now.toISOString());
    expect(Number.isNaN(Date.parse(consent.at))).toBe(false);
  });
});
