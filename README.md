# Realtime Polling — Vite Frontend

## Quick start
1. Install dependencies
   ```bash
   npm i
   ```
2. Run dev server
   ```bash
   npm run dev
   ```
3. Configure API URL
   - By default, the app expects the backend at `http://localhost:3000`.
   - Override with a `.env` file:
     ```bash
     echo "VITE_API_URL=http://localhost:3000" > .env
     ```

## What it covers
- Host auth: register + login (`/api/host/register`, `/api/host/login`).
- Host sessions: list + create (`GET/POST /api/host/sessions`).
- Host session detail: `GET /api/host/sessions/:id` (lists polls), create poll (`POST /api/host/sessions/:id/polls`), publish (`PUT /api/host/polls/:pollId/publish`), close (`PUT /api/host/polls/:pollId/close`), results (`GET /api/host/polls/:pollId/results`).
- Participant: check session, join, fetch published polls, submit response:
  - `GET /api/participant/sessions/:sessionCode`
  - `POST /api/participant/sessions/:sessionCode/join`
  - `GET /api/participant/sessions/:sessionCode/polls`
  - `POST /api/participant/polls/:pollId/submit`

## Notes
- Socket.IO is connected at `VITE_API_URL` and joins `session-<id>` rooms (backend emits `pollPublished` and `newResponse` events). This UI listens for `pollPublished` on both host and participant views and auto-updates the list.
- Each page/component has its own `.jsx` and `.css` file as requested.
- The login/register layout mirrors a clean panel style similar to the provided screenshots (dark UI, split form). Tweak `src/pages/Login.css` to match your exact design.
