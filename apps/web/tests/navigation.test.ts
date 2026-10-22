import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getPrimaryNavHrefs, getFooterNavHrefs } from '../src/lib/hrefs';

/**
 * Navigation integrity.
 *
 * Every internal href in the header and footer navigation must map to a real
 * route in the App Router (a `page.tsx` under src/app). This catches dead links
 * introduced when pages are renamed in later phases.
 */
const APP_DIR = join(__dirname, '..', 'src', 'app');

function routeExists(href: string): boolean {
  const segments = href.split('/').filter(Boolean);
  const pagePath = join(APP_DIR, ...segments, 'page.tsx');
  return existsSync(pagePath);
}

describe('public navigation', () => {
  const hrefs = Array.from(new Set([...getPrimaryNavHrefs(), ...getFooterNavHrefs()]));

  it('has at least one link in each navigation region', () => {
    expect(getPrimaryNavHrefs().length).toBeGreaterThan(0);
    expect(getFooterNavHrefs().length).toBeGreaterThan(0);
  });

  it.each(hrefs)('%s resolves to a real route', (href) => {
    expect(href.startsWith('/'), `${href} must be an internal absolute path`).toBe(true);
    expect(routeExists(href), `no page.tsx found for ${href}`).toBe(true);
  });
});
