# AGENTS.md — VÉRION (luxrious-watches)

Project rules for any coding agent (Codex, Claude Code, etc.). Read this first, then `HANDOFF.md`.

## What this is
- **VÉRION**: a concept (fictional) Swiss-inspired luxury watch store, bilingual **EN / FA (RTL)**, dark + light theme.
- Also contains a **portfolio SPA** (`/portfolio`) for the developer (Fatemeh Rostami), built from her resume.
- Owner's language: Persian. Reply in Persian unless asked otherwise. Keep answers short and practical.

## Stack
- `frontend/`: Vite + React 18 (plain JS, no TypeScript), react-router 6, zustand (persist), three 0.164, @react-three/fiber 8, @react-three/drei 9, gsap + ScrollTrigger, @fontsource fonts. Styles are plain CSS: `src/styles.css` then `src/extra.css` (layered blocks v4–v14; later blocks override earlier ones).
- `backend/`: Express + pg + jsonwebtoken + bcryptjs, PostgreSQL. Vercel serverless entry: `backend/api/index.js` (re-exports `src/app.js`).
- Deploy: frontend on Vercel (root dir `frontend`), repo on GitHub `main`.

## Commands
- Frontend: `cd frontend && npm install && npm run dev` / `npm run build` (run build before every commit).
- Backend: `cd backend && npm install && npm run db:init && npm run dev` (needs `backend/.env`).
- Env: backend `DATABASE_URL`, `JWT_SECRET`, `PGSSL`; frontend `VITE_API_URL`. **Never commit `.env`.**
- There are no automated tests. Do not claim tests passed; verify by building and by checking pages in a browser.

## Key files
- `src/data.js` products, prices, UI strings (`T`), `BANNER`; `src/copy.js` homepage paragraphs; `src/posts.js` blog posts; `src/info.js` watch part descriptions; `src/toolsData.js` tool icons/colors; `src/socials.js` social links (empty url = hidden).
- `src/components/Watch.jsx` procedural watch (named parts/layers; replaceable by a GLB later). `Scene.jsx` home/product canvas, `ShopScene.jsx` About boutique animation, `PortfolioScene.jsx`, `ToolsMountain.jsx` (CSS 3D rotating tool cone).
- `src/components/Header.jsx` (single fixed header, mega menu, search, hamburger), `FlipText.jsx`, `Footer.jsx`, `Chat.jsx` (local rule-based bot), `Social.jsx`.
- Pages in `src/pages/`: Home, Collection, Product, Cart, Blog, BlogPost, About, Contact, Account, Portfolio.

## Conventions (do not break)
- **Persian text must never be split into letters** (breaks joining). `FlipText` splits by word in FA. Keep `letter-spacing: 0` in RTL.
- Every user-facing string needs EN and FA.
- Home scroll animation progress is computed from the `#collection` offset; keep that when changing section heights.
- Three.js stays lazy-loaded (`React.lazy` + Suspense); the 3D scene mounts after idle. No remote HDRI (uses local Lightformers).
- Light theme palette: cream background, black bold text, orange accent via `--ac` / `--af`. Text blocks sit in `.glass` cards (translucent so the watch shows through, especially on mobile).
- Reveal animations: `.rv` (home, spring easing, IntersectionObserver) and `.pf-rv` / `.pf-j` (portfolio, GSAP `back.out`, `once: true`). Create ScrollTrigger pins before later triggers.
- Fonts: `VazirLocal` (files in `frontend/public/fonts/Vazir-{Regular,Medium,Bold}`) with Vazirmatn fallback; brand wordmark stays Cormorant Garamond.

## Do not
- Do not publish images from other watch brands. `frontend/public/images/collection/*` currently holds photos taken from versionwatches.fr for local layout only; they must not ship to GitHub/Vercel. Replace with owned/licensed images.
- Do not use real brand logos, names or designs in VÉRION.
- Do not store secrets in code. Do not put the owner's phone numbers on the site without asking.
- Do not rewrite large files without reason; make targeted edits.
