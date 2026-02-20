import type { Lang } from './types'

export type TranslationKey =
  | 'nav.projects'
  | 'nav.contact'
  | 'nav.frameworks'
  | 'nav.cta'
  | 'nav.lang'
  | 'about.title'
  | 'about.body'
  | 'about.hire.kicker'
  | 'about.hire.title'
  | 'about.hire.body'
  | 'about.services.kicker'
  | 'about.services.title'
  | 'about.services.body'
  | 'hero.available'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.ctaProjects'
  | 'projects.title'
  | 'projects.count'
  | 'projects.viewProjectCta'
  | 'frameworks.title'
  | 'frameworks.subtitle'
  | 'frameworks.react'
  | 'frameworks.api'
  | 'frameworks.typescript'
  | 'frameworks.ui'
  | 'frameworks.flutter'
  | 'frameworks.expo'
  | 'frameworks.deploy'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.findMeOn'
  | 'project.notFound'
  | 'project.backHome'
  | 'project.backAll'
  | 'project.architecture'
  | 'project.viewProject'
  | 'project.viewCode'
  | 'project.stackKicker'
  | 'project.stackTitle'
  | 'project.stackSubtitle'
  | 'project.tech.howItWorks'
  | 'architecture.notFound'
  | 'architecture.unavailable'
  | 'architecture.backToProject'
  | 'architecture.title'

type Dict = Record<TranslationKey, string>

const fr: Dict = {
  'nav.projects': 'Projets',
  'nav.contact': 'Contact',
  'nav.frameworks': 'Frameworks',
  'nav.cta': 'Me contacter',
  'nav.lang': 'EN',

  'about.title': 'À propos',
  'about.body':
    "Je suis développeur Frontend junior. Je cherche un poste junior et je prends aussi des missions freelance (landing pages, intégration, petites apps).\n\nJe privilégie un code propre, une UI soignée et des livraisons claires.",
  'about.hire.kicker': 'Parcours Job',
  'about.hire.title': 'Pour les recruteurs',
  'about.hire.body':
    "Stack principale : React + TypeScript.\nJe travaille sur l'UI, le responsive, la qualité du code et l'accessibilité, avec une approche orientée livrables.",
  'about.services.kicker': 'Parcours Freelance',
  'about.services.title': 'Pour les clients',
  'about.services.body':
    "Missions courtes et cadrées :\n- site vitrine / landing page\n- intégration Figma → React\n- petite app avec CRUD + admin\n\nObjectif : livrer vite et proprement, avec un périmètre clair.",

  'hero.available': 'Disponible pour des projets',
  'hero.title': 'Développeur Frontend junior',
  'hero.subtitle':
    "Je construis des interfaces web modernes, responsives et maintenables (React/TypeScript). Profil junior, approche professionnelle : structure, qualité et livrables.",
  'hero.ctaProjects': 'Voir mes projets',

  'projects.title': 'Projets',
  'projects.count': '{{count}} projets',
  'projects.viewProjectCta': 'Voir le projet',

  'frameworks.title': 'Frameworks & outils',
  'frameworks.subtitle':
    "Un aperçu des frameworks que j'ai utilisés et de la manière dont je les ai intégrés dans des projets (front, API, et un peu de mobile).",
  'frameworks.react':
    "J'ai réalisé des interfaces avec React (et parfois Next.js) : composants réutilisables, routing, gestion d'état, et intégration d'API. Mon objectif est de faire une UI propre, responsive et maintenable.",
  'frameworks.api':
    "J'ai eu à consommer et intégrer des APIs backend (par exemple Flask/Python ou Laravel/PHP). Concrètement : endpoints REST, authentification simple, gestion des erreurs, et affichage des données côté frontend.",
  'frameworks.typescript':
    "J'utilise TypeScript pour mieux structurer les données (types, interfaces), réduire les bugs et rendre le code plus lisible quand un projet grandit.",
  'frameworks.ui':
    "Avec Tailwind CSS, je peux prototyper rapidement et garder une cohérence UI. J'apprends aussi à améliorer l'accessibilité et les détails d'UX (espacements, états, responsive).",
  'frameworks.flutter':
    "J'ai fait quelques projets/tests en Flutter (Dart) pour comprendre la logique mobile : widgets, navigation, appels réseau, et écrans simples.",
  'frameworks.expo':
    "En ce moment, je découvre Expo (React Native). Je fais des projets test pour apprendre l'environnement, les composants natifs, et la logique de navigation.",
  'frameworks.deploy':
    "Je déploie sur Vercel et j'apprends à connecter une base de données (Postgres/Neon) via des fonctions serverless. Objectif : un flow simple, un admin CRUD, et des données persistées.",

  'contact.title': 'Travaillons\nensemble.',
  'contact.subtitle':
    "Un projet en tête ? Une idée à concrétiser ?\nDiscutons-en.",
  'contact.findMeOn': 'Retrouve-moi sur',

  'project.notFound': 'Projet introuvable',
  'project.backHome': "← Retour à l'accueil",
  'project.backAll': 'Tous les projets',
  'project.architecture': 'Architecture',
  'project.viewProject': 'Voir le projet',
  'project.viewCode': 'Code (GitHub)',
  'project.stackKicker': 'Stack technique',
  'project.stackTitle': 'Les technologies utilisées',
  'project.stackSubtitle':
    "Chaque technologie a un rôle précis — voici ce qu'elle fait et comment elle interagit avec le reste.",
  'project.tech.howItWorks': 'Comment ça fonctionne',

  'architecture.notFound': 'Projet introuvable',
  'architecture.unavailable': 'Architecture indisponible',
  'architecture.backToProject': '← Retour au projet',
  'architecture.title': 'Architecture — {{title}}',
}

