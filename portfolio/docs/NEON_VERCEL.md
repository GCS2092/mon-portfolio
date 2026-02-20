# Neon + Vercel (Option A : 1 JSON) — Guide d’installation

Objectif :
- **Déployer le front (Vite/React)** sur Vercel.
- **Héberger le “backend”** via des **API Routes Vercel** (`/api/*`).
- **Persister les projets** dans **Neon Postgres** en stockant **un seul JSON** (table KV).

Ce repo utilise 2 clés KV dans Neon :
- `portfolio:projects:v1` (projets)
- `portfolio:links:v1` (liens sociaux)

Ce repo est déjà préparé pour :
- `GET /api/projects` → lit le JSON des projets depuis Neon
- `PUT /api/projects` → écrit le JSON des projets dans Neon (**protégé par `ADMIN_TOKEN`**)
- `GET /api/links` → lit le JSON des liens sociaux depuis Neon
- `PUT /api/links` → écrit le JSON des liens sociaux (**protégé par `ADMIN_TOKEN`**)

---

## 1) Pré-requis

- Un compte **Neon**
- Un compte **Vercel**
- Le projet push sur GitHub/GitLab/Bitbucket (recommandé pour déploiement Vercel)

---

## 2) Côté Neon : créer la table KV

Tu n’as **pas besoin** de pgAdmin ni d’une base en local.

### Option 1 (recommandé) : Neon Console → SQL Editor

Dans le projet Neon, ouvre **SQL Editor** et exécute :

```sql
CREATE TABLE IF NOT EXISTS app_kv (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO app_kv (key, value)
VALUES ('portfolio:projects:v1', '[]'::jsonb)
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    updated_at = now();

INSERT INTO app_kv (key, value)
VALUES ('portfolio:links:v1', '[]'::jsonb)
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value,
    updated_at = now();
```

### Option 2 : `psql` (sans DB locale)

`psql` se connecte à **Neon** (distant). Il n’installe rien côté serveur chez toi.

1) Installer `psql` (ex: via installation PostgreSQL ou via WSL)
2) Se connecter :

```bash
psql "<TA_DATABASE_URL>"
```

3) Coller le SQL ci-dessus.

---

## 3) Côté Vercel : connecter Neon

### 3.1 Ajouter les variables d’environnement

Dans Vercel :
- Project → Settings → Environment Variables

Ajoute :
- `DATABASE_URL`
  - Mets **l’URL Neon pooler** (recommandé en serverless)
  - Exemple (forme) : `postgresql://...@...-pooler....neon.tech/...?...`
- `ADMIN_TOKEN`
  - Un secret long et aléatoire (ex: 32-64 chars)

Important :
- `DATABASE_URL` et `ADMIN_TOKEN` **ne doivent jamais** être exposés dans le code frontend.
- Ne pas commiter ces valeurs dans Git.

### 3.2 Déployer

1) Importer le repo dans Vercel
2) Framework : Vite (ou “Other”)
3) Build command : `npm run build`
4) Output dir : `dist`

Le fichier `vercel.json` est déjà présent pour que :
- le routing SPA (React Router) fonctionne
- les routes `/api/*` restent accessibles

---

## 4) Tester après déploiement

### 4.1 Tester l’API

Ouvre :
- `https://<ton-projet>.vercel.app/api/projects`

Résultat attendu au début :

```json
{ "projects": [] }
```

Si tu vois une erreur :
- `missing_database_url` → variable `DATABASE_URL` manquante sur Vercel
- `relation "app_kv" does not exist` → table non créée dans Neon

### 4.2 Publier depuis l’Admin

1) Ouvre `/admin`
2) Colle `ADMIN_TOKEN`
3) Clique **Publier sur Vercel**
4) Clique **Recharger Vercel** (ou rafraîchis la page)

Le site public devrait ensuite refléter les projets stockés dans Neon.

---

## 5) Comportement en local (important)

En local avec `npm run dev` (Vite), les endpoints Vercel `/api/*` ne tournent pas automatiquement.
Donc :
- l’app utilise `localStorage`
- le bouton “Recharger Vercel”/“Publier” ne fonctionnera que sur le déploiement Vercel

Si tu veux tester les fonctions en local, utilise :
- `vercel dev`

---

## 6) Sécurité (minimum vital)

- `PUT /api/projects` est protégé par `ADMIN_TOKEN` (header `Authorization: Bearer <token>`).
- Ne partage jamais l’URL de DB (elle contient un secret).
- Pour aller plus loin : ajouter une vraie auth admin (Clerk/Auth.js) + limiter IP, etc.

---

## 7) Troubleshooting

### 401 unauthorized
- Mauvais `ADMIN_TOKEN` (Vercel env != token collé dans l’admin)

### 500 missing_database_url
- `DATABASE_URL` absent de Vercel Environment Variables

### erreur de table
- Exécuter le SQL Neon (création de `app_kv`)

### `projects: null`
- La clé `portfolio:projects:v1` n’a pas été initialisée
- Rejouer l’`INSERT ... ON CONFLICT ...` fourni dans la section Neon
