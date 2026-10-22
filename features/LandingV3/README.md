# Landing page v3 — maintainer's guide

The landing page is a static, data-driven page. Nothing on it is hand-edited HTML: copy lives in one
file, data is fetched from the brainlife API at build time, and the pictures are either real media from
publications and Apps or geometric motifs in the brand colours.

## Where things are

| What you want to change | Where |
| --- | --- |
| Any wording, link, list of tiles, tools or infrastructure | `lib/landing/content.ts` |
| Logo colour pairs and the accents derived from them | `lib/landing/pairs.ts` (`PAIRS`) |
| Which hero visuals rotate | `lib/landing/pairs.ts` (`HERO_VARIANTS`) and `features/LandingV3/components/Hero.tsx` |
| The three hero drawings | `lib/landing/draw.ts` |
| The geometric motifs (datatype tiles, fallback for cards without media) | `lib/landing/motifs.ts`; static copies in `public/brand/motifs/` via `npm run brand:motifs` |
| How publications and Apps are fetched and thumbnailed | `scripts/fetch-landing-data.mjs` |
| The data the page renders | `public/landing-data/{pubs,apps,people}.json` + `media/` (generated; a snapshot is committed) |
| Layout and tokens | `features/LandingV3/landing-v3.css` (everything scoped under `.lv3`) |
| Brand assets | `public/brand/` (five pairs, dark/light, a themable SVG) |
| Section components | `features/LandingV3/components/*.tsx`, one file per section |

## How a page load works

1. `LandingV3Page` renders. The first thing in it is a tiny inline script (`PICK_SCRIPT`) that runs as the
   HTML streams in: it picks a hero variant by weight (`HERO_WEIGHTS`, the flow field most often; `#field|#lens|#ruler`
   in the URL pins one; the ruler is never chosen on narrow screens) and a logo pair (`?pair=tealyellow`
   pins one), writes six CSS variables and `data-hero` on `<html>`, and stores the choice on `window.__bl`.
   CSS keyed on `data-hero` lays the hero out before React hydrates, so there is no flash or layout shift.
2. The site's accent colours are CSS variables that read those six: `--accent` on light surfaces,
   `--hero-accent` on dark. Components never reference a colour directly.
3. Sections that depend on the random pick read `window.__bl` through `useSyncExternalStore`, so the
   server render is deterministic and the client takes over without hydration warnings.
4. Publication and App cards shuffle on the client after hydration (`requestAnimationFrame`), media-rich
   cards first. Cards without media show a geometric motif chosen from their tags (`pickMotif` in
   `motifs.ts`), rendered on the server as inline SVG in the pair's colours; the record id decides which
   colour leads, so a card keeps its picture across shuffles. Carousels auto-advance slowly with a
   visible pause button, and not at all under `prefers-reduced-motion`.

## How data gets in

`npm run landing:data` (run by the deploy workflow on every deploy and nightly) calls three endpoints:

- `/api/warehouse/pub?populate=groups.apps&deref_contacts=true` — publications; media comes from
  `bannerImage`, `groups[].videoPlaylist[]` (first frame via ffmpeg) and `groups[].viewerLinks[]` (counted).
- `/api/warehouse/app?sort=-stats.requested` — most-requested Apps, one card per GitHub repo.
- `/api/auth/profile/list?find={sub:{$in:[…]}}` — resolves App admin ids to names and institutions.

The page shows a subset (`PAGE_CARDS`, media-rich first, then newest); `count` is the API total.
Thumbnails are made content-aware: the script finds the picture's bounding box against its background,
crops a 16:9 window centred on it, and letterboxes on a blurred copy when the content is much wider or
taller. Every request has a 30 s timeout and the job a 25-minute cap. Before overwriting the committed
snapshot the script checks the new data is plausible (enough records, some media, run counts present);
if the API is down or the shape changed, the previous files are kept and the deploy still succeeds.
`npm test` runs `scripts/verify-landing-data.mjs`, which checks the JSON against `lib/landing/types.ts`,
that ids are unique and media URLs are https, and that every logo pair's light accent meets 4.5:1.

## Common changes

- **Add a logo pair**: append to `PAIRS`. `accentLight` must reach 4.5:1 on `#f7f8f6` (the verify
  script enforces it); `accentDark` is the hemisphere colour itself.
- **Change how often each hero appears**: `HERO_WEIGHTS` in `pairs.ts`.
- **Pin a pair or hero for a campaign**: set `window.__bl` logic in `PICK_SCRIPT`, or link with
  `?pair=…#lens`.
- **Add a motif**: add the name to `MOTIFS` and a drawing function to `DRAW` in `motifs.ts` (the compiler
  insists on both), a label in `MOTIF_LABEL`, a keyword rule in `pickMotif()` so records can fall back to
  it, and a row in `TILES` if it should appear in the scales section. Run `npm run brand:motifs` to
  refresh the static SVGs. Keep to the house rule: one repeated flat unit, two colours, no gradients.
- **Add a tool or infrastructure item**: edit `ECOSYSTEM.tools` or `INFRASTRUCTURE.groups` in `content.ts`.
- **Change the stats line**: `STATS` in `content.ts`; the publications count comes from `pubs.json`.
- **Retire a hero**: remove it from `HERO_VARIANTS`; the pick script and `Hero.tsx` key off that list.

## Review tools

Open the page with `?review=1` for a bar with "Shuffle logo pair", "Next hero" and a feedback link. A
staging build (`NEXT_PUBLIC_PREVIEW=1`, set by `.github/workflows/deploy-preview.yml` in a fork) shows
that bar to everyone and is `noindex`; see `STAGING.md` for the collaborator-review setup. The previous
landing page is kept at `/legacy` until the team is happy to delete `features/Landing`.

## Known limits and the plan

Near term (worth doing before announcing):

1. **Only a handful of publications carry media** (4 of 64 at the time of writing). The page copes with
   placeholders, but the fix is upstream: have the publication editor ask for a banner image, and document
   `videoPlaylist` / `viewerLinks` for authors. Every new banner shows up on the next nightly build.
2. **Stats are hand-typed** (Apps, users, datasets). Extend `fetch-landing-data.mjs` to read counts from
   the warehouse and write them into `pubs.json`-style files, then drop the constants.
3. **People link to the research page**, not to profiles. The profile API gives `sub`; once a public
   profile URL exists, store it in `people.json` and link each name.
4. **Fonts**: the layout loads Geist from Google Fonts at build; CI must reach fonts.googleapis.com
   (it does on GitHub Actions). If that ever breaks, switch to `next/font/local`.

Medium term:

5. **Real thumbnails for publications without media**: a build step that renders a representative file
   from the published dataset (T1w, tractogram, surface, Zarr) with headless NiiVue or Neuroglancer, so
   stylised tiles become the exception. The hook is the `thumb` field; nothing in the page changes.
6. **A `landing` section in the datatype registry** (icon + scale) so `TILES` is generated rather than
   listed, and new datatypes appear automatically.
7. **Analytics on the hero and pair picks** (`window.__bl`) to learn which combinations people engage
   with, then trim the rotation.
8. **Localization**: all copy is already in one file; a second `content.<lang>.ts` and a switch in
   `LandingV3Page` is the whole job.

Non-goals, deliberately: no client-side API calls (static export stays fast and offline-safe), no
generated or AI-styled imagery (motifs are plain geometry; real media comes from the records), no brand
logos of third-party tools (text chips avoid trademark questions).
