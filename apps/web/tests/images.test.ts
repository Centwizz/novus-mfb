import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  aboutImages,
  bannerImages,
  boardMembers,
  homeImages,
  serviceImages,
  teamMembers,
} from '../src/lib/images';

/**
 * Placeholder format guardrail.
 *
 * The owner replaces placeholders by dropping a file over the existing path, so
 * the extension in the manifest is a contract. Placeholders are JPG; the two
 * home hero photos are real WebP photographs. This test fails if either the
 * manifest or the files on disk drift from that split.
 */
const PUBLIC_DIR = join(__dirname, '..', 'public');

const placeholderSrcs = [
  ...Object.values(homeImages),
  ...Object.values(bannerImages),
  ...Object.values(aboutImages),
  ...Object.values(serviceImages),
  ...boardMembers,
  ...teamMembers,
]
  .filter((slot) => slot !== homeImages.heroDesktop && slot !== homeImages.heroMobile)
  .map((slot) => slot.src)
  .filter((src): src is string => Boolean(src));

const heroSrcs = [homeImages.heroDesktop.src, homeImages.heroMobile.src].filter(
  (src): src is string => Boolean(src),
);

const isJpeg = (buffer: Buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
const isWebp = (buffer: Buffer) =>
  buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
  buffer.subarray(8, 12).toString('ascii') === 'WEBP';

function publicFile(path: string): string {
  return join(PUBLIC_DIR, path.replace(/^\//, ''));
}

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

describe('image placeholder formats', () => {
  it('declares exactly 29 JPG placeholders', () => {
    expect(placeholderSrcs).toHaveLength(29);
    for (const src of placeholderSrcs) {
      expect(src, `${src} should be a JPG placeholder`).toMatch(/\.jpg$/);
    }
  });

  it('keeps the two real hero photographs as WebP', () => {
    expect(heroSrcs).toHaveLength(2);
    for (const src of heroSrcs) {
      expect(src).toMatch(/\.webp$/);
    }
  });

  it('ships a valid JPEG for every placeholder', () => {
    for (const src of placeholderSrcs) {
      const file = publicFile(src);
      expect(existsSync(file), `${src} is missing`).toBe(true);
      expect(isJpeg(readFileSync(file)), `${src} is not a JPEG`).toBe(true);
    }
  });

  it('ships a valid WebP for both hero photographs', () => {
    for (const src of heroSrcs) {
      const file = publicFile(src);
      expect(existsSync(file), `${src} is missing`).toBe(true);
      expect(isWebp(readFileSync(file)), `${src} is not a WebP`).toBe(true);
    }
  });

  it('contains no stale WebP placeholder files', () => {
    const webpFiles = walk(join(PUBLIC_DIR, 'images'))
      .filter((file) => file.toLowerCase().endsWith('.webp'))
      .map((file) => relative(join(PUBLIC_DIR, 'images'), file).replace(/\\/g, '/'))
      .sort();

    expect(webpFiles).toEqual(['banners/home-hero-mobile.webp', 'banners/home-hero.webp']);
  });
});
