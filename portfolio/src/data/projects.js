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

    // ⭐ NOUVEAU : Schéma d’architecture
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
          "Framework React utilisé pour construire l’interface utilisateur, gérer le routing, le SEO et le rendu (SSR/SSG).",
        how:
          "Le frontend appelle l’API REST de Strapi pour récupérer les données du blog et générer les pages.",
        importance:
          "Point d’entrée utilisateur : sans le frontend, aucune interface ni accès au contenu.",
      },

      {
        name: "Strapi",
        role: "Backend / CMS headless",
        color: "#4945FF",
        description:
          "CMS headless Node.js permettant aux rédacteurs de gérer le contenu via une interface graphique.",
        how:
          "Expose automatiquement une API REST et communique avec PostgreSQL.",
        importance:
          "Cœur du système : gère le contenu, les permissions et la logique métier.",
      },

      {
        name: "PostgreSQL",
        role: "Base de données",
        color: "#336791",
        description:
          "Base de données relationnelle stockant toutes les informations du blog.",
        how:
          "Strapi interroge la base pour lire et écrire les données.",
        importance:
          "Stockage persistant : sans base de données, aucune donnée n’existe.",
      },

      {
        name: "Tailwind CSS",
        role: "Styles",
        color: "#06B6D4",
        description:
          "Framework CSS utilitaire pour construire rapidement une interface moderne.",
        how:
          "Utilisé directement dans les composants React via des classes.",
        importance:
          "Améliore l’expérience utilisateur et la rapidité de développement UI.",
      },

      {
        name: "PWA",
        role: "Application installable",
        color: "#F59E0B",
        description:
          "Permet d’installer le site comme une application native sur mobile ou desktop.",
        how:
          "Manifeste + service worker pour cache et offline.",
        importance:
          "Transforme le site web en application mobile accessible hors navigateur.",
      },

      {
        name: "TypeScript",
        role: "Langage",
        color: "#3178C6",
        description:
          "Ajoute un typage statique à JavaScript pour améliorer la fiabilité du code.",
        how:
          "Utilisé dans tout le projet pour typer les données et composants.",
        importance:
          "Réduit les bugs et améliore la maintenabilité du projet.",
      },
    ],
  },
];
