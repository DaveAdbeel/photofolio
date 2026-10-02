import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Generate sitemap-index.xml + sitemap-0.xml (referenced from robots.txt).
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/robots.txt') && !page.endsWith('/llms.txt'),
    }),
  ],
  // Content-Security-Policy is delivered as an HTTP header from public/_headers
  // (not an Astro <meta>) so that `frame-ancestors` takes effect. The policy uses
  // script-src/style-src 'unsafe-inline' for the few small inline scripts this
  // theme ships — notably the pre-paint theme toggle in Layout.astro, which must
  // run inline before the bundle loads. Astro's security.csp is intentionally
  // left off: it would emit script hashes, and the browser ignores 'unsafe-inline'
  // whenever a hash is present.
  // Your production domain — used for canonical URLs, Open Graph tags, the
  // sitemap, robots.txt, llms.txt, and the JSON-LD. CHANGE THIS to your own
  // domain; everything URL-bound is derived from it.
  site: 'https://example.com',

  // Preserve Astro's pre-v7 HTML whitespace handling. Astro 7 changed the
  // default `compressHTML` from `true` to `'jsx'`, which strips whitespace with
  // JSX rules and drops the literal spaces this theme relies on between text and
  // inline elements — e.g. "and a <a>Photo Blog</a>" would render as
  // "and aPhoto Blog", and "on <a>Instagram</a>" as "onInstagram". Pinning
  // `true` keeps the exact rendered spacing the template shipped with.
  compressHTML: true,

  // Fully static output — deploy the generated dist/ to any static host.
  // Images are optimized at build time with sharp.
  build: {
    // Inline ALL stylesheets into the HTML. With 'auto', global.css exceeded
    // the inlining threshold and shipped as an external file; whenever the
    // first paint beat that file, the page rendered unstyled and then snapped
    // into the sidebar layout — a near-whole-viewport Cumulative Layout Shift
    // attributed to html>body>main.main (seen on /calendar/). Inlining
    // guarantees the first paint already matches the final layout, and drops a
    // render-blocking request.
    inlineStylesheets: 'always',
  },
});
