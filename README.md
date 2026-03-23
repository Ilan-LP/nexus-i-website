# Nexus-I Website

[![Node.js](https://img.shields.io/badge/node-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Frontend](https://img.shields.io/badge/frontend-React%2019%20%2B%20Vite-646CFF?logo=vite&logoColor=white)](./frontend)
[![Backend](https://img.shields.io/badge/backend-Express%205-000000?logo=express&logoColor=white)](./backend)
[![Process Manager](https://img.shields.io/badge/process-PM2-2B037A?logo=pm2&logoColor=white)](https://pm2.keymetrics.io/)

Production-ready monorepo for the Nexus-I marketing website and lead intake API.

It provides:
- A React + Vite frontend (multi-page portfolio/services/contact experience)
- An Express API for contact and meeting forms
- SMTP email delivery for inbound leads
- Rate-limiting, validation, security headers, and PM2 process management

Main value: run a complete business website stack (frontend + API) from one repository with a single production start command.

## 1) Project Title & Description

**Nexus-I Website** is a full-stack web platform designed for a technical freelance/agency presence.

Core use case:
- Present services, projects, and company information
- Capture qualified leads via contact and meeting forms
- Forward submissions by email to an operational inbox

Why it matters:
- Fast frontend delivery (Vite build)
- Lightweight API without unnecessary complexity
- Production execution handled with PM2 and environment-based config

## 2) Tech Stack

### Frontend
- React 19
- Vite 8
- Tailwind CSS 3
- React Router DOM 6
- i18next / react-i18next
- Framer Motion
- Vitest + Testing Library

### Backend
- Node.js (ESM)
- Express 5
- Helmet
- CORS
- express-rate-limit
- Nodemailer
- Pino (logging)
- Jest + Supertest

### Infrastructure / Runtime
- npm workspaces (monorepo)
- PM2 (process manager)
- VPS-friendly deployment model

### Database
- No database is currently required.
- Form data is validated and sent directly via SMTP.

## 3) Installation

### Prerequisites
- Node.js >= 20 (LTS recommended)
- npm >= 10
- PM2 installed globally for production runtime

```bash
npm install -g pm2
```

### Setup
1. Clone the repository
```bash
git clone https://github.com/Ilan-LP/nexus-i-website.git
cd nexus-i-website
```

2. Install dependencies (root + workspaces)
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update `.env` with real values (SMTP, domain, ports)

## 4) Environment Variables

The project reads environment variables from the repository root `.env` file.

### Required variables

```env
NODE_ENV=production

# Core ports (must be unique on VPS)
FRONTEND_PORT=4173
BACKEND_PORT=8080
FRONTEND_HOST=0.0.0.0

# Frontend build/runtime
VITE_SITE_URL=https://example.com
VITE_API_BASE_URL=https://example.com/api
VITE_PROXY_TARGET=http://localhost:8080

# Backend runtime
CORS_ALLOWED_ORIGINS=https://example.com
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=900000
CONTACT_EMAIL=contact@example.com
LOG_LEVEL=info

# SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password
SMTP_FROM="Nexus-I <no-reply@example.com>"
```

### Notes
- `FRONTEND_PORT` and `BACKEND_PORT` are fully configurable.
- `CORS_ALLOWED_ORIGINS` supports comma-separated origins.
- For local development, set:
  - `VITE_API_BASE_URL=` (empty) to use Vite proxy
  - `VITE_PROXY_TARGET=http://localhost:<BACKEND_PORT>`
- SMTP variables are mandatory for contact/meeting delivery.

### `.env.example`
Use the provided root `.env.example` as your baseline template.

## 5) Usage

### Run locally (development)

Start frontend:
```bash
npm run dev
```

Start backend (separate terminal):
```bash
npm run dev:backend
```

Default local behavior:
- Frontend dev server runs on `FRONTEND_PORT`
- `/api` requests are proxied to backend (`VITE_PROXY_TARGET`)

### Run locally (production-like)

Build frontend:
```bash
npm run build
```

Start backend only:
```bash
npm start
```

Start frontend static server only:
```bash
npm run start:prod --workspace frontend
```

### Run full production stack (single command)

```bash
npm run start:prod
```

This command executes:
- clean install (`npm ci`)
- frontend build
- dev dependency pruning
- PM2 start/reload from `ecosystem.config.js`

## 6) Scripts

### Root scripts
- `npm run dev`: start frontend dev server
- `npm run dev:frontend`: same as above
- `npm run dev:backend`: start backend server
- `npm run build`: build frontend
- `npm run build:prod`: production frontend build alias
- `npm run preview`: preview Vite build
- `npm run start`: start backend (production mode depends on `.env`)
- `npm run install:prod`: install locked deps with `npm ci`
- `npm run prune:prod`: remove dev dependencies
- `npm run pm2:start`: start/reload PM2 processes
- `npm run pm2:stop`: stop PM2 apps (`nexus-i-frontend`, `nexus-i-backend`)
- `npm run start:prod`: one-command production bootstrap
- `npm run test`: run tests in all workspaces
- `npm run lint`: run linting in all workspaces
- `npm run format`: run Prettier in all workspaces

### Frontend workspace (`frontend/package.json`)
- `dev`, `build`, `preview`
- `start:prod`: serve built `frontend/dist`
- `sitemap`: generate sitemap
- `test`, `test:watch`, `lint`, `format`

### Backend workspace (`backend/package.json`)
- `dev`, `start`
- `test`
- `lint`, `format`

## 7) Production Deployment (VPS + PM2)

### Example deployment flow

1. Provision server and install Node.js + npm + PM2
```bash
npm install -g pm2
```

2. Clone project and configure environment
```bash
git clone https://github.com/Ilan-LP/nexus-i-website.git
cd nexus-i-website
cp .env.example .env
# edit .env with real values
```

3. Start full stack with one command
```bash
npm run start:prod
```

4. Enable PM2 startup on reboot
```bash
pm2 startup
pm2 save
```

5. Check runtime
```bash
pm2 status
pm2 logs nexus-i-backend
pm2 logs nexus-i-frontend
```

### Reverse proxy recommendation
Use Nginx (or Caddy) in front of the app:
- Public site -> `FRONTEND_PORT`
- API path `/api` and `/api/v1` -> `BACKEND_PORT`
- Terminate TLS at proxy layer

## 8) Project Structure

```text
.
├── backend/                 # Express API (routes, controllers, middleware, services)
├── frontend/                # React app (pages, components, hooks, i18n)
├── ecosystem.config.js      # PM2 process definitions (frontend + backend)
├── .env.example             # Environment template
├── package.json             # Monorepo scripts + workspace orchestration
└── eslint.config.mjs        # Shared lint configuration
```

Architecture notes:
- Monorepo with two focused workspaces keeps deployment simple.
- Backend owns validation, anti-spam honeypot checks, and email dispatch.
- Frontend communicates via API client to `/api/v1` endpoints.

## 9) API Documentation

Base paths:
- `/api`
- `/api/v1`

### Health Check
- `GET /api/v1/health`

Example:
```bash
curl -X GET http://localhost:8080/api/v1/health
```

Successful response:
```json
{
  "status": "ok",
  "success": true,
  "uptime": 123.45,
  "timestamp": "2026-01-01T12:00:00.000Z"
}
```

### Contact Form
- `POST /api/v1/contact`

Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I need a quote for a web platform.",
  "website": ""
}
```

Example:
```bash
curl -X POST http://localhost:8080/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"I need a quote.","website":""}'
```

### Meeting Request
- `POST /api/v1/meeting`

Body:
```json
{
  "name": "Jane Doe",
  "phone": "+33 6 12 34 56 78",
  "preferredTime": "Weekdays after 14:00",
  "website": ""
}
```

Example:
```bash
curl -X POST http://localhost:8080/api/v1/meeting \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","phone":"+33 6 12 34 56 78","preferredTime":"Weekdays after 14:00","website":""}'
```

### Error behavior
- `400`: invalid payload
- `404`: route not found
- `429`: rate limit exceeded
- `500`: email delivery/server error

## 10) Best Practices / Notes

- Keep `VITE_API_BASE_URL` explicit in production to avoid cross-origin ambiguity.
- Use strict SMTP credentials with provider-level rate limits.
- Configure `CORS_ALLOWED_ORIGINS` to trusted domains only.
- Do not expose Node processes directly to the internet; use reverse proxy + TLS.
- Monitor PM2 process health and logs continuously.
- Run `npm run test` and `npm run lint` in CI before deployment.
- Pin dependencies via lockfile and use `npm ci` in production.

## 11) Troubleshooting

### App fails to start with invalid port
Cause: missing or non-numeric `FRONTEND_PORT`/`BACKEND_PORT`.
Fix: set valid values in `.env` (1-65535).

### `Port is already in use`
Cause: another service uses configured port.
Fix: change port in `.env` or stop the conflicting process.

### Contact/meeting requests return `500`
Cause: SMTP misconfiguration or unreachable SMTP host.
Fix:
- verify `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- verify outbound network access from VPS

### Frontend cannot reach API in production
Cause: incorrect `VITE_API_BASE_URL` or reverse proxy routing.
Fix:
- set `VITE_API_BASE_URL` to your public API base (example: `https://domain.tld/api`)
- ensure reverse proxy forwards `/api` to backend

### CORS errors in browser
Cause: missing origin in `CORS_ALLOWED_ORIGINS`.
Fix: add your frontend domain(s), comma-separated.

### PM2 process not restored after reboot
Cause: startup not registered.
Fix:
```bash
pm2 startup
pm2 save
```

## 12) License

ISC License.
