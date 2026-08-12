# ---- Stage 1: build the frontend (Vite) ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN npm ci

COPY frontend ./frontend
RUN npm run build --workspace frontend

# ---- Stage 2: production runtime (backend only, serves frontend/dist) ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
RUN npm ci --omit=dev --workspace=backend

COPY backend ./backend
COPY --from=build /app/frontend/dist ./frontend/dist

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001 \
    && chown -R nodejs:nodejs /app
USER nodejs

# The backend itself serves the built frontend when SERVE_FRONTEND=true
# (see backend/server.js). BACKEND_PORT is read from the env at runtime,
# default to 8080 to match backend/.env.example.
ENV SERVE_FRONTEND=true
EXPOSE 8080

CMD ["node", "backend/server.js"]
