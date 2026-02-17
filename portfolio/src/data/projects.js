export const projects = [
  {
    id: 1,
    slug: "basketblog",
    title: "BasketBlog",
    shortDescription:
      "Blog full-stack dédié au basket-ball — articles, catégories, tags, auteurs et expérience PWA installable sur mobile.",
    fullDescription:
      "BasketBlog est une plateforme de blog moderne construite autour d'une architecture découplée (headless). Le frontend Next.js consomme une API REST fournie par Strapi, un CMS headless qui permet aux rédacteurs de publier du contenu sans toucher au code. La base de données PostgreSQL stocke l'ensemble des données. Le site est également une PWA : il peut être installé sur mobile ou desktop comme une application native.",
    tags: ["Next.js", "Strapi", "PostgreSQL", "Tailwind CSS", "PWA", "TypeScript"],
    link: "https://ton-basketblog.vercel.app",
    year: "2025",
    status: "En production",
    stack: [
      {
        name: "Next.js",
        role: "Frontend",
        color: "#000000",
        description:
          "Framework React qui gère le rendu des pages côté serveur (SSR) et la génération statique (SSG). Il s'occupe du routing, des métadonnées SEO, du manifeste PWA et de l'optimisation des images.",
        how: "Le frontend envoie des requêtes HTTP vers l'API Strapi pour obtenir les articles, catégories et auteurs, puis les affiche sous forme de pages React.",
      },
      {
        name: "Strapi",
        role: "Backend / CMS",
        color: "#4945FF",
        description:
          "CMS headless Node.js qui expose une API REST automatiquement générée à partir des types de contenu définis (Article, Category, Tag, Author). Les rédacteurs gèrent tout le contenu depuis son interface sans écrire de code.",
        how: "Strapi reçoit les requêtes de Next.js, interroge PostgreSQL, et retourne les données en JSON. Il gère aussi les permissions et le système de draft & publish.",
      },
      {
        name: "PostgreSQL",
        role: "Base de données",
        color: "#336791",
        description:
          "Base de données relationnelle robuste qui stocke toutes les données du blog : articles, auteurs, catégories, tags et leurs relations. Strapi s'en occupe entièrement.",
        how: "Strapi crée et maintient automatiquement le schéma. À chaque requête API, il génère les requêtes SQL nécessaires et retourne les résultats au frontend.",
      },
      {
        name: "Tailwind CSS",
        role: "Styles",
        color: "#06B6D4",
        description:
          "Framework CSS utilitaire qui permet de styler les composants directement dans le JSX avec des classes prédéfinies. Il génère uniquement le CSS utilisé, ce qui donne des feuilles de style très légères.",
        how: "Chaque composant Next.js utilise des classes Tailwind pour définir ses styles. Tout est co-localisé avec le markup, sans fichier CSS séparé.",
      },
      {
        name: "PWA",
        role: "Expérience mobile",
        color: "#F59E0B",
        description:
          "Progressive Web App : manifeste, service worker et icônes qui permettent d'installer le site comme une application native sur Android, iOS et desktop.",
        how: "Next.js génère le manifeste et les icônes automatiquement. Un service worker intercepte les requêtes réseau et permet un fonctionnement hors ligne basique.",
      },
      {
        name: "TypeScript",
        role: "Langage",
        color: "#3178C6",
        description:
          "Superset de JavaScript qui ajoute un typage statique. Il détecte les erreurs à la compilation, documente le code et offre une autocomplétion précise dans l'éditeur.",
        how: "Les types des données Strapi sont définis dans lib/strapi.ts et utilisés dans toutes les pages pour garantir la cohérence des données.",
      },
    ],
  },
]