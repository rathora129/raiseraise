# RaiseRaise Elevators — website

An original, interactive marketing site for RaiseRaise Elevators. Built with the
Next.js App Router in plain JavaScript, styled-components, Framer Motion and
React Three Fiber.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (static, all pages prerendered)
npm start       # serve the production build
```

Node 20+ is recommended. The build produces fully static pages; no server
runtime or database is required.

## Structure

```
app/                     routes, metadata, sitemap, robots, manifest
  layout.js              root shell, fonts, global styles, header/footer
  page.js                home (17 sections)
  about|products|installation|maintenance|repair|modernization|interiors|projects|contact
components/
  layout/                header, mobile menu, footer, floating CTAs, preloader, page transition
  sections/              home-page sections (hero, ranges, services, industries, journey, FAQ…)
  pages/                 page-level composition for each route
  three/                 WebGL hero + cabin configurator (lazy-loaded, with fallbacks)
  ui/                    shared primitives (buttons, headings, reveals, accordions…)
lib/
  site.js                company details, navigation, CTA link builders  ← edit contact data here
  content.js             products, services, finishes, projects, FAQs
  seo.js                 metadata + JSON-LD helpers
  theme.js               colour, spacing, motion and breakpoint tokens
public/
  favicon.svg
  images/brand/          vector logo and icon masters (+ PNG exports)
  images/{cabins,details,engineering,spaces,og}
assets/fonts/            Manrope variable font source
scripts/                 logo/OG generators and headless QA utilities
```

## Contact details are intentionally incomplete

`lib/site.js` is the single source of truth for phone, WhatsApp, email and
address. Only the client-confirmed WhatsApp/call number is populated:

- WhatsApp / phone: `+91 78274 33486`
- email, address, opening hours, map URL: **null until the client confirms them**

Anything null is hidden or shown as a clearly marked "pending" state — never
invented. To go live with the full contact block, fill in the null fields in
`lib/site.js` and add the corresponding UI fields in `components/pages/ContactPage.jsx`
and `components/layout/Footer.jsx`.

Similarly, `content.js` must only list offerings the client actually provides.
Do not add certifications, awards, customer testimonials, client names or
completed-project claims unless they are verified.

## Imagery and 3D policy

- All cabin/interior renders are **conceptual visualisations**, not photographs
  of completed installations. Captions and alt text say so.
- The hero and cabin studio load Three.js only when the section is in view, on
  capable devices, and with motion allowed. Otherwise a static image fallback is
  shown and labelled "Concept visualisation".
- Reduced-motion users get static layouts; drag/scroll animations are disabled.
- Replace concept renders with real project photography only once the client
  supplies it (and update captions accordingly).

## Logo

The vector master is `public/images/brand/raiseraise-logo.svg`, with the icon at
`raiseraise-icon.svg` and the favicon at `public/favicon.svg`. PNG exports
(≥3000 px wide master) live alongside them. Regenerate them with
`node scripts/build-logo.mjs` and the social card with `node scripts/build-og.mjs`.

## SEO

Every route has a unique title, description, canonical, Open Graph and Twitter
metadata. `app/sitemap.js`, `app/robots.js` and `app/manifest.js` are generated
at build time. JSON-LD covers Organization/LocalBusiness plus Service and FAQ
schema only where the content is visible on the page. Set the production domain
in `lib/site.js` (`site.url`) before launch.

## QA scripts

With the dev server running, these headless-Chrome checks capture screenshots to
`/tmp` and report console errors, overflow, broken images and missing alt text:

```bash
node scripts/qa.mjs desktop / /about /products      # full-page sweep
node scripts/qa.mjs mobile / /contact
node scripts/qa-seo.mjs                             # titles, canonicals, JSON-LD
node scripts/qa-links.mjs                           # internal link audit
node scripts/qa-webgl.mjs                           # live WebGL scenes
```

Some checks need system Chrome; the path is defined at the top of each script.

## Deployment

Nothing is deployed or pushed from this repository automatically. Production
deployment requires explicit client approval; set the real domain in
`lib/site.js` first.
