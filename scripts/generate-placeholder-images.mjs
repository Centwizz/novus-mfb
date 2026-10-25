/**
 * Placeholder image generator.
 *
 * Creates every placeholder required by the central image manifest so the site
 * looks complete before the owner supplies final photography.
 *
 * Run from the repo root:   node scripts/generate-placeholder-images.mjs
 * Re-run any time to regenerate. It OVERWRITES files, so do not run it after
 * replacing a placeholder with a real photograph.
 *
 * Design rules baked in:
 *   - Novus brand colours only (indigo #010065 family, red #FF0000 accent).
 *   - Each placeholder states its own intended use in large type (e.g. HOME HERO).
 *   - People use a neutral silhouette + the word PLACEHOLDER, never a fake face.
 *   - Dimensions match the real layout slot exactly, so nothing shifts on replacement.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesRoot = join(root, 'apps', 'web', 'public', 'images');

const BRAND = '#010065';
const BRAND_MID = '#1a1bcc';
const BRAND_LIGHT = '#3d40e6';
const ACCENT = '#ff0000';
const WHITE = '#ffffff';

/** Escape text for inlining into SVG markup. */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Build an SVG for a "scene" placeholder (banners, section artwork).
 * Scales all type relative to the shorter edge so it reads at any resolution.
 */
