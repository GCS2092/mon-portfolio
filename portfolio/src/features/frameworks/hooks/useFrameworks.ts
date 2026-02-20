import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FrameworksContent } from '../types'
import { loadFrameworks, saveFrameworks } from '../store/frameworksStore'
import { fetchFrameworksFromServer, saveFrameworksToServer } from '../store/frameworksApi'
import { defaultFrameworksContent } from '../data/defaultFrameworksContent'

type UseFrameworksApi = {
  content: FrameworksContent
  setContent: (next: FrameworksContent) => void
  loadFromServer: () => Promise<void>
  saveToServer: (adminToken: string) => Promise<void>
}

export function useFrameworks(): UseFrameworksApi {
  const [content, _setContent] = useState<FrameworksContent>(() => {
    try {
      return loadFrameworks() ?? defaultFrameworksContent
    } catch {
      return defaultFrameworksContent
    }
  })

  const setContent = useCallback((next: FrameworksContent) => {
    _setContent(next)
  }, [])

  const loadFromServer = useCallback(async () => {
    try {
      const remote = await fetchFrameworksFromServer()
      if (!remote) return
      _setContent(remote)
    } catch {
      // ignore
    }
  }, [])

  const saveToServer = useCallback(
    async (adminToken: string) => {
      await saveFrameworksToServer(content, adminToken)
    },
    [content]
  )

  useEffect(() => {
    try {
      saveFrameworks(content)
    } catch {
      // ignore
    }
  }, [content])

  useEffect(() => {
    void loadFromServer()
  }, [loadFromServer])

  return useMemo(
    () => ({ content, setContent, loadFromServer, saveToServer }),
    [content, setContent, loadFromServer, saveToServer]
  )
}
