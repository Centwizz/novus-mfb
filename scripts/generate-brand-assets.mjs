/**
 * Brand asset generator.
 *
 * Produces the browser icons and the social-sharing card from the single
 * owner-supplied logo file. Run from the repo root:
 *
 *   npm run assets:brand
 *
 * Why this exists:
 *   - The logo is 204x204 with an OPAQUE white background. Browsers and social
 *     platforms need their own sizes, and a favicon request for /favicon.ico
 *     returned 404 before this script existed.
 *   - Icons keep the artwork exactly as supplied. The white background is
 *     intentional: there is no alpha channel in the source, and inventing a
 *     transparent mark would be fabricating brand artwork.
 *   - The social card uses only the name and tagline. No licence, insurance or
 *     deposit claims are drawn, because those are still unverified.
 *
 * Outputs (all overwritten on every run):
 *   apps/web/src/app/favicon.ico            16 + 32 px
 *   apps/web/src/app/icon.png               512 px
 *   apps/web/src/app/apple-icon.png         180 px
 *   apps/web/public/brand/og-image.png      1200x630
 *
 * IMPORTANT: these go in `src/app`, not a top-level `app` directory. Next.js
 * prefers a root `app/` over `src/app/` when both exist, and creating an empty
 * root `app/` silently makes every page disappear from the build.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const webRoot = join(root, 'apps', 'web');
const sourceLogo = join(webRoot, 'public', 'brand', 'novus-mfb-logo.png');

const BRAND = '#010065';
const BRAND_MID = '#1a1bcc';
const ACCENT = '#ff0000';
const WHITE = '#ffffff';
const SANS = 'Inter, Segoe UI, Arial, Helvetica, sans-serif';

/**
 * Trim the logo's uniform white border so the mark can be centred at any size.
 * The source has no alpha channel, so trimming is done against white explicitly.
 */
async function trimmedMark() {
  return sharp(await readFile(sourceLogo))
    .trim({ background: WHITE, threshold: 12 })
    .png()
    .toBuffer();
}

/**
 * A square icon: the mark centred on a white ground with proportional padding.
 *
 * `markRatio` is the fraction of the canvas the mark's longest edge may occupy.
 * Icons are written as opaque PNGs because the source artwork is opaque and
 * Apple composites any transparency to black.
 */
async function icon(size, markRatio) {
  const mark = await trimmedMark();
  const target = Math.round(size * markRatio);
  const fitted = await sharp(mark)
    .resize(target, target, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const { width = target, height = target } = await sharp(fitted).metadata();

  return sharp({
    create: { width: size, height: size, channels: 4, background: WHITE },
  })
    .composite([
      {
        input: fitted,
        left: Math.round((size - width) / 2),
        top: Math.round((size - height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Wrap PNG buffers in a Windows ICO container.
 *
 * ICO allows PNG-compressed entries (Vista and later), which lets us avoid a
 * BMP encoder. Layout: 6-byte ICONDIR, then one 16-byte ICONDIRENTRY per image,
 * then the image payloads.
 */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(16 * entries.length);
  let offset = 6 + directory.length;

  entries.forEach(({ size, data }, index) => {
    const entry = index * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 0); // width
    directory.writeUInt8(size >= 256 ? 0 : size, entry + 1); // height
    directory.writeUInt8(0, entry + 2); // palette size
    directory.writeUInt8(0, entry + 3); // reserved
    directory.writeUInt16LE(1, entry + 4); // colour planes
    directory.writeUInt16LE(32, entry + 6); // bits per pixel
    directory.writeUInt32LE(data.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...entries.map((e) => e.data)]);
}

/** White rounded tile holding the mark, used on the social card. */
async function logoTile(size, radius) {
  const mark = await trimmedMark();
  const inset = Math.round(size * 0.14);
  const fitted = await sharp(mark)
    .resize(size - inset * 2, size - inset * 2, { fit: 'inside' })
    .toBuffer();
  const { width = size - inset * 2, height = size - inset * 2 } =
    await sharp(fitted).metadata();

  const tile = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${WHITE}"/>
     </svg>`,
  );

  return sharp(tile)
    .composite([
      {
        input: fitted,
        left: Math.round((size - width) / 2),
        top: Math.round((size - height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

/** 1200x630 Open Graph / Twitter card. Name and tagline only — no claims. */
async function socialCard() {
  const width = 1200;
  const height = 630;
  const tileSize = 176;

  const background = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0" stop-color="${BRAND}"/>
           <stop offset="1" stop-color="${BRAND_MID}"/>
         </linearGradient>
       </defs>
       <rect width="${width}" height="${height}" fill="url(#bg)"/>
       <circle cx="1064" cy="86" r="210" fill="none" stroke="${WHITE}" stroke-opacity="0.08" stroke-width="2"/>
       <circle cx="1064" cy="86" r="140" fill="none" stroke="${WHITE}" stroke-opacity="0.08" stroke-width="2"/>
       <circle cx="96" cy="566" r="170" fill="none" stroke="${WHITE}" stroke-opacity="0.06" stroke-width="2"/>
       <g font-family="${SANS}" text-anchor="middle">
         <text x="${width / 2}" y="372" font-size="68" font-weight="700" fill="${WHITE}">Novus MFB</text>
         <text x="${width / 2}" y="414" font-size="22" font-weight="600" letter-spacing="7" fill="#b9bbff">MICROFINANCE BANK</text>
         <text x="${width / 2}" y="474" font-size="32" font-weight="400" fill="${WHITE}" fill-opacity="0.92">Banking built around you</text>
       </g>
       <rect x="${(width - 96) / 2}" y="512" width="96" height="6" rx="3" fill="${ACCENT}"/>
     </svg>`,
  );

  const tile = await logoTile(tileSize, 30);

  return sharp(background)
    .composite([
      {
        input: tile,
        left: Math.round((width - tileSize) / 2),
        top: 84,
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  const appDir = join(webRoot, 'src', 'app');
  await mkdir(appDir, { recursive: true });
  await mkdir(join(webRoot, 'public', 'brand'), { recursive: true });

  // Guard against the shadowing mistake described at the top of this file: a
  // top-level `apps/web/app` (even empty) makes Next ignore `src/app`.
  await rm(join(webRoot, 'app'), { recursive: true, force: true });

  const png16 = await icon(16, 0.82);
  const png32 = await icon(32, 0.82);
  const apple = await icon(180, 0.8);
  const icon512 = await icon(512, 0.78);
  const og = await socialCard();

  await writeFile(join(appDir, 'favicon.ico'), ico([
    { size: 16, data: png16 },
    { size: 32, data: png32 },
  ]));
  await writeFile(join(appDir, 'icon.png'), icon512);
  await writeFile(join(appDir, 'apple-icon.png'), apple);
  await writeFile(join(webRoot, 'public', 'brand', 'og-image.png'), og);

  console.log('Wrote:');
  console.log('  apps/web/src/app/favicon.ico            (16 + 32)');
  console.log('  apps/web/src/app/icon.png               (512)');
  console.log('  apps/web/src/app/apple-icon.png         (180)');
  console.log('  apps/web/public/brand/og-image.png      (1200x630)');
}

await main();