function sceneSvg({ width, height, label, variant = 'brand' }) {
  const min = Math.min(width, height);
  const titleSize = Math.round(min * 0.085);
  const subSize = Math.round(min * 0.032);
  const pad = Math.round(min * 0.07);
  const radius = Math.round(min * 0.03);

  const bg =
    variant === 'light'
      ? `<defs>
           <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stop-color="#eef0ff"/>
             <stop offset="100%" stop-color="#dfe2ff"/>
           </linearGradient>
         </defs>
         <rect width="${width}" height="${height}" fill="url(#g)"/>
         <circle cx="${width * 0.82}" cy="${height * 0.22}" r="${min * 0.42}" fill="${BRAND_LIGHT}" opacity="0.12"/>
         <circle cx="${width * 0.12}" cy="${height * 0.88}" r="${min * 0.34}" fill="${BRAND_MID}" opacity="0.10"/>`
      : `<defs>
           <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stop-color="${BRAND_MID}"/>
             <stop offset="55%" stop-color="${BRAND}"/>
             <stop offset="100%" stop-color="#01003b"/>
           </linearGradient>
         </defs>
         <rect width="${width}" height="${height}" fill="url(#g)"/>
         <circle cx="${width * 0.85}" cy="${height * 0.18}" r="${min * 0.44}" fill="${BRAND_LIGHT}" opacity="0.35"/>
         <circle cx="${width * 0.1}" cy="${height * 0.9}" r="${min * 0.36}" fill="#00001a" opacity="0.35"/>`;

  const titleFill = variant === 'light' ? BRAND : WHITE;
  const subFill = variant === 'light' ? '#4b4b63' : 'rgba(255,255,255,0.85)';
  const chipFill = variant === 'light' ? BRAND : WHITE;
  const chipText = variant === 'light' ? WHITE : BRAND;

  // A simple mark: rounded square + baseline rule, echoing the layout language.
  const markSize = Math.round(min * 0.1);
  const markX = pad;
  const markY = height - pad - markSize;
  const accentW = Math.round(min * 0.16);
  const accentH = Math.round(min * 0.012);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${bg}
  <g font-family="Inter, Segoe UI, system-ui, sans-serif">
    <text x="${pad}" y="${pad + titleSize}" font-size="${titleSize}" font-weight="700"
          fill="${titleFill}" letter-spacing="${Math.round(min * 0.002)}">${esc(label)}</text>
    <text x="${pad}" y="${pad + titleSize + subSize * 1.6}" font-size="${subSize}" font-weight="400"
          fill="${subFill}">Placeholder image &#183; replace with your own photo &#183; ${width} &#215; ${height}px</text>

    <rect x="${markX}" y="${markY}" width="${markSize}" height="${markSize}" rx="${Math.round(markSize * 0.28)}" fill="${chipFill}" opacity="${variant === 'light' ? 1 : 0.92}"/>
    <text x="${markX + markSize / 2}" y="${markY + markSize * 0.72}" font-size="${Math.round(markSize * 0.62)}"
          font-weight="700" text-anchor="middle" fill="${chipText}">N</text>
    <text x="${markX + markSize * 1.35}" y="${markY + markSize * 0.72}" font-size="${Math.round(markSize * 0.44)}"
          font-weight="600" fill="${titleFill}" opacity="0.9">NOVUS MFB</text>

    <rect x="0" y="${height - accentH}" width="${accentW}" height="${accentH}" fill="${ACCENT}"/>
  </g>
</svg>`;
}

/**
 * Build an SVG for a portrait placeholder (board members, staff).
 * Uses a neutral, faceless silhouette so no invented person is implied.
 */
function portraitSvg({ width, height, label }) {
  const min = Math.min(width, height);
  const titleSize = Math.round(min * 0.075);
  const subSize = Math.round(min * 0.038);
  const pad = Math.round(min * 0.07);

  const headR = Math.round(min * 0.15);
  const headCx = width / 2;
  const headCy = height * 0.42;
  const bodyW = Math.round(min * 0.52);
  const bodyH = Math.round(min * 0.34);
  const bodyX = (width - bodyW) / 2;
  const bodyY = headCy + headR * 1.15;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#dfe2ff"/>
      <stop offset="100%" stop-color="#c3c8ff"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#pg)"/>
  <circle cx="${width * 0.85}" cy="${height * 0.12}" r="${min * 0.3}" fill="${BRAND_LIGHT}" opacity="0.12"/>

  <g fill="${BRAND}" opacity="0.28">
    <circle cx="${headCx}" cy="${headCy}" r="${headR}"/>
    <rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="${Math.round(bodyW * 0.35)}"/>
  </g>

  <g font-family="Inter, Segoe UI, system-ui, sans-serif">
    <text x="${width / 2}" y="${height - pad - subSize * 2.6}" font-size="${titleSize}" font-weight="700"
          text-anchor="middle" fill="${BRAND}">${esc(label)}</text>
    <text x="${width / 2}" y="${height - pad - subSize * 1.1}" font-size="${subSize}" font-weight="500"
          text-anchor="middle" fill="#4b4b63">PLACEHOLDER &#183; not a real person</text>
    <text x="${width / 2}" y="${height - pad}" font-size="${Math.round(subSize * 0.85)}" font-weight="400"
          text-anchor="middle" fill="#71718a">${width} &#215; ${height}px</text>
  </g>
  <rect x="0" y="${height - Math.round(min * 0.012)}" width="${Math.round(width * 0.34)}" height="${Math.round(min * 0.012)}" fill="${ACCENT}"/>
</svg>`;
}

