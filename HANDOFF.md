# HANDOFF.md — current state (update this at every milestone)

Last updated: 2026-10-10. Written from the chat history with the previous assistant; nothing here was executed by that assistant (no builds/tests were run by it unless stated).

## Goal
Finish and polish the VÉRION store + portfolio so it can be customised for a client, then deploy frontend and backend.

## Done
- Home: scroll-driven 3D skeleton watch (exploded view), glass text cards, stats, features, collection, hero text (EN/FA).
- Product page: 3D viewer, case/dial/strap configurator (metal strap: black/white/gold), price, part picking, exploded toggle.
- Collection page with filter + banner; product cards use images from `public/images/collection` (see "Do not" in AGENTS.md).
- Header: fixed solid, mega menu, search overlay, hamburger (≤1100px), flag language switch, dark/light, FlipText hover/tap effect. Footer, floating support chat (local bot) with social links.
- Blog (video-loop hero slider from `public/articles/hero-articles.mp4`), About (3D boutique scene), Contact (mailto form).
- Portfolio `/portfolio`: GSAP ScrollTrigger sections, 3D knot scene, pinned horizontal projects (VÉRION first), tools section as a rotating 3D "mountain" of tool badges + collapsible full list, keyword highlight marks, bold text.
- Light theme has an orange accent.
- Deployed: GitHub `fatemerostami2021-hash/luxrious-watches` (main); frontend live at https://luxrious-watches-orcin.vercel.app (Vercel Hobby).
- A local `npm run build` succeeded once, before the Portfolio/tools/mountain updates.

## Latest changes (packages "update14"–"update16", applied by unzip over the repo)
- update15: orange accent for light theme, portfolio scene tinted by theme.
- update16: `ToolsMountain.jsx`, bolder portfolio text, `Mark` highlights, bouncy reveals. **Not verified in a browser yet.**

## Verify first
1. `git status` / `git diff` and compare with this file. 2. `cd frontend && npm install && npm run build`. 3. Open `/`, `/portfolio`, `/about`, `/blog`, product page in desktop + mobile width, both themes, both languages.
- Risk areas: CSS 3D mountain (backface, mobile performance, clicking moving nodes), ScrollTrigger pin vs reveal ordering, `Mark` regex with Persian (ZWNJ) words, mega menu on touch, mobile glass readability, About scene performance.

## Pending
- Deploy backend (Vercel project, root `backend`) + cloud Postgres (Neon/Supabase), run `db:init`, set `VITE_API_URL`, redeploy frontend. Until then login/orders/DB posts don't work.
- Admin dashboard UI (API exists: products/orders, role `admin`). Image uploads.
- Payment gateway (Zarinpal/Zibal for Iran, Stripe international), real live chat (Tawk.to/Crisp), email notifications.
- SEO: replace `YOUR-DOMAIN.vercel.app` in `public/sitemap.xml` and `robots.txt`; product JSON-LD; OG image; consider SSR/prerender (Next.js) for a client.
- Replace placeholders: footer email/phone, social URLs (Telegram link may belong to another project), tagline claims (warranty/shipping).
- Real 3D model (GLB) or 360° photo sequences; compress the blog video (<5 MB).
- Add `frontend/public/images/collection/` to `.gitignore` if the photos are still not licensed (verify it was done).

## Decisions made
- Local Lightformers instead of a remote HDRI (speed). Single fixed solid header (no fade). Persian letter animation by word only. Tool section = rotating 3D mountain (user choice). Persian text weights: headings/menu/buttons bold, paragraphs medium (portfolio is bolder). IRANYekan not used (license/no files); Vazir is.
- Vercel Hobby is non-commercial: a client's real store should move to the client's account/Pro.

## Open questions for the owner
- Client market (Iran vs international) and whether the client has real products/3D assets. Which social accounts belong on the site.
