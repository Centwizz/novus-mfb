import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from '../src/lib/consent';

/**
 * Seeds the cookie acknowledgement before the suite runs.
 *
 * The notice is a fixed overlay at the bottom of the viewport. Without this,
 * every existing spec would start on a first visit and could have footer or CTA
 * clicks intercepted. The dedicated consent spec opts out of this state to test
 * the real first-visit path.
 */
const statePath = join(__dirname, '.auth', 'consent.json');

export default async function globalSetup(): Promise<void> {
  const origin = new URL(process.env.E2E_BASE_URL ?? 'http://localhost:3000').origin;

  const state = {
    cookies: [],
    origins: [
      {
        origin,
        localStorage: [
          {
            name: CONSENT_STORAGE_KEY,
            value: JSON.stringify({
              version: CONSENT_VERSION,
              choice: 'essential',
              at: new Date().toISOString(),
            }),
          },
        ],
      },
    ],
  };

  await mkdir(dirname(statePath), { recursive: true });
  await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}
