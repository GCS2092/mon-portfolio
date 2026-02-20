import { useCallback, useEffect, useMemo, useState } from 'react'
import type { SocialLink } from '../types'
import { loadLinks, saveLinks } from '../store/linksStore'
import { fetchLinksFromServer, saveLinksToServer } from '../store/linksApi'
import { socialLinks as defaultSocialLinks } from '../../../data/links'

type UseLinksApi = {
  links: SocialLink[]
  setLinks: (next: SocialLink[]) => void
  upsertLink: (link: SocialLink) => void
  deleteLink: (id: string) => void
  loadFromServer: () => Promise<void>
  saveToServer: (adminToken: string) => Promise<void>
}

export function useLinks(): UseLinksApi {
  const [links, _setLinks] = useState<SocialLink[]>(() => {
    try {
      const local = loadLinks()
      if (local.length) return local
      return (defaultSocialLinks as unknown as SocialLink[]).map((l: any) => ({
        id: String(l.label ?? l.url ?? Math.random()),
        label: String(l.label ?? ''),
        url: String(l.url ?? ''),
      }))
    } catch {
      return []
    }
  })

  const setLinks = useCallback((next: SocialLink[]) => {
    _setLinks(next)
  }, [])

  const upsertLink = useCallback((link: SocialLink) => {
    _setLinks((prev) => {
      const idx = prev.findIndex((x) => x.id === link.id)
      if (idx >= 0) {
        const copy = prev.slice()
        copy[idx] = link
        return copy
      }
      return [...prev, link]
    })
  }, [])

  const deleteLink = useCallback((id: string) => {
    _setLinks((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const loadFromServer = useCallback(async () => {
    try {
      const remote = await fetchLinksFromServer()
      if (!remote) return
      _setLinks(remote)
    } catch {
      // ignore
    }
  }, [])

  const saveToServer = useCallback(
    async (adminToken: string) => {
      await saveLinksToServer(links, adminToken)
    },
    [links]
  )

  useEffect(() => {
    try {
      saveLinks(links)
    } catch {
      // ignore
    }
  }, [links])

  useEffect(() => {
    void loadFromServer()
  }, [loadFromServer])

  return useMemo(
    () => ({
      links,
      setLinks,
      upsertLink,
      deleteLink,
      loadFromServer,
      saveToServer,
    }),
    [links, setLinks, upsertLink, deleteLink, loadFromServer, saveToServer]
  )
}