const en: Dict = {
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.frameworks': 'Frameworks',
  'nav.cta': 'Contact me',
  'nav.lang': 'FR',

  'about.title': 'About',
  'about.body':
    'I am a junior Frontend Developer. I am looking for a junior role and I also take beginner-friendly freelance missions (landing pages, integrations, small apps).\n\nI focus on clean code, polished UI, and clear deliverables.',
  'about.hire.kicker': 'Job track',
  'about.hire.title': 'For recruiters',
  'about.hire.body':
    'Main stack: React + TypeScript.\nI work on UI, responsiveness, code quality, and accessibility, with a deliverables-first mindset.',
  'about.services.kicker': 'Freelance track',
  'about.services.title': 'For clients',
  'about.services.body':
    'Short, well-scoped missions:\n- landing page / website\n- Figma → React integration\n- small app with CRUD + admin\n\nGoal: deliver quickly and cleanly, with a clear scope.',

  'hero.available': 'Available for projects',
  'hero.title': 'Junior Frontend Developer',
  'hero.subtitle':
    'I build modern, responsive, and maintainable web interfaces (React/TypeScript). Junior profile, professional approach: structure, quality, and clear deliverables.',
  'hero.ctaProjects': 'View my projects',

  'projects.title': 'Projects',
  'projects.count': '{{count}} projects',
  'projects.viewProjectCta': 'View project',

  'frameworks.title': 'Frameworks & tools',
  'frameworks.subtitle':
    'A quick overview of frameworks I have used and how I integrated them in projects (frontend, APIs, and a bit of mobile).',
  'frameworks.react':
    'I built user interfaces with React (and sometimes Next.js): reusable components, routing, state management, and API integrations. My goal is clean, responsive, maintainable UI.',
  'frameworks.api':
    'I have consumed and integrated backend APIs (for example Flask/Python or Laravel/PHP). In practice: REST endpoints, simple authentication, error handling, and displaying data on the frontend.',
  'frameworks.typescript':
    'I use TypeScript to structure data (types, interfaces), reduce bugs, and keep code readable as a project grows.',
  'frameworks.ui':
    'With Tailwind CSS I can prototype quickly while keeping UI consistency. I am also learning accessibility and UX details (spacing, states, responsive).',
  'frameworks.flutter':
    'I did a few projects/tests in Flutter (Dart) to understand mobile logic: widgets, navigation, network calls, and simple screens.',
  'frameworks.expo':
    'Right now I am exploring Expo (React Native). I build small test projects to learn the tooling, native components, and navigation patterns.',
  'frameworks.deploy':
    'I deploy on Vercel and I am learning to connect a database (Postgres/Neon) through serverless functions. Goal: a simple flow, an admin CRUD, and persistent data.',

  'contact.title': "Let's work\ntogether.",
  'contact.subtitle': 'Have a project in mind? An idea to bring to life?\nLet\'s talk.',
  'contact.findMeOn': 'Find me on',
 
  'project.notFound': 'Project not found',
  'project.backHome': '← Back to home',
  'project.backAll': 'All projects',
  'project.architecture': 'Architecture',
  'project.viewProject': 'View project',
  'project.viewCode': 'Code (GitHub)',
  'project.stackKicker': 'Tech stack',
  'project.stackTitle': 'Technologies used',
  'project.stackSubtitle':
    'Each technology has a specific role — here is what it does and how it interacts with the rest.',
  'project.tech.howItWorks': 'How it works',

  'architecture.notFound': 'Project not found',
  'architecture.unavailable': 'Architecture unavailable',
  'architecture.backToProject': '← Back to project',
  'architecture.title': 'Architecture — {{title}}',
}

export const translations: Record<Lang, Dict> = { fr, en }

export function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(params[key] ?? ''))
}
