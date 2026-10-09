# VÉRION — 3D Luxury Watch Store (EN / FA)
React + Vite + R3F frontend, Express + PostgreSQL backend.

## Run locally (Git Bash)
```
# 1) database (PostgreSQL password: fatemeh963)
createdb -U postgres verion        # or create "verion" in pgAdmin
cd backend && npm install && npm run db:init && npm run dev
# 2) new terminal
cd frontend && npm install && npm run dev
```
Make admin: `UPDATE users SET role='admin' WHERE email='you@mail.com';`

## GitHub + Vercel
```
git init && git add . && git commit -m "VERION initial"
git branch -M main
git remote add origin https://github.com/<user>/luxrious-watches.git && git push -u origin main
```
Vercel: two projects from the same repo — Root Directory `frontend` (Vite) and `backend`.
Backend env vars: DATABASE_URL (use Neon/Supabase, not localhost), JWT_SECRET, PGSSL=true.
Frontend env var: VITE_API_URL=https://<backend>.vercel.app/api
Never commit `.env` (already in .gitignore).
