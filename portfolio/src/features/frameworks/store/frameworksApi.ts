import type { FrameworksContent } from '../types'

export async function fetchFrameworksFromServer(): Promise<FrameworksContent | null> {
  const res = await fetch('/api/frameworks', { method: 'GET' })
  if (!res.ok) return null
  const json = (await res.json()) as { frameworks: unknown }
  if (!json.frameworks || typeof json.frameworks !== 'object') return null
  return json.frameworks as FrameworksContent
}

export async function saveFrameworksToServer(content: FrameworksContent, adminToken: string) {
  const res = await fetch('/api/frameworks', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify(content),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'save_failed')
  }
}
