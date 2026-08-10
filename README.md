# Medico Overseas — Updated Codebase

## ⚠️ Before anything else
1. Rotate the Gmail app password and reCAPTCHA secret that were in the original zip's `backend/.env` — they were live credentials.
2. Copy `backend/.env.example` → `backend/.env` and fill in real values (see comments in that file).
3. Set `JWT_SECRET` to a real random string (`openssl rand -hex 32`) — the server refuses to start without one.
4. Set `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` to create your first admin account (works once only, then blank them out).
5. (Optional) Set `ANTHROPIC_API_KEY` to enable the real AI chatbot — without it, the chatbot automatically falls back to the scripted flow.

## Install & run
```bash
cd backend && npm install && npm start        # runs on :5000
cd frontend && npm install && npm run dev      # runs on :5173, proxies /api to backend
```

## What changed in this pass — security
- Fixed a fail-open auth bug in the admin dashboard (network errors used to grant access)
- Removed hardcoded admin backdoor credentials; replaced with bcrypt-hashed passwords + a one-time env-based bootstrap
- Added bcrypt password hashing (was plaintext)
- Locked down `/api/admin/profile` (was fully unauthenticated — anyone could take over the admin account)
- Locked down all admin data routes (`/api/inquiries`, `/api/notifications`, `/api/inquiries/export-csv`, blog/gallery/FAQ/testimonial/site-settings writes) behind JWT auth — these were leaking student PII (names, phones, NEET scores) to anyone
- Removed the insecure hardcoded JWT fallback secret
- Added rate limiting to public form and chat endpoints
- Stripped real secrets from `.env`, added `.env.example` and `.gitignore`

## What changed — AI chatbot
- `backend/aiKnowledgeBase.js` compiles your real country/exam data into the AI's system prompt, so it can't invent facts not on your site
- `POST /api/chat` calls the real Claude API, with automatic fallback to the old scripted responses if no API key is set or the request fails
- Chatbot free-text input is now wired to this endpoint with a typing indicator

## Verified
- `backend/server.js`, `models/User.js`, `aiKnowledgeBase.js` — pass `node --check`
- `frontend` — production build (`vite build`) succeeds cleanly
