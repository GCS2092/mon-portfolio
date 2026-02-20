import type { Project } from '../types'

export async function fetchProjectsFromServer(): Promise<Project[] | null> {
  const res = await fetch('/api/projects', { method: 'GET' })
  if (!res.ok) return null
  const json = (await res.json()) as { projects: unknown }
  if (!Array.isArray(json.projects)) return null
  return json.projects as Project[]
}

export async function saveProjectsToServer(projects: Project[], adminToken: string) {
  const res = await fetch('/api/projects', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify(projects),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'save_failed')
  }
}
