#!/usr/bin/env node
/**
 * Generates the placeholder MP4s in apps/web/public/videos/.
 *
 * Every clip is a silent, looping, brand-coloured card that states what it is
 * for and which file should replace it. Dropping a real MP4 over the same
 * filename needs no source change — the text disappears with the placeholder.
 *
 * Requires ffmpeg on PATH (with libfreetype for drawtext). If ffmpeg is missing
 * the script exits with an explanation instead of writing broken files.
 *
 *   node scripts/generate-placeholder-videos.mjs
 *   node scripts/generate-placeholder-videos.mjs --force   # overwrite existing
 */

import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, 'apps', 'web', 'public', 'videos');
const FONT_DIR = join(ROOT, '.tmp-fonts');
const FORCE = process.argv.includes('--force');

/*
 * drawtext needs an absolute font path, but a Windows drive letter contains a
 * colon, which the filtergraph parser treats as an option separator. Copying the
 * fonts to a relative folder sidesteps escaping entirely.
 */
const FONT = '.tmp-fonts/arialbd.ttf';
const FONT_REGULAR = '.tmp-fonts/arial.ttf';

/**
 * @typedef {{
 *   file: string;
 *   width: number;
 *   height: number;
 *   title: string;
 *   subtitle: string;
 *   seconds?: number;
 * }} Clip
 */

/** @type {Clip[]} */
const CLIPS = [
  {
    file: 'home/customer-service.mp4',
    width: 1200,
    height: 900,
    title: 'Customer service',
    subtitle: 'Placeholder video - replace this file',
  },
  {
    file: 'home/customer-stories.mp4',
    width: 1200,
    height: 900,
    title: 'Customer stories',
    subtitle: 'Placeholder video - replace this file',
  },
  {
    file: 'home/security-fraud.mp4',
    width: 1004,
    height: 426,
    title: 'Fraud protection',
    subtitle: 'Placeholder video - replace this file',
  },
  {
    file: 'home/security-lock.mp4',
    width: 1004,
    height: 426,
    title: 'Instant account locking',
    subtitle: 'Placeholder video - replace this file',
  },
];

function checkFfmpeg() {
  const probe = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  if (probe.error || probe.status !== 0) {
    console.error(
      '\nffmpeg was not found on PATH.\n\n' +
        'Install it first (Windows):  choco install ffmpeg -y\n' +
        'Then re-run:                 node scripts/generate-placeholder-videos.mjs\n\n' +
        'The website works without this script: every video slot falls back to its\n' +
        'poster image until an MP4 is placed in apps/web/public/videos/.\n',
    );
    process.exit(1);
  }

  const filters = spawnSync('ffmpeg', ['-hide_banner', '-filters'], { encoding: 'utf8' });
  if (!filters.stdout.includes('drawtext')) {
    console.error(
      '\nThis ffmpeg build has no drawtext filter (libfreetype). The site still works;\n' +
        'generate the clips with any editor instead, or install a full ffmpeg build.\n',
    );
    process.exit(1);
  }
}

function prepareFonts() {
  mkdirSync(FONT_DIR, { recursive: true });
  const sources = [
    ['C:/Windows/Fonts/arialbd.ttf', join(FONT_DIR, 'arialbd.ttf')],
    ['C:/Windows/Fonts/arial.ttf', join(FONT_DIR, 'arial.ttf')],
  ];
  for (const [from, to] of sources) {
    if (!existsSync(to)) {
      if (!existsSync(from)) {
        console.error(`Font not found: ${from}. Edit FONT/FONT_REGULAR in this script.`);
        process.exit(1);
      }
      copyFileSync(from, to);
    }
  }
}

function buildFilter(clip, seconds) {
  const { width, height, title, subtitle } = clip;
  const scale = width / 1200;
  const titleSize = Math.round(78 * scale);
  const subtitleSize = Math.round(30 * scale);
  const footerSize = Math.round(24 * scale);

  // A slow pulse on the accent bar proves the clip is playing without being
  // distracting, and the fades make the loop feel deliberate.
  const accentPulse = `x=(w-260*${scale})/2+sin(2*PI*t/6)*40*${scale}:y=${Math.round(
    height * 0.3,
  )}:w=${Math.round(260 * scale)}:h=${Math.round(6 * scale)}:color=0xFF0000@0.9`;

  return [
    `color=c=0x010065:s=${width}x${height}:d=${seconds}:r=24`,
    `drawbox=${accentPulse}:t=fill`,
    `drawtext=fontfile=${FONT}:text='NOVUS MFB':fontcolor=white@0.92:fontsize=${titleSize}:x=(w-text_w)/2:y=${Math.round(
      height * 0.38,
    )}`,
    `drawtext=fontfile=${FONT_REGULAR}:text='${title}':fontcolor=white@0.86:fontsize=${subtitleSize}:x=(w-text_w)/2:y=${Math.round(
      height * 0.38 + titleSize + 24 * scale,
    )}`,
    `drawtext=fontfile=${FONT_REGULAR}:text='${subtitle}':fontcolor=white@0.55:fontsize=${footerSize}:x=(w-text_w)/2:y=h-${Math.round(
      height * 0.14,
    )}`,
    `fade=t=in:st=0:d=0.6`,
    `fade=t=out:st=${seconds - 0.6}:d=0.6`,
    `format=yuv420p`,
  ].join(',');
}

function generate(clip) {
  const outPath = join(OUT_DIR, clip.file);
  const seconds = clip.seconds ?? 8;

  if (existsSync(outPath) && !FORCE) {
    console.log(`skip   ${clip.file} (exists - use --force to overwrite)`);
    return;
  }

  mkdirSync(dirname(outPath), { recursive: true });

  const args = [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-f',
    'lavfi',
    '-i',
    buildFilter(clip, seconds),
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '30',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    outPath,
  ];

  const result = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(`fail   ${clip.file}`);
    console.error(result.stderr?.trim() || 'ffmpeg failed');
    process.exitCode = 1;
    return;
  }

  const kb = Math.round(statSync(outPath).size / 1024);
  console.log(`wrote  ${clip.file}  ${clip.width}x${clip.height}  ${seconds}s  ${kb} KB`);
}

checkFfmpeg();
prepareFonts();
mkdirSync(OUT_DIR, { recursive: true });
for (const clip of CLIPS) generate(clip);
rmSync(FONT_DIR, { recursive: true, force: true });
console.log('\nDone. Files live in apps/web/public/videos/.');
