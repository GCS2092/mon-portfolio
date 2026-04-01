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
          'Framework React utilisé pour construire l\u2019interface utilisateur, gérer le routing, le SEO et le rendu (SSR/SSG).',
        how: 'Le frontend appelle l\u2019API REST de Strapi pour récupérer les données du blog et générer les pages.',
        importance:
          'Point d\u2019entrée utilisateur : sans le frontend, aucune interface ni accès au contenu.',
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
        importance: 'Stockage persistant : sans base de données, aucune donnée n\u2019existe.',
      },
      {
        name: 'Tailwind CSS',
        role: 'Styles',
        color: '#06B6D4',
        description:
          'Framework CSS utilitaire pour construire rapidement une interface moderne.',
        how: 'Utilisé directement dans les composants React via des classes.',
        importance:
          'Améliore l\u2019expérience utilisateur et la rapidité de développement UI.',
      },
      {
        name: 'PWA',
        role: 'Application installable',
        color: '#F59E0B',
        description:
          'Permet d\u2019installer le site comme une application native sur mobile ou desktop.',
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
      "AIBD est une application web de réservation et de suivi de transport vers/depuis l'aéroport international Blaise Diagne. Elle propose un parcours client (réservation, code d'accès, suivi temps réel, historique), un espace chauffeur (disponibilité, courses actives, démarrage/fin) et un espace admin (dashboard, gestion utilisateurs/chauffeurs, tarifs, supervision). Le temps réel s'appuie sur WebSocket (Socket.IO), et les notifications combinent des notifications internes et du push (OneSignal + Firebase/FCM).",
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
        'Architecture multi-rôles : une PWA React (client/chauffeur/admin) consomme l\u2019API NestJS (REST) et reçoit du temps réel via Socket.IO. L\u2019API persiste les données dans PostgreSQL et envoie des notifications via Firebase Admin/FCM. En parallèle, le frontend intègre OneSignal pour le push web.',
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
          'Base UI de l\u2019application (client, chauffeur, admin) avec composants réutilisables et pages dédiées.',
        how: 'Les parcours (booking, tracking, dashboards) sont structurés en pages routées et consomment l\u2019API pour afficher les données.',
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
        description: 'Bundler/dev server rapide pour itérer vite sur l\u2019UI et les flows métier.',
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
        how: 'Queries/mutations pour charger/mettre à jour les ressources, avec gestion d\u2019erreurs et refresh.',
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
        description: 'Expérience installable et service worker pour améliorer l\u2019accessibilité mobile.',
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
        how: 'TypeORM pour la persistance et les relations, avec migrations/config via variables d\u2019env.',
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
      "Site web officiel du groupe de musique SEN CAM CONG (SEC CAM CONG), construit comme une application Next.js full-stack : pages publiques (vitrine), routes API, et espace d'administration protégé. Côté public : événements (pagination, filtre UPCOMING/PAST/CANCELLED, recherche, page détail), performances, galerie média, pages membres par pays, pages institutionnelles et gestion d'erreurs globale. Côté admin : dashboard, CRUD complet (events/performances/médias/membres/liens sociaux), site-settings en key/value, et upload d'images via Vercel Blob.",
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
        how: 'Les pages consomment les routes API (events, media, members, settings) avec fallback/gestion d\u2019erreurs.',
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
        description: 'UI responsive avec un style cohérent sur le site public et l\u2019admin.',
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
        description: 'Upload d\u2019images via endpoint dédié avec contrôle auth/permissions.',
        how: 'API upload avec BLOB_READ_WRITE_TOKEN + vérification type/taille (10MB).',
      },
    ],
  },
  {
    id: 5,
    slug: 'vtc-dakar',
    title: 'VTC Dakar',
    shortDescription:
      "Application VTC mobile-first pour le marché dakarois et la clientèle internationale : réservation sans compte, bilingue FR/EN, gestion chauffeur et panel admin complet.",
    fullDescription:
      "VTC Dakar est une plateforme de transport avec chauffeur conçue pour Dakar et ouverte à l'international. N'importe quel client, qu'il soit à Paris, Montréal, New York ou Dakar, peut réserver un chauffeur depuis son téléphone sans créer de compte. L'interface est disponible en français et en anglais avec switch instantané. Les tarifs sont entièrement configurables depuis le panel admin. Le chauffeur gère sa disponibilité (disponible / en course / hors ligne) depuis son interface dédiée. La coordination client/chauffeur s'effectue par téléphone et notifications automatiques — pas de géolocalisation temps réel. Les emails de confirmation, rappels J-1 et récapitulatifs de course sont générés automatiquement dans la langue du client.",
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'next-intl',
      'Zod',
      'PostgreSQL',
      'Prisma',
      'Resend',
      'PWA',
    ],
    link: '',
    year: 'Mars 2026',
    status: 'En développement',
    architecture: {
      description:
        "Architecture PWA mobile-first multi-rôles : une interface client (réservation sans compte, bilingue FR/EN), une interface chauffeur (statut, courses assignées) et un panel admin (tarification, suivi, gestion chauffeurs). Les emails automatiques sont envoyés dans la langue enregistrée à la réservation (champ reservation.language = 'fr' | 'en'). Pas de géolocalisation — coordination par téléphone et notifications.",
      diagram: `flowchart TD
  Client[Client — PWA FR/EN]
  Driver[Chauffeur — Interface mobile]
  Admin[Admin — Panel de gestion]

  Client -->|Réservation sans compte| API[Next.js API Routes]
  Driver -->|Statut & courses assignées| API
  Admin -->|CRUD tarifs / chauffeurs / réservations| API

  API -->|Prisma ORM| DB[(PostgreSQL)]
  API -->|Email FR ou EN| Mail[Resend — Emails automatiques]

  Mail --> M1[Confirmation de réservation]
  Mail --> M2[Chauffeur assigné]
  Mail --> M3[Rappel J-1]
  Mail --> M4[Récapitulatif course terminée]
  Mail --> M5[Annulation]

  DB --> T1[Table: reservation — champ language]
  DB --> T2[Table: driver]
  DB --> T3[Table: pricing]
  DB --> T4[Table: zone]`,
    },
    stack: [
      {
        name: 'Next.js',
        role: 'Frontend + API',
        color: '#000000',
        description:
          "Framework full-stack React pour la PWA client, l'interface chauffeur, le panel admin et les routes API.",
        how:
          "App Router pour les pages publiques (réservation, tarifs) et les routes API. SSR pour le SEO et la performance mobile.",
        importance:
          "Cœur de l'application : toutes les interfaces et la logique serveur sont centralisées dans un seul projet.",
      },
      {
        name: 'TypeScript',
        role: 'Langage',
        color: '#3178C6',
        description:
          "Typage statique pour fiabiliser les données (réservations, tarifs, chauffeurs) et sécuriser les évolutions.",
        how:
          "Types partagés côté client et API, validation Zod pour tous les formulaires et endpoints.",
        importance:
          "Réduit les bugs et améliore la maintenabilité lors des évolutions de la plateforme.",
      },
      {
        name: 'next-intl',
        role: 'Internationalisation FR/EN',
        color: '#8B5CF6',
        description:
          "Système i18n complet pour la PWA client : switch FR/EN instantané, fichiers de traduction JSON, routing par locale.",
        how:
          "Fichiers messages/fr.json et messages/en.json, hook useTranslations(), détection automatique de la langue du navigateur. La langue est stockée en base (reservation.language = 'fr' | 'en') et utilisée pour tous les emails automatiques liés à cette réservation.",
        importance:
          "Permet à la clientèle internationale de réserver en anglais depuis n'importe quel pays — différenciateur clé sur le marché dakarois.",
      },
      {
        name: 'Zod',
        role: 'Validation',
        color: '#3E67B1',
        description:
          "Validation des formulaires côté client et des payloads API, avec messages d'erreur traduits en FR ou EN selon la langue active.",
        how:
          "Schémas Zod pour le formulaire de réservation (téléphone international +221/+33/+1…, numéro de vol, date/heure Dakar). Messages d'erreur fournis via next-intl dans la langue du client.",
        importance:
          "Garantit la cohérence des données en base et une UX de formulaire correcte pour les clients locaux et internationaux.",
      },
      {
        name: 'Tailwind CSS',
        role: 'UI mobile-first',
        color: '#06B6D4',
        description:
          "Design system utilitaire pour une interface responsive, optimisée mobile pour les clients dakarois et internationaux.",
        how:
          "Classes utilitaires sur tous les composants (formulaire de réservation, récapitulatif, panel admin, interface chauffeur). Design adapté aux petits écrans en priorité.",
        importance:
          "Assure une expérience fluide sur mobile, le principal terminal des utilisateurs cibles au Sénégal.",
      },
      {
        name: 'PostgreSQL',
        role: 'Base de données',
        color: '#336791',
        description:
          "Stockage persistant des réservations, chauffeurs, zones et grilles tarifaires.",
        how:
          "Accès via Prisma ORM. Table reservation avec champ language ('fr' | 'en') utilisé pour tous les envois d'emails liés à cette réservation.",
        importance:
          "Stockage fiable avec contraintes — la langue est persistée dès la création et réutilisée pour chaque email automatique (confirmation, rappel, récapitulatif, annulation).",
      },
      {
        name: 'Prisma',
        role: 'ORM',
        color: '#2D3748',
        description:
          "ORM pour modéliser et requêter les données (réservations, chauffeurs, tarifs, zones).",
        how:
          "Schéma Prisma avec migrations, accès typé en base depuis les routes API Next.js.",
        importance:
          "Simplifie les requêtes complexes (filtrage par statut, assignation chauffeur, historique) et sécurise les migrations en production.",
      },
      {
        name: 'Resend',
        role: 'Emails automatiques',
        color: '#000000',
        description:
          "Service d'envoi d'emails transactionnels pour les confirmations, rappels J-1, notifications d'assignation chauffeur et récapitulatifs de course.",
        how:
          "Les emails sont générés dans la langue enregistrée à la réservation (reservation.language). Templates React Email pour chaque type : confirmation, chauffeur assigné, rappel J-1, course terminée, annulation.",
        importance:
          "Canal de communication principal avec le client — les emails bilingues automatiques renforcent la confiance de la clientèle internationale.",
      },
      {
        name: 'PWA',
        role: 'Application installable',
        color: '#F59E0B',
        description:
          "La plateforme client fonctionne comme une Progressive Web App, installable sur mobile depuis un navigateur sans passer par un store.",
        how:
          "Manifeste PWA + service worker pour cache et accès rapide. Optimisé pour les connexions mobiles africaines.",
        importance:
          "Crucial pour l'adoption au Sénégal : les clients peuvent installer l'app sans store, depuis n'importe quel pays.",
      },
    ],
  },
]