// Derives the theme logos from the two seal sources and the site icons from
// public/profile.jpg. Re-run after updating either source image.
//
//   npm run gen:brand   # creates the two source seals (or supply your own)
//   npm run gen:icons   # then run this to derive everything below
//
// Inputs:
//   src/assets/:
//   logo-seal-light.png  → darker red seal, already transparent  (LIGHT theme)
//   logo-seal-dark.png   → lighter red seal on a WHITE background (DARK theme)
//   public/profile.jpg   → circular site and browser icons
//
// Outputs:
//   src/assets/seal.png            light-theme logo (trimmed, scaled)
//   src/assets/seal-dark.png       dark-theme logo  (white keyed out → transparent)
//   public/favicon.png             theme-aware favicon (light/default)
//   public/favicon-dark.png        theme-aware favicon (dark)
//   public/apple-touch-icon.png    iOS home-screen icon (opaque)
//
// The OG share image (public/og.jpg) is regenerated separately by
// generate-placeholders.mjs.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '..', 'src', 'assets');
const PUBLIC = join(__dirname, '..', 'public');

const SRC_LIGHT = join(ASSETS, 'logo-seal-light.png'); // darker red, transparent
const SRC_DARK = join(ASSETS, 'logo-seal-dark.png'); // lighter red, white bg
const PROFILE = join(PUBLIC, 'profile.jpg');

const CREAM = '#fcfcfb'; // site light background (for the opaque iOS icon)
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

// Match the old tree logo's longest edge so the seal renders at ~the same scale.
const LONG_EDGE = 805;

// The pink seal sits on white paper. Its ink has much lower green/blue than the
// paper, so we derive alpha from how far min(G,B) drops below white — clean,
// anti-aliased edges, original ink color preserved, grungy texture kept.
async function keyOutWhite(srcPath) {
  const { data, info } = await sharp(srcPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const HI = 235; // min(G,B) >= HI  → fully transparent (paper)
  const LO = 180; // min(G,B) <= LO  → fully opaque (ink)
  for (let i = 0; i < data.length; i += channels) {
    const minGB = Math.min(data[i + 1], data[i + 2]);
    let a = ((HI - minGB) / (HI - LO)) * 255;
    a = a < 0 ? 0 : a > 255 ? 255 : a;
    data[i + 3] = Math.round((data[i + 3] / 255) * a);
  }
  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

// Trim transparent margins, then scale so the longest edge == LONG_EDGE.
async function trimAndScale(input) {
  const trimmed = await sharp(input).trim().toBuffer();
  const m = await sharp(trimmed).metadata();
  const scale = LONG_EDGE / Math.max(m.width, m.height);
  return sharp(trimmed).resize(Math.round(m.width * scale), Math.round(m.height * scale)).png().toBuffer();
}

async function circularProfile(size, pad, background) {
  const inner = size - pad * 2;
  const profile = await sharp(PROFILE)
    .resize(inner, inner, { fit: 'cover', position: 'attention' })
    .png()
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${inner}" height="${inner}"><circle cx="${inner / 2}" cy="${inner / 2}" r="${inner / 2}" fill="#fff"/></svg>`,
  );
  const circle = await sharp(profile)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: circle, left: pad, top: pad }])
    .png()
    .toBuffer();
}

async function main() {
  const faviconsOnly = process.argv.includes('--favicons-only');
  if (!faviconsOnly) {
    // 1) Theme logos — identical dimensions so toggling themes never shifts layout.
    const lightLogo = await trimAndScale(SRC_LIGHT); // darker red (already transparent)
    const lm = await sharp(lightLogo).metadata();
    await sharp(lightLogo).toFile(join(ASSETS, 'seal.png'));

    const darkTrimmed = await sharp(await keyOutWhite(SRC_DARK)).trim().toBuffer();
    const darkLogo = await sharp(darkTrimmed)
      .resize(lm.width, lm.height, { fit: 'contain', background: TRANSPARENT })
      .png()
      .toBuffer();
    await sharp(darkLogo).toFile(join(ASSETS, 'seal-dark.png'));
  }

  // 2) Circular profile favicons with transparent corners and breathing room.
  await sharp(await circularProfile(256, 14, TRANSPARENT)).toFile(join(PUBLIC, 'favicon.png'));
  await sharp(await circularProfile(256, 14, TRANSPARENT)).toFile(join(PUBLIC, 'favicon-dark.png'));

  // 3) Apple touch icon with a cream canvas behind the circular profile.
  await sharp(await circularProfile(180, 16, CREAM)).toFile(join(PUBLIC, 'apple-touch-icon.png'));

  const outputs = [
    ...(faviconsOnly ? [] : ['src/assets/seal.png', 'src/assets/seal-dark.png']),
    'public/favicon.png',
    'public/favicon-dark.png',
    'public/apple-touch-icon.png',
  ];
  for (const f of outputs) {
    const m = await sharp(join(__dirname, '..', f)).metadata();
    console.log('  ' + f.padEnd(32), m.width + 'x' + m.height, m.hasAlpha ? 'alpha' : 'opaque');
  }
  console.log('Done.');
}

await main();
