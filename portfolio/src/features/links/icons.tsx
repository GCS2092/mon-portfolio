import type { ReactNode } from 'react'

export type SocialIconKey =
  | 'github'
  | 'gitlab'
  | 'linkedin'
  | 'instagram'
  | 'x'
  | 'youtube'
  | 'tiktok'
  | 'discord'
  | 'medium'
  | 'devto'
  | 'stackoverflow'
  | 'facebook'
  | 'behance'
  | 'dribbble'
  | 'figma'
  | 'telegram'
  | 'whatsapp'
  | 'reddit'
  | 'twitch'
  | 'website'

export function detectSocialIconKey(url: string): SocialIconKey {
  const u = url.toLowerCase()

  if (u.includes('github.com')) return 'github'
  if (u.includes('gitlab.com')) return 'gitlab'
  if (u.includes('linkedin.com')) return 'linkedin'
  if (u.includes('instagram.com')) return 'instagram'
  if (u.includes('twitter.com') || u.includes('x.com')) return 'x'
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube'
  if (u.includes('tiktok.com')) return 'tiktok'
  if (u.includes('discord.gg') || u.includes('discord.com')) return 'discord'
  if (u.includes('medium.com')) return 'medium'
  if (u.includes('dev.to')) return 'devto'
  if (u.includes('stackoverflow.com')) return 'stackoverflow'
  if (u.includes('facebook.com') || u.includes('fb.com')) return 'facebook'
  if (u.includes('behance.net')) return 'behance'
  if (u.includes('dribbble.com')) return 'dribbble'
  if (u.includes('figma.com')) return 'figma'
  if (u.includes('t.me') || u.includes('telegram.me')) return 'telegram'
  if (u.includes('wa.me') || u.includes('whatsapp.com')) return 'whatsapp'
  if (u.includes('reddit.com')) return 'reddit'
  if (u.includes('twitch.tv')) return 'twitch'

  return 'website'
}

export const socialIcons: Record<SocialIconKey, ReactNode> = {
  github: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  gitlab: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.6 16.7 7.5H7.3L12 21.6Zm10-9.6L20.6 6.7a1 1 0 0 0-1.9.1l-2.1 6.5H7.4L5.3 6.8a1 1 0 0 0-1.9-.1L2 12l10 9.6L22 12Z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm10.2 2.55a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
    </svg>
  ),
  x: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.3 22H2l7.4-8.5L1 2h6.4l4.4 5.8L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z" />
    </svg>
  ),
  youtube: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5A3 3 0 0 0 2.4 7.2 31.2 31.2 0 0 0 2 12a31.2 31.2 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 22 12a31.2 31.2 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.7 2c.2 1.8 1.2 3.4 2.8 4.4 1 .6 2 .9 2.5 1v3.5c-1.8.1-3.5-.5-4.9-1.6v6.4c0 3.6-2.9 6.5-6.5 6.5S6 19.3 6 15.7s2.9-6.5 6.5-6.5c.4 0 .8 0 1.2.1v3.8c-.4-.2-.8-.3-1.2-.3-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8V2h3.2Z" />
    </svg>
  ),
  discord: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4.7A16.1 16.1 0 0 0 16.1 3c-.2.4-.5 1-.7 1.4a15 15 0 0 0-6.8 0c-.2-.4-.5-1-.7-1.4A16.1 16.1 0 0 0 4 4.7C1.6 8.1 1 11.5 1.3 14.8a16.4 16.4 0 0 0 5 2.5c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.7-.8l.4-.3c3.3 1.6 6.9 1.6 10.2 0l.4.3c-.5.3-1.1.6-1.7.8.3.7.7 1.3 1.1 1.9a16.4 16.4 0 0 0 5-2.5c.3-3.6-.6-6.9-2.3-10.1ZM8.7 13.3c-.8 0-1.5-.7-1.5-1.6 0-.9.7-1.6 1.5-1.6.8 0 1.5.7 1.5 1.6 0 .9-.7 1.6-1.5 1.6Zm6.6 0c-.8 0-1.5-.7-1.5-1.6 0-.9.7-1.6 1.5-1.6.8 0 1.5.7 1.5 1.6 0 .9-.7 1.6-1.5 1.6Z" />
    </svg>
  ),
  medium: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 7.2c.1-.9-.2-1.8-.9-2.4L2.6 4V3h7.1l5.5 12.1L20 3h6.4v1l-.4.3c-.4.3-.6.8-.5 1.3v12.2c-.1.5.1 1 .5 1.3l.4.3v1H17v-1l.4-.3c.4-.3.5-.5.5-1.3V7.9l-6.3 13.9h-.9L5.3 7.9V16c-.1.9.2 1.8.9 2.4l.8 1v1H2v-1l.8-1c.7-.6 1-1.5.9-2.4V7.2Z" />
    </svg>
  ),
  devto: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.7 7H6.3v10h1.4c2.9 0 4.6-1.7 4.6-5s-1.7-5-4.6-5Zm0 8.3H8c1.6 0 2.5-.9 2.5-3.3S9.6 8.7 8 8.7h-.3v6.6ZM14 17V7h1.9v8.3h3V17H14Zm7.4-10.1c-.2 0-.4-.2-.4-.4s.2-.4.4-.4.4.2.4.4-.2.4-.4.4Z" />
    </svg>
  ),
  stackoverflow: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.8 20.6v-5.9h1.8V22H4.4v-7.3h1.8v5.9h11.6ZM7 17.6h9.2v1.8H7v-1.8Zm.2-4.1 9 .8-.2 1.8-9-.8.2-1.8Zm.7-4.1 8.8 2-.4 1.8-8.8-2 .4-1.8Zm1.9-3.9 8.1 3.8-.8 1.6-8.1-3.8.8-1.6Zm3.2-3.2 6.9 5.7-1.2 1.4-6.9-5.7 1.2-1.4Z" />
    </svg>
  ),
  facebook: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.5 22v-8h2.7l.4-3H13.5V9.2c0-.9.3-1.6 1.7-1.6h1.4V5c-.2 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.4v3H10v8h3.5Z" />
    </svg>
  ),
  behance: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.2 11.2c.9-.4 1.5-1.2 1.5-2.3 0-2-1.5-3-3.9-3H1.5V18h4.6c2.7 0 4.2-1.2 4.2-3.4 0-1.6-.9-2.8-2.1-3.4Zm-4.9-3.4h2.2c1 0 1.6.4 1.6 1.3 0 1-.6 1.4-1.6 1.4H3.3V7.8Zm2.4 8.4H3.3v-3.3h2.5c1.2 0 1.9.5 1.9 1.6 0 1.2-.7 1.7-2 1.7ZM22.5 13.6c0-2.7-1.6-4.6-4.3-4.6-2.7 0-4.4 2-4.4 4.6 0 2.7 1.7 4.6 4.6 4.6 2 0 3.5-.9 4-2.7h-2.1c-.2.6-.9 1-1.8 1-1.2 0-2-.7-2.1-2h6.1v-.9Zm-6.1-.6c.1-1 .8-1.7 1.9-1.7s1.7.6 1.8 1.7h-3.7ZM16.2 6.3h3.6v1.4h-3.6V6.3Z" />
    </svg>
  ),
  dribbble: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9.1a8 8 0 0 1-3.6.7 20 20 0 0 0-1-2.3 8 8 0 0 0 2.5-2.8 8 8 0 0 1 2.1 4.4ZM16.6 5.3a6 6 0 0 1-2 2.3 20.2 20.2 0 0 0-2.5-3 8 8 0 0 1 4.5.7ZM10 4.3a18.5 18.5 0 0 1 2.8 3.2 30.7 30.7 0 0 1-5.9 1.6A8 8 0 0 1 10 4.3Zm-4 6.7c2.3 0 4.7-.4 7-1.1.3.6.6 1.2.9 1.9-2.6.8-4.8 2.1-6.6 4A8 8 0 0 1 6 11Zm6 8.7a8 8 0 0 1-3.2-.7c1.6-1.6 3.5-2.7 5.7-3.4.6 1.6 1 3.2 1.2 4.5a8 8 0 0 1-3.7-.4Zm5.7-1.5c-.2-1.1-.5-2.4-1-3.8.8-.1 1.7-.2 2.7-.1a8 8 0 0 1-1.7 3.9Z" />
    </svg>
  ),
  figma: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 1 0 0 8v2a4 4 0 1 0 8 0v-6a4 4 0 0 0 0-8V6a4 4 0 0 0-4-4Zm0 2a2 2 0 1 1 0 4h-2V6a2 2 0 0 1 2-2Zm-2 6h2a2 2 0 1 1 0 4h-2a2 2 0 1 1 0-4Zm6 0a2 2 0 1 1-2 2 2 2 0 0 1 2-2Zm-6 6h2a4 4 0 0 0 2-.5V18a2 2 0 1 1-4 0v-2Z" />
    </svg>
  ),
  telegram: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.7 4.3 18.5 20c-.2 1.1-.9 1.3-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.3L18.3 6c.4-.4-.1-.6-.6-.3L5.8 13.2l-5.1-1.6c-1.1-.3-1.1-1.1.2-1.6L20.5 3c.9-.3 1.7.2 1.2 1.3Z" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.4c-.2.6-1.2 1.1-1.7 1.2-.5.1-1.1.2-3.5-.7-3.1-1.2-5.1-4.2-5.3-4.4-.1-.2-1.3-1.7-1.3-3.3 0-1.6.8-2.4 1.1-2.7.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.7.5.2.6.8 2.1.9 2.2.1.2.1.4 0 .6-.1.2-.2.4-.3.5-.2.2-.3.4-.4.5-.1.2-.2.3 0 .6.2.3.9 1.4 1.9 2.2 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 2 .9 2.3 1.1.3.2.5.2.6.3.1.1.1.6-.1 1.2Z" />
    </svg>
  ),
  reddit: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-1.1-.9-2-2-2-.6 0-1.1.3-1.5.7-1.5-1-3.6-1.7-5.9-1.8l1-4.7 3.3.7a1.5 1.5 0 1 0 .2-1.1l-4-.9-1.2 5.9c-2.3.1-4.4.8-5.9 1.8A2 2 0 1 0 4 14.4c.2 2.9 3.8 5.2 8 5.2s7.8-2.3 8-5.2c.6-.3 1-.9 1-1.6Zm-5.7 1.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm-8.6 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm8 3.2c-1 .9-2.2 1.3-3.7 1.3S9.4 18 8.4 17.1a.7.7 0 0 1 1-1c.7.6 1.6.9 2.6.9s1.9-.3 2.6-.9a.7.7 0 1 1 1 1Z" />
    </svg>
  ),
  twitch: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 3h18v10l-5 5h-4l-2 2H8v-2H4V3Zm2 2v11h4v2h1l2-2h4l3-3V5H6Zm9 3h2v5h-2V8Zm-4 0h2v5h-2V8Z" />
    </svg>
  ),
  website: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 2.46 4 5.7 4 9s-1.5 6.54-4 9c-2.5-2.46-4-5.7-4-9s1.5-6.54 4-9Z" />
    </svg>
  ),
}
