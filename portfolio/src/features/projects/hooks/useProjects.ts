import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Project } from '../types'
import { hasStoredProjects, loadProjects, resetProjects, saveProjects } from '../store/projectsStore'
import { fetchProjectsFromServer, saveProjectsToServer } from '../store/projectsApi'
import { defaultProjects } from '../data/defaultProjects'

type UseProjectsApi = {
  projects: Project[]
  setProjects: (next: Project[]) => void
  upsertProject: (project: Project) => void
  deleteProject: (slug: string) => void
  resetToDefault: () => void
  importProjects: (projects: Project[]) => void
  exportProjects: () => Project[]
  loadFromServer: () => Promise<void>
  saveToServer: (adminToken: string) => Promise<void>
}

export function useProjects(): UseProjectsApi {
  const [projects, _setProjects] = useState<Project[]>(() => {
    try {
      return loadProjects()
    } catch {
      return defaultProjects
    }
  })

  const loadFromServer = useCallback(async () => {
    try {
      const remote = await fetchProjectsFromServer()
      if (!remote) return
      _setProjects(remote)
    } catch {
      // ignore
    }
  }, [])

  const saveToServer = useCallback(
    async (adminToken: string) => {
      await saveProjectsToServer(projects, adminToken)
    },
    [projects]
  )

  useEffect(() => {
    if (hasStoredProjects()) return
    void loadFromServer()
  }, [loadFromServer])

  useEffect(() => {
    try {
      saveProjects(projects)
    } catch {
      // ignore
    }
  }, [projects])

  const setProjects = useCallback((next: Project[]) => {
    _setProjects(next)
  }, [])

  const upsertProject = useCallback((project: Project) => {
    _setProjects((prev) => {
      const idx = prev.findIndex((p) => p.slug === project.slug)
      if (idx === -1) return [project, ...prev]
      const copy = [...prev]
      copy[idx] = project
      return copy
    })
  }, [])

  const deleteProject = useCallback((slug: string) => {
    _setProjects((prev) => prev.filter((p) => p.slug !== slug))
  }, [])

  const resetToDefault = useCallback(() => {
    resetProjects()
    _setProjects(loadProjects())
  }, [])

  const importProjects = useCallback((incoming: Project[]) => {
    _setProjects(incoming)
  }, [])

  const exportProjects = useCallback(() => projects, [projects])

  return useMemo(
    () => ({
      projects,
      setProjects,
      upsertProject,
      deleteProject,
      resetToDefault,
      importProjects,
      exportProjects,
      loadFromServer,
      saveToServer,
    }),
    [
      projects,
      setProjects,
      upsertProject,
      deleteProject,
      resetToDefault,
      importProjects,
      exportProjects,
      loadFromServer,
      saveToServer,
    ]
  )
}