/** variant: light panel vs dark panel. */
const SCENES = [
  // Home banners
  ['banners/home-hero.webp', 1920, 800, 'HOME HERO (DESKTOP)', 'brand'],
  ['banners/home-hero-mobile.webp', 780, 1688, 'HOME HERO (MOBILE)', 'brand'],
  ['banners/about-hero.webp', 1920, 480, 'ABOUT US BANNER', 'brand'],
  ['banners/personal-banking.webp', 1920, 480, 'PERSONAL BANKING BANNER', 'brand'],
  ['banners/services-banner.webp', 1920, 480, 'SAVINGS BANNER', 'brand'],
  ['banners/loans-banner.webp', 1920, 480, 'LOANS BANNER', 'brand'],
  ['banners/business-banking.webp', 1920, 480, 'BUSINESS BANKING BANNER', 'brand'],
  ['banners/contact-banner.webp', 1920, 480, 'CONTACT BANNER', 'brand'],
  ['banners/security-banner.webp', 1920, 480, 'SECURITY BANNER', 'brand'],
  ['banners/careers-banner.webp', 1920, 480, 'CAREERS BANNER', 'brand'],
  ['banners/newsroom-banner.webp', 1920, 480, 'NEWSROOM BANNER', 'brand'],

  // Home sections
  ['home/services.webp', 1244, 910, 'HOME SERVICES — TRANSFERS', 'light'],
  ['home/debit-card.webp', 1244, 910, 'HOME SERVICES — DEBIT CARD', 'light'],
  ['home/savings.webp', 1244, 910, 'HOME SERVICES — SAVINGS', 'light'],
  ['home/mobile-banking.webp', 1426, 794, 'HOME — DOWNLOAD APP', 'brand'],
  ['home/security-fraud.webp', 1400, 592, 'HOME — SECURITY TILE 1', 'light'],
  ['home/security-lock.webp', 1400, 592, 'HOME — SECURITY TILE 2', 'light'],
  ['home/customer-service.webp', 800, 600, 'HOME — CUSTOMER SERVICE', 'brand'],
  ['home/customer-stories.webp', 800, 600, 'HOME — CUSTOMER STORIES', 'brand'],

  // About
  ['about/about-intro.webp', 1200, 900, 'ABOUT — INTRO PHOTO', 'light'],
  ['about/team-group.webp', 1600, 900, 'ABOUT — TEAM GROUP PHOTO', 'light'],

  // Service pages
  ['services/personal-banking.webp', 1244, 910, 'PERSONAL BANKING IMAGE', 'light'],
  ['services/savings.webp', 1244, 910, 'SAVINGS IMAGE', 'light'],
  ['services/loans.webp', 1244, 910, 'LOANS IMAGE', 'light'],
  ['services/business-banking.webp', 1244, 910, 'BUSINESS BANKING IMAGE', 'light'],
];

const PORTRAITS = [
  ['about/board-chairman.webp', 800, 1000, 'BOARD CHAIRMAN'],
  ['about/board-member-02.webp', 800, 1000, 'BOARD MEMBER 02'],
  ['about/board-member-03.webp', 800, 1000, 'BOARD MEMBER 03'],
  ['about/board-member-04.webp', 800, 1000, 'BOARD MEMBER 04'],
  ['team/managing-director.webp', 800, 1000, 'MANAGING DIRECTOR'],
  ['team/operations-manager.webp', 800, 1000, 'OPERATIONS MANAGER'],
  ['team/customer-service-manager.webp', 800, 1000, 'CUSTOMER SERVICE MANAGER'],
  ['team/it-manager.webp', 800, 1000, 'IT MANAGER'],
];

async function render(relPath, svg) {
  const out = join(imagesRoot, relPath);
  await mkdir(dirname(out), { recursive: true });
  const buf = await sharp(Buffer.from(svg)).webp({ quality: 82, effort: 5 }).toBuffer();
  await writeFile(out, buf);
  return { relPath, bytes: buf.length };
}

async function main() {
  const results = [];

  for (const [rel, w, h, label, variant] of SCENES) {
    results.push(await render(rel, sceneSvg({ width: w, height: h, label, variant })));
  }
  for (const [rel, w, h, label] of PORTRAITS) {
    results.push(await render(rel, portraitSvg({ width: w, height: h, label })));
  }

  // Keep the directories that have no generated files yet but are part of the
  // documented structure, so the owner sees them immediately.
  for (const dir of ['icons']) {
    await mkdir(join(imagesRoot, dir), { recursive: true });
  }

  const total = results.reduce((n, r) => n + r.bytes, 0);
  console.log(`Generated ${results.length} placeholder images (${(total / 1024).toFixed(0)} KB total).`);
  for (const r of results) {
    console.log(`  ${r.relPath.padEnd(48)} ${(r.bytes / 1024).toFixed(1)} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
