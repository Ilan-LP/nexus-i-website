# Nexus-I Website - Demarrage avec .env

## 1. Prerequis

- Node.js 20+
- npm 10+

## 2. Installer les dependances

Depuis la racine du projet :

```bash
npm install
```

## 3. Configurer les fichiers .env

Le projet utilise 2 zones de configuration :

- Backend : `backend/.env`
- Frontend (Vite, via `envDir: ".."`) : `.env` a la racine

### 3.1 Backend

Copier l'exemple puis completer :

```bash
cp backend/.env.example backend/.env
```

Variables principales backend :

- `BACKEND_PORT` : port API (ex: `8080`)
- `FRONTEND_ORIGIN` : origine frontend autorisee (ex: `http://localhost:4173`)
- `CORS_ALLOWED_ORIGINS` : origines CORS (une ou plusieurs, separees par des virgules)
- `CONTACT_EMAIL` : adresse de reception des messages du formulaire
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` : config SMTP pour l'envoi d'emails
- `LOG_LEVEL` : niveau de logs (`debug`, `info`, etc.)

### 3.2 Frontend

Copier l'exemple frontend vers le fichier `.env` de la racine :

```bash
cp frontend/.env.example .env
```

Variables principales frontend :

- `FRONTEND_PORT` : port du serveur Vite (ex: `4173`)
- `BACKEND_PORT` : port API cible (ex: `8080`)
- `VITE_API_BASE_URL` : URL API (ex: `http://localhost:8080`)
- `VITE_PROXY_TARGET` : cible proxy Vite (ex: `http://localhost:8080`)
- `VITE_SITE_URL` : URL publique du site (utile pour sitemap/SEO)

## 4. Lancer le projet en local

Ouvrir 2 terminaux a la racine du projet.

Terminal 1 (backend) :

```bash
npm run dev:backend
```

Terminal 2 (frontend) :

```bash
npm run dev:frontend
```

Acces local :

- Frontend : `http://localhost:4173`
- API : `http://localhost:8080/api`

## 5. Commandes utiles

- Lancer les tests :

```bash
npm test
```

- Build frontend :

```bash
npm run build
```

- Preview frontend build :

```bash
npm run preview
```

## 6. Notes importantes

- Ne jamais commit les fichiers `.env` avec des secrets.
- Garder uniquement les exemples (`.env.example`) dans Git.
- Si le port est deja pris, changer `FRONTEND_PORT` et/ou `BACKEND_PORT` dans les `.env`.
