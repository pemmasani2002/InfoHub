# InfoHub (React + Vite)

Single Page App with three modules:
- Weather display
- Currency converter (INR base)
- Motivational quotes

The app talks to an Express backend at `/api/*`.

## Local Development

- Backend
  - `cd server && npm i && npm run dev` (runs on port 5000)
- Frontend
  - `cd frontend && npm i && npm run dev` (runs on port 5173)
  - Vite proxy is configured to forward `/api` to `http://localhost:5000`.

## Environment Variables

- server/.env
  - `PORT=5000`
  - `OPENWEATHER_KEY=...` (optional; mock weather used if not provided)
  - `ALLOWED_ORIGIN=` (leave empty when serving frontend from same domain; set to your frontend origin only for split deploy)
- frontend/.env (only for split deploy)
  - `VITE_API_BASE_URL=https://your-backend-domain.com`

## Build

```
cd frontend
npm ci
npm run build
```
This produces `frontend/dist`.

## Deployment Options

### 1) Single Deployment (Recommended)
- Build frontend: `cd frontend && npm ci && npm run build`
- Install server deps: `cd ../server && npm ci`
- Start in production: `NODE_ENV=production node server.js`
- The Express server will serve the React build and expose APIs under `/api/*`.

Render/Railway example:
- Build command:
```
bash -c "cd frontend && npm ci && npm run build && cd ../server && npm ci"
```
- Start command:
```
node server.js
```
- Env vars: `NODE_ENV=production`, `PORT=5000`, `OPENWEATHER_KEY=...` (optional)

### 2) Split Deployment (Frontend + Backend Separate)
- Backend: deploy `server/` and set:
  - `NODE_ENV=production`
  - `ALLOWED_ORIGIN=https://your-frontend-domain`
  - `OPENWEATHER_KEY=...` (optional)
- Frontend: set `frontend/.env` with:
  - `VITE_API_BASE_URL=https://your-backend-domain`
- Build and deploy `frontend/dist` to static host (Vercel/Netlify/etc.)

## Smoke Tests

- `GET /health` → `{ "status": "ok" }`
- `GET /api/weather?city=Hyderabad`
- `GET /api/convert?amount=100`
- `GET /api/quote`

## Notes

- Timeouts and logging are enabled on backend routes for resiliency.
- If deploying publicly, consider adding request logging and simple rate limiting.
