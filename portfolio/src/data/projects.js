export const projects = [
  {
    id: 1,
    slug: "basketblog",
    title: "BasketBlog",

    shortDescription:
      "Blog basket full-stack avec CMS headless, API REST et application installable sur mobile (PWA).",

    fullDescription:
      "BasketBlog est un blog moderne dédié au basket-ball construit avec une architecture headless. Les rédacteurs publient le contenu via Strapi, un CMS headless qui stocke les données dans PostgreSQL et expose automatiquement une API REST. Le frontend Next.js consomme cette API pour afficher les articles, catégories, tags et auteurs. Le site est responsive et fonctionne comme une Progressive Web App, pouvant être installée sur mobile ou desktop.",

    tags: [
      "Next.js",
      "Strapi",
      "PostgreSQL",
      "Tailwind CSS",
      "TypeScript",
      "PWA",
    ],

    link: "https://basket-blog-seven.vercel.app",
    year: "2025",
    status: "En production",

    architecture: {
      description:
        "Architecture headless : le frontend Next.js consomme une API REST fournie par Strapi, qui interagit avec PostgreSQL pour stocker et récupérer les données.",

      diagram: `
flowchart TD
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

  Admin --> API
`,
    },

    stack: [
      {
        name: "Next.js",
        role: "Frontend",
        color: "#000000",
        description:
          "Framework React utilisé pour construire l'interface utilisateur, gérer le routing, le SEO et le rendu (SSR/SSG).",
        how: "Le frontend appelle l'API REST de Strapi pour récupérer les données du blog et générer les pages.",
        importance:
          "Point d'entrée utilisateur : sans le frontend, aucune interface ni accès au contenu.",
      },
      {
        name: "Strapi",
        role: "Backend / CMS headless",
        color: "#4945FF",
        description:
          "CMS headless Node.js permettant aux rédacteurs de gérer le contenu via une interface graphique.",
        how: "Expose automatiquement une API REST et communique avec PostgreSQL.",
        importance:
          "Cœur du système : gère le contenu, les permissions et la logique métier.",
      },
      {
        name: "PostgreSQL",
        role: "Base de données",
        color: "#336791",
        description:
          "Base de données relationnelle stockant toutes les informations du blog.",
        how: "Strapi interroge la base pour lire et écrire les données.",
        importance:
          "Stockage persistant : sans base de données, aucune donnée n'existe.",
      },
      {
        name: "Tailwind CSS",
        role: "Styles",
        color: "#06B6D4",
        description:
          "Framework CSS utilitaire pour construire rapidement une interface moderne.",
        how: "Utilisé directement dans les composants React via des classes.",
        importance:
          "Améliore l'expérience utilisateur et la rapidité de développement UI.",
      },
      {
        name: "PWA",
        role: "Application installable",
        color: "#F59E0B",
        description:
          "Permet d'installer le site comme une application native sur mobile ou desktop.",
        how: "Manifeste + service worker pour cache et offline.",
        importance:
          "Transforme le site web en application mobile accessible hors navigateur.",
      },
      {
        name: "TypeScript",
        role: "Langage",
        color: "#3178C6",
        description:
          "Ajoute un typage statique à JavaScript pour améliorer la fiabilité du code.",
        how: "Utilisé dans tout le projet pour typer les données et composants.",
        importance:
          "Réduit les bugs et améliore la maintenabilité du projet.",
      },
    ],
  },

  {
    id: 4,
    slug: "urbans",
    title: "UrbanS",
    shortDescription:
      "Application mobile money fullstack (Expo/React Native + Node.js/Express + PostgreSQL) : connexion par PIN, envoi d'argent, coffre d'épargne et gestion de budget par catégorie.",
    fullDescription:
      "UrbanS est une application de mobile money en mode simulation. L'utilisateur se connecte avec son numéro de téléphone et un code PIN sécurisé (hashé côté backend avec bcrypt). Depuis l'accueil il consulte son solde, son coffre d'épargne (avec objectif optionnel) et un QR code personnel. Il peut envoyer de l'argent à un contact par numéro, effectuer des mouvements de coffre (dépôt / retrait), consulter l'historique filtré de ses transactions et gérer des budgets par catégorie. Le backend expose une API REST complète sur Node.js/Express avec PostgreSQL. Le frontend est une app Expo (React Native + TypeScript) avec navigation par onglets via Expo Router, état global géré par Zustand et session persistée dans SecureStore.",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Zustand",
      "Axios",
      "bcrypt",
    ],
    link: "",
    year: "2025",
    status: "En développement",
    architecture: {
      description:
        "Architecture en trois couches : l'app Expo communique uniquement avec le backend via HTTP (Axios). Le backend Node.js/Express est le seul à accéder à la base PostgreSQL. La session utilisateur (sans PIN) est persistée localement dans expo-secure-store après authentification.",
      diagram: `flowchart TD
  App[App Expo — React Native]
  Auth[store/auth — Zustand + SecureStore]
  Tx[store/transactions — Zustand]

  App -->|HTTP Axios| API[API REST — Node.js / Express :4000]

  API --> R1[/api/auth — Login & Register]
  API --> R2[/api/users — Profil & recherche]
  API --> R3[/api/transactions — Liste & envoi]
  API --> R4[/api/budget — Catégories & limites]
  API --> R5[/api/coffre — Dépôt & retrait]

  API -->|SQL| DB[(PostgreSQL — MobileMoney)]

  DB --> T1[Table: user]
  DB --> T2[Table: transaction]
  DB --> T3[Table: budget]
  DB --> T4[Table: qr_token]

  App --> Auth
  App --> Tx`,
    },
    stack: [
      {
        name: "Expo / React Native",
        role: "Frontend mobile",
        color: "#000020",
        description:
          "Framework pour construire l'application iOS et Android à partir d'une base de code unique en TypeScript.",
        how: "Les écrans (login, accueil, historique, profil…) sont des composants React Native organisés via Expo Router.",
        importance:
          "Point d'entrée utilisateur : tout le parcours (connexion, envoi, coffre) passe par l'app.",
      },
      {
        name: "Expo Router",
        role: "Navigation",
        color: "#4B5563",
        description:
          "Navigation basée sur les fichiers (file-based routing) pour gérer l'écran de login et les onglets post-connexion.",
        how: "Le dossier app/ définit les routes : / (login) et /(tabs)/ (accueil, historique, budget, profil).",
        importance:
          "Structure claire et prévisible de la navigation sans configuration manuelle de stack.",
      },
      {
        name: "TypeScript",
        role: "Langage",
        color: "#3178C6",
        description:
          "Typage statique sur le frontend pour fiabiliser les données (utilisateur, transactions, coffre).",
        how: "Tous les composants, stores et appels API sont typés pour éviter les erreurs à l'exécution.",
        importance: "Réduit les bugs et rend le code plus maintenable lors des évolutions.",
      },
      {
        name: "Zustand",
        role: "State management",
        color: "#8B4513",
        description:
          "Gestion de l'état global léger : utilisateur connecté et liste des transactions.",
        how: "store/auth.ts gère la session (avec SecureStore) et store/transactions.ts la liste chargée depuis l'API.",
        importance:
          "Partage de l'état entre les onglets sans prop-drilling ni boilerplate.",
      },
      {
        name: "expo-secure-store",
        role: "Persistance sécurisée",
        color: "#10B981",
        description:
          "Stockage chiffré de la session utilisateur sur l'appareil après connexion.",
        how: "L'objet utilisateur (sans PIN) est persisté après login et restauré au démarrage de l'app.",
        importance:
          "Permet la reconnexion automatique sans redemander le PIN à chaque lancement.",
      },
      {
        name: "Axios",
        role: "Client HTTP",
        color: "#5A29E4",
        description:
          "Client HTTP utilisé par le frontend pour consommer toutes les routes de l'API backend.",
        how: "Une instance Axios avec baseURL dynamique (localhost ou 10.0.2.2 pour l'émulateur Android) centralise les appels.",
        importance: "Simplifie la gestion des requêtes, réponses et erreurs réseau.",
      },
      {
        name: "Node.js / Express",
        role: "Backend API",
        color: "#68A063",
        description:
          "Serveur REST exposant les routes auth, users, transactions, budget et coffre sur le port 4000.",
        how: "Chaque domaine métier a son propre fichier de routes (src/routes/). Le point d'entrée index.js monte toutes les routes.",
        importance:
          "Cœur du système : toute la logique métier (envoi d'argent, mouvements de coffre, PIN check) y est centralisée.",
      },
      {
        name: "PostgreSQL",
        role: "Base de données",
        color: "#336791",
        description:
          "Base relationnelle (MobileMoney) stockant utilisateurs, transactions, budgets et tokens QR.",
        how: "Le backend accède à la base via le client pg (pool). Les transactions SQL atomiques garantissent la cohérence (ex. débit + crédit simultanés).",
        importance:
          "Stockage persistant et fiable : contraintes (solde ≥ 0, tel unique) garanties au niveau DB.",
      },
      {
        name: "bcrypt",
        role: "Sécurité — PIN",
        color: "#EF4444",
        description:
          "Hash du PIN à l'inscription et comparaison sécurisée lors de la connexion.",
        how: "Le PIN n'est jamais stocké en clair. bcrypt.hash() à l'inscription, bcrypt.compare() au login.",
        importance:
          "Protection des données sensibles : même en cas de fuite DB, les PINs restent illisibles.",
      },
    ],
  },

  {
    id: 5,
    slug: "vtc-dakar",
    title: "VTC Dakar",
    shortDescription:
      "Application VTC mobile-first pour le marché dakarois et la clientèle internationale : réservation sans compte, bilingue FR/EN, gestion chauffeur et panel admin complet.",
    fullDescription:
      "VTC Dakar est une plateforme de transport avec chauffeur conçue pour Dakar et ouverte à l'international. N'importe quel client, qu'il soit à Paris, Montréal, New York ou Dakar, peut réserver un chauffeur depuis son téléphone sans créer de compte. L'interface est disponible en français et en anglais avec switch instantané. Les tarifs sont entièrement configurables depuis le panel admin. Le chauffeur gère sa disponibilité (disponible / en course / hors ligne) depuis son interface dédiée. La coordination client/chauffeur s'effectue par téléphone et notifications automatiques — pas de géolocalisation temps réel. Les emails de confirmation, rappels J-1 et récapitulatifs de course sont générés automatiquement dans la langue du client.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "Zod",
      "PostgreSQL",
      "Prisma",
      "Resend",
      "PWA",
    ],
    link: "",
    year: "Mars 2026",
    status: "En développement",
    architecture: {
      description:
        "Architecture PWA mobile-first multi-rôles : une interface client (réservation sans compte, bilingue FR/EN), une interface chauffeur (statut, courses assignées) et un panel admin (tarification, suivi, gestion chauffeurs). Les emails automatiques sont envoyés dans la langue enregistrée à la réservation (champ reservation.language). Pas de géolocalisation — coordination par téléphone et notifications.",
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
        name: "Next.js",
        role: "Frontend + API",
        color: "#000000",
        description:
          "Framework full-stack React pour la PWA client, l'interface chauffeur, le panel admin et les routes API.",
        how:
          "App Router pour les pages publiques (réservation, tarifs) et les routes API. SSR pour le SEO et la performance mobile.",
        importance:
          "Cœur de l'application : toutes les interfaces et la logique serveur sont centralisées dans un seul projet.",
      },
      {
        name: "TypeScript",
        role: "Langage",
        color: "#3178C6",
        description:
          "Typage statique pour fiabiliser les données (réservations, tarifs, chauffeurs) et sécuriser les évolutions.",
        how:
          "Types partagés côté client et API, validation Zod pour tous les formulaires et endpoints.",
        importance:
          "Réduit les bugs et améliore la maintenabilité lors des évolutions de la plateforme.",
      },
      {
        name: "next-intl",
        role: "Internationalisation FR/EN",
        color: "#8B5CF6",
        description:
          "Système i18n complet pour la PWA client : switch FR/EN instantané, fichiers de traduction JSON, routing par locale.",
        how:
          "Fichiers messages/fr.json et messages/en.json, hook useTranslations(), détection automatique de la langue du navigateur. La langue est stockée en base (reservation.language = 'fr' | 'en') et utilisée pour tous les emails automatiques liés à cette réservation.",
        importance:
          "Permet à la clientèle internationale de réserver en anglais depuis n'importe quel pays — différenciateur clé sur le marché dakarois.",
      },
      {
        name: "Zod",
        role: "Validation",
        color: "#3E67B1",
        description:
          "Validation des formulaires côté client et des payloads API, avec messages d'erreur traduits en FR ou EN selon la langue active.",
        how:
          "Schémas Zod pour le formulaire de réservation (téléphone international +221/+33/+1…, numéro de vol, date/heure Dakar). Les messages d'erreur sont fournis via next-intl dans la langue du client.",
        importance:
          "Garantit la cohérence des données en base et une UX de formulaire correcte pour les clients locaux et internationaux.",
      },
      {
        name: "Tailwind CSS",
        role: "UI mobile-first",
        color: "#06B6D4",
        description:
          "Design system utilitaire pour une interface responsive, optimisée mobile pour les clients dakarois et internationaux.",
        how:
          "Classes utilitaires sur tous les composants (formulaire de réservation, récapitulatif, panel admin, interface chauffeur). Design adapté aux petits écrans en priorité.",
        importance:
          "Assure une expérience fluide sur mobile, le principal terminal des utilisateurs cibles au Sénégal.",
      },
      {
        name: "PostgreSQL",
        role: "Base de données",
        color: "#336791",
        description:
          "Stockage persistant des réservations, chauffeurs, zones et grilles tarifaires.",
        how:
          "Accès via Prisma ORM. Table reservation avec champ language ('fr' | 'en') utilisé pour tous les envois d'emails liés à cette réservation.",
        importance:
          "Stockage fiable avec contraintes — la langue est persistée dès la création et réutilisée pour chaque email automatique (confirmation, rappel, récapitulatif, annulation).",
      },
      {
        name: "Prisma",
        role: "ORM",
        color: "#2D3748",
        description:
          "ORM pour modéliser et requêter les données (réservations, chauffeurs, tarifs, zones).",
        how:
          "Schéma Prisma avec migrations, accès typé en base depuis les routes API Next.js.",
        importance:
          "Simplifie les requêtes complexes (filtrage par statut, assignation chauffeur, historique) et sécurise les migrations en production.",
      },
      {
        name: "Resend",
        role: "Emails automatiques",
        color: "#000000",
        description:
          "Service d'envoi d'emails transactionnels pour les confirmations, rappels J-1, notifications d'assignation chauffeur et récapitulatifs de course.",
        how:
          "Les emails sont générés dans la langue enregistrée à la réservation (reservation.language). Templates React Email pour chaque type d'email : confirmation, chauffeur assigné, rappel J-1, course terminée, annulation.",
        importance:
          "Canal de communication principal avec le client — les emails bilingues automatiques renforcent la confiance de la clientèle internationale.",
      },
      {
        name: "PWA",
        role: "Application installable",
        color: "#F59E0B",
        description:
          "La plateforme client fonctionne comme une Progressive Web App, installable sur mobile depuis un navigateur sans passer par un store.",
        how:
          "Manifeste PWA + service worker pour cache et accès rapide. Optimisé pour les connexions mobiles africaines.",
        importance:
          "Crucial pour l'adoption au Sénégal : les clients peuvent 'installer' l'app sans store, depuis n'importe quel pays.",
      },
    ],
  },
];