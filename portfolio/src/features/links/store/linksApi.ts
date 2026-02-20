import type { SocialLink } from '../types'

export async function fetchLinksFromServer(): Promise<SocialLink[] | null> {
  const res = await fetch('/api/links', { method: 'GET' })
  if (!res.ok) return null
  const json = (await res.json()) as { links: unknown }
  if (!Array.isArray(json.links)) return null
  return json.links as SocialLink[]
}

export async function saveLinksToServer(links: SocialLink[], adminToken: string) {
  const res = await fetch('/api/links', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify(links),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'save_failed')
  }
}
