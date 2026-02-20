import type { Project } from '../types'

export const defaultProjects: Project[] = [
  {
    id: 1,
    slug: 'basketblog',
    title: 'BasketBlog',
    shortDescription:
      'Blog basket full-stack avec CMS headless, API REST et application installable sur mobile (PWA).',
    fullDescription:
      'BasketBlog est un blog moderne dédié au basket-ball construit avec une architecture headless. Les rédacteurs publient le contenu via Strapi, un CMS headless qui stocke les données dans PostgreSQL et expose automatiquement une API REST. Le frontend Next.js consomme cette API pour afficher les articles, catégories, tags et auteurs. Le site est responsive et fonctionne comme une Progressive Web App, pouvant être installée sur mobile ou desktop.',
    tags: ['Next.js', 'Strapi', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'PWA'],
    link: 'https://basket-blog-seven.vercel.app',
    year: '2025',
    status: 'En production',
    architecture: {
      description:
        'Architecture headless : le frontend Next.js consomme une API REST fournie par Strapi, qui interagit avec PostgreSQL pour stocker et récupérer les données.',
      diagram: `flowchart TD
  User[Utilisateur / Mobile PWA]
  Frontend[Frontend — Next.js]
  API[Backend — Strapi API REST]
  DB[(Base de données — PostgreSQL)]
  Admin[Rédacteur — Strapi Admin]

  User --> Frontend
  Frontend --> API
  API --> DB
  DB --> API
  API --> Frontend
  Frontend --> User

  Admin --> API`,
    },
    stack: [
      {
        name: 'Next.js',
        role: 'Frontend',
        color: '#000000',
        description:
          'Framework React utilisé pour construire l’interface utilisateur, gérer le routing, le SEO et le rendu (SSR/SSG).',
        how: 'Le frontend appelle l’API REST de Strapi pour récupérer les données du blog et générer les pages.',
        importance:
          'Point d’entrée utilisateur : sans le frontend, aucune interface ni accès au contenu.',
      },
      {
        name: 'Strapi',
        role: 'Backend / CMS headless',
        color: '#4945FF',
        description:
          'CMS headless Node.js permettant aux rédacteurs de gérer le contenu via une interface graphique.',
        how: 'Expose automatiquement une API REST et communique avec PostgreSQL.',
        importance:
          'Cœur du système : gère le contenu, les permissions et la logique métier.',
      },
      {
        name: 'PostgreSQL',
        role: 'Base de données',
        color: '#336791',
        description:
          'Base de données relationnelle stockant toutes les informations du blog.',
        how: 'Strapi interroge la base pour lire et écrire les données.',
        importance: 'Stockage persistant : sans base de données, aucune donnée n’existe.',
      },
      {
        name: 'Tailwind CSS',
        role: 'Styles',
        color: '#06B6D4',
        description:
          'Framework CSS utilitaire pour construire rapidement une interface moderne.',
        how: 'Utilisé directement dans les composants React via des classes.',
        importance:
          'Améliore l’expérience utilisateur et la rapidité de développement UI.',
      },
      {
        name: 'PWA',
        role: 'Application installable',
        color: '#F59E0B',
        description:
          'Permet d’installer le site comme une application native sur mobile ou desktop.',
        how: 'Manifeste + service worker pour cache et offline.',
        importance:
          'Transforme le site web en application mobile accessible hors navigateur.',
      },
      {
        name: 'TypeScript',
        role: 'Langage',
        color: '#3178C6',
        description:
          'Ajoute un typage statique à JavaScript pour améliorer la fiabilité du code.',
        how: 'Utilisé dans tout le projet pour typer les données et composants.',
        importance: 'Réduit les bugs et améliore la maintenabilité du projet.',
      },
    ],
  },
  {
    id: 2,
    slug: 'aibd',
    title: 'AIBD',
    shortDescription:
      'Application web/PWA de réservation et de suivi de transport Dakar ↔ Aéroport (client/driver/admin), temps réel et notifications.',
    fullDescription:
      "AIBD est une application web de réservation et de suivi de transport vers/depuis l’aéroport international Blaise Diagne. Elle propose un parcours client (réservation, code d’accès, suivi temps réel, historique), un espace chauffeur (disponibilité, courses actives, démarrage/fin) et un espace admin (dashboard, gestion utilisateurs/chauffeurs, tarifs, supervision). Le temps réel s’appuie sur WebSocket (Socket.IO), et les notifications combinent des notifications internes et du push (OneSignal + Firebase/FCM).",
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Query',
      'Socket.IO',
      'Leaflet',
      'PWA',
      'NestJS',
      'PostgreSQL',
      'JWT',
      'OneSignal',
      'Firebase/FCM',
    ],
    link: 'https://aibd-fsdx.vercel.app/',
    year: '2025',
    status: 'En production',
    architecture: {
      description:
        'Architecture multi-rôles : une PWA React (client/chauffeur/admin) consomme l’API NestJS (REST) et reçoit du temps réel via Socket.IO. L’API persiste les données dans PostgreSQL et envoie des notifications via Firebase Admin/FCM. En parallèle, le frontend intègre OneSignal pour le push web.',
      diagram: `flowchart TD
  Client[Client Web/PWA] -->|REST JSON| API[NestJS API]
  Driver[Chauffeur Web/PWA] -->|REST + WebSocket| API
  Admin[Admin Web] -->|REST + WebSocket| API
  API --> DB[(PostgreSQL)]
  API --> FCM[Firebase Admin / FCM]
  Client --> OneSignal[OneSignal Web Push]`,
    },
    stack: [
      {
        name: 'React 19',
        role: 'Frontend',
        color: '#61DAFB',
        description:
          'Base UI de l’application (client, chauffeur, admin) avec composants réutilisables et pages dédiées.',
        how: 'Les parcours (booking, tracking, dashboards) sont structurés en pages routées et consomment l’API pour afficher les données.',
      },
      {
        name: 'TypeScript',
        role: 'Langage',
        color: '#3178C6',
        description: 'Typage statique pour fiabiliser les données (rides, users, pricing) et améliorer la maintenabilité.',
        how: 'Types partagés côté front et conventions strictes pour réduire les erreurs et accélérer le refactor.',
      },
      {
        name: 'Vite',
        role: 'Tooling',
        color: '#646CFF',
        description: 'Bundler/dev server rapide pour itérer vite sur l’UI et les flows métier.',
        how: 'Build optimisé + configuration PWA via plugin.',
      },
      {
        name: 'Tailwind CSS',
        role: 'Styles',
        color: '#06B6D4',
        description: 'Design system utilitaire pour une UI cohérente et responsive.',
        how: 'Classes utilitaires + composants UI (Radix) pour les modales, formulaires, navigation.',
      },
      {
        name: '@tanstack/react-query',
        role: 'Data fetching',
        color: '#FF4154',
        description: 'Cache et synchronisation serveur pour les rides, profils, notifications.',
        how: 'Queries/mutations pour charger/mettre à jour les ressources, avec gestion d’erreurs et refresh.',
      },
      {
        name: 'Socket.IO',
        role: 'Temps réel',
        color: '#010101',
        description: 'Mises à jour temps réel (tracking chauffeur, états de course).',
        how: 'Connexion WebSocket authentifiée côté client, événements pour position/états.',
      },
      {
        name: 'Leaflet',
        role: 'Cartographie',
        color: '#199900',
        description: 'Affichage de la carte et de la position chauffeur pendant le suivi.',
        how: 'Carte (react-leaflet) + marqueurs + rafraîchissement selon les events temps réel.',
      },
      {
        name: 'PWA',
        role: 'Application installable',
        color: '#F59E0B',
        description: 'Expérience installable et service worker pour améliorer l’accessibilité mobile.',
        how: 'vite-plugin-pwa + intégration des notifications push côté service worker.',
      },
      {
        name: 'NestJS 11',
        role: 'Backend API',
        color: '#E0234E',
        description: 'API REST + WebSocket multi-rôles (client/driver/admin) avec auth JWT et modules métiers.',
        how: 'Modules (auth, rides, pricing, notifications…) + Socket.IO server pour le temps réel.',
      },
      {
        name: 'PostgreSQL',
        role: 'Base de données',
        color: '#336791',
        description: 'Stockage persistant des utilisateurs, courses, tarifs et notifications.',
        how: 'TypeORM pour la persistance et les relations, avec migrations/config via variables d’env.',
      },
      {
        name: 'JWT',
        role: 'Sécurité',
        color: '#111827',
        description: 'Authentification/autorisation pour les espaces driver et admin.',
        how: 'Tokens Bearer + contrôles de rôles côté backend et interceptors côté frontend.',
      },
      {
        name: 'OneSignal',
        role: 'Push web',
        color: '#E41453',
        description: 'Notifications push côté web pour les parcours client/driver/admin.',
        how: 'Initialisation côté frontend + déclenchement selon événements applicatifs.',
      },
      {
        name: 'Firebase / FCM',
        role: 'Push + service worker',
        color: '#FFCA28',
        description: 'Canal push complémentaire via FCM et gestion service worker.',
        how: 'Firebase Admin côté backend + enregistrement token côté frontend.',
      },
    ],
  },
  {
    id: 3,
    slug: 'sen-cam-cong',
    title: 'SEN CAM CONG',
    shortDescription:
      'Site officiel du groupe (Next.js full-stack) : vitrine publique + API + espace admin sécurisé (CRUD événements, médias, membres).',
    fullDescription:
      "Site web officiel du groupe de musique SEN CAM CONG (SEC CAM CONG), construit comme une application Next.js full-stack : pages publiques (vitrine), routes API, et espace d’administration protégé. Côté public : événements (pagination, filtre UPCOMING/PAST/CANCELLED, recherche, page détail), performances, galerie média, pages membres par pays, pages institutionnelles et gestion d’erreurs globale. Côté admin : dashboard, CRUD complet (events/performances/médias/membres/liens sociaux), site-settings en key/value, et upload d’images via Vercel Blob.",
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'JWT',
      'Zod',
      'Framer Motion',
      'Vercel',
      'Vercel Blob',
      'PWA',
    ],
    link: 'https://sen-cam-cong.vercel.app/',
    repoUrl: 'https://github.com/GCS2092/SEN_CAM_CONG',
    year: '2025',
    status: 'En production',
    architecture: {
      description:
        "Architecture full-stack Next.js : frontend public + espace admin, routes API sécurisées (JWT + rôles), persistance PostgreSQL via Prisma. Les médias peuvent être stockés via Vercel Blob (upload auth + contrôle de taille/type) et le site gère des settings clé/valeur pour la configuration globale.",
      diagram: `flowchart TD
  User[Visiteur] -->|Pages (App Router)| Web[Next.js App]
  Admin[Admin/Artist] -->|UI Admin| Web
  Web -->|Routes API| API[Next.js API]
  API -->|Prisma| DB[(PostgreSQL)]
  API -->|Upload| Blob[Vercel Blob]
  Web -->|Animations/UI| UI[Tailwind + Framer Motion]`,
    },
    stack: [
      {
        name: 'Next.js 14',
        role: 'Full-stack (App Router + API)',
        color: '#000000',
        description:
          'Application full-stack : pages publiques + espace admin, avec routes API intégrées.',
        how: 'Les pages consomment les routes API (events, media, members, settings) avec fallback/gestion d’erreurs.',
      },
      {
        name: 'TypeScript',
        role: 'Langage',
        color: '#3178C6',
        description:
          'Typage des modèles et des contrats API pour sécuriser les évolutions et le refactor.',
        how: 'Types partagés et validation runtime (Zod) pour les payloads côté API.',
      },
      {
        name: 'Tailwind CSS',
        role: 'UI',
        color: '#06B6D4',
        description: 'UI responsive avec un style cohérent sur le site public et l’admin.',
        how: 'Classes utilitaires + composants structurés, thèmes via next-themes.',
      },
      {
        name: 'Framer Motion',
        role: 'Animations',
        color: '#0055FF',
        description: 'Animations pour améliorer la perception de qualité (transitions, sections, micro-interactions).',
        how: 'Animations sur les pages publiques et transitions de listes (événements/performances).',
      },
      {
        name: 'Prisma',
        role: 'ORM',
        color: '#2D3748',
        description:
          'ORM pour gérer les modèles (events, performances, media, users, settings) et les requêtes DB.',
        how: 'Schéma Prisma + migrations/generate, accès DB via DATABASE_URL.',
      },
      {
        name: 'PostgreSQL',
        role: 'Base de données',
        color: '#336791',
        description: 'Stockage des contenus (événements, médias, membres, users, settings).',
        how: 'Persisté via Prisma, avec pagination/filtrage côté API.',
      },
      {
        name: 'JWT',
        role: 'Auth',
        color: '#111827',
        description: 'Accès admin protégé et sécurisation des routes API sensibles.',
        how: 'Vérification token côté serveur + contrôle de rôle (ADMIN/ARTIST).',
      },
      {
        name: 'Zod',
        role: 'Validation',
        color: '#3E67B1',
        description: 'Validation des payloads côté API pour éviter les données invalides en base.',
        how: 'Schémas Zod appliqués aux inputs CRUD (events/media/members…).',
      },
      {
        name: 'Vercel Blob',
        role: 'Stockage média',
        color: '#000000',
        description: 'Upload d’images via endpoint dédié avec contrôle auth/permissions.',
        how: 'API upload avec BLOB_READ_WRITE_TOKEN + vérification type/taille (10MB).',
      },
    ],
  },
]
