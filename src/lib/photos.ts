import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Serve web-optimized images only — never the full-resolution original.
// Every rendition is WebP, capped at MAX_WEB px on the long edge. We keep a
// generous ceiling so tall portraits stay crisp on high-DPI screens without
// forcing downsampled, blurry output in a tight masonry layout.
export const MAX_WEB = 5120;
const WIDTHS = [640, 960, 1280, 1600, 2048, 2880, 3840, 5120];

// Responsive `sizes` for the masonry gallery. On large screens we allow 3
// columns so the mosaic breathes and horizontal photos don't feel packed.
// Desktop reserves the 300px sidebar and keeps comfortable gaps between cards.
export const GRID_SIZES =
  '(min-width: 1350px) calc((100vw - 300px - 96px - 2 * var(--gap)) / 3), (min-width: 760px) calc((100vw - 40px - var(--gap)) / 2), calc(100vw - 40px)';

export interface RenderedPhoto {
  src: string;
  srcset: string;
  full: string;
}

// Build a responsive WebP srcset from explicit per-width renditions, so no image
// larger than the cap is ever generated. The largest rendition is reused as the
// lightbox image.
export async function renderPhoto(src: ImageMetadata): Promise<RenderedPhoto> {
  const cap = Math.min(MAX_WEB, src.width || MAX_WEB);
  const widths = WIDTHS.filter((w) => w <= cap);
  if (!widths.includes(cap)) widths.push(cap);
  widths.sort((a, b) => a - b);

  const renditions = await Promise.all(
    widths.map((w) => getImage({ src, width: w, format: 'webp', quality: 80 }))
  );
  const srcset = renditions.map((r) => `${r.src} ${r.attributes.width}w`).join(', ');
  const largest = renditions[renditions.length - 1];

  return { src: largest.src, srcset, full: largest.src };
}
