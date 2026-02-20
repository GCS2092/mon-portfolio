import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Project, ProjectTech } from '../../projects/types'
import { useProjects } from '../../projects/hooks/useProjects'
import { useLinks } from '../../links/hooks/useLinks'
import { detectSocialIconKey, socialIcons } from '../../links/icons'
import { useFrameworks } from '../../frameworks/hooks/useFrameworks'

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function normalizeSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const emptyProject: Project = {
  id: 0,
  slug: '',
  title: '',
  year: new Date().getFullYear().toString(),
  link: '',
  tags: [],
  shortDescription: '',
  fullDescription: '',
}

export default function AdminPage() {
  const navigate = useNavigate()

  const {
    projects,
    upsertProject,
    deleteProject,
    resetToDefault,
    importProjects,
    exportProjects,
    loadFromServer,
    saveToServer,
  } = useProjects()

  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const editingProject = useMemo(() => {
    if (!editingSlug) return null
    return projects.find((p) => p.slug === editingSlug) ?? null
  }, [editingSlug, projects])

  const [draft, setDraft] = useState<Project>(emptyProject)

  const [showEnglishFields, setShowEnglishFields] = useState(false)

  const [adminToken, setAdminToken] = useState('')
  const [autoPublish, setAutoPublish] = useState(false)
  const [projectsDirty, setProjectsDirty] = useState(false)
  const [publishState, setPublishState] = useState<
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success' }
    | { status: 'error'; message: string }
  >({ status: 'idle' })

  const {
    links,
    setLinks,
    loadFromServer: loadLinksFromServer,
    saveToServer: saveLinksToServer,
  } = useLinks()

  const {
    content: frameworksContent,
    setContent: setFrameworksContent,
    loadFromServer: loadFrameworksFromServer,
    saveToServer: saveFrameworksToServer,
  } = useFrameworks()

  const [linksState, setLinksState] = useState<
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success' }
    | { status: 'error'; message: string }
  >({ status: 'idle' })

  const [linksDirty, setLinksDirty] = useState(false)

  const [frameworksState, setFrameworksState] = useState<
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success' }
    | { status: 'error'; message: string }
  >({ status: 'idle' })

  const [frameworksDirty, setFrameworksDirty] = useState(false)

  const [showFrameworksEnglishFields, setShowFrameworksEnglishFields] = useState(false)

  const updateFrameworks = (patch: Partial<typeof frameworksContent>) => {
    setFrameworksContent({
      ...frameworksContent,
      ...patch,
    })
    setFrameworksDirty(true)
    void publishFrameworksIfNeeded()
  }

  const startNew = () => {
    setEditingSlug(null)
    setDraft({ ...emptyProject, id: Date.now() })
  }

  const onLinksAdd = () => {
    const next = {
      id: String(Date.now()),
      label: 'Nouveau lien',
      url: '',
    }
    setLinks([...links, next])
    setLinksDirty(true)
    if (autoPublish && adminToken.trim()) void onLinksPublish()
  }

  const onLinksUpdate = (id: string, patch: { label?: string; url?: string }) => {
    setLinks(
      links.map((l) =>
        l.id === id
          ? {
              ...l,
              ...patch,
            }
          : l
      )
    )
    setLinksDirty(true)
    if (autoPublish && adminToken.trim()) void onLinksPublish()
  }

  const onLinksDelete = (id: string) => {
    setLinks(links.filter((l) => l.id !== id))
    setLinksDirty(true)
    if (autoPublish && adminToken.trim()) void onLinksPublish()
  }

  const onLinksReload = async () => {
    setLinksState({ status: 'loading' })
    try {
      await loadLinksFromServer()
      setLinksState({ status: 'success' })
      setLinksDirty(false)
    } catch (e) {
      setLinksState({
        status: 'error',
        message: e instanceof Error ? e.message : 'load_failed',
      })
    }
  }

  const onFrameworksReload = async () => {
    setFrameworksState({ status: 'loading' })
    try {
      await loadFrameworksFromServer()
      setFrameworksState({ status: 'success' })
      setFrameworksDirty(false)
    } catch (e) {
      setFrameworksState({
        status: 'error',
        message: e instanceof Error ? e.message : 'load_failed',
      })
    }
  }

  const onFrameworksPublish = async () => {
    if (!adminToken.trim()) return
    setFrameworksState({ status: 'loading' })
    try {
      await saveFrameworksToServer(adminToken.trim())
      setFrameworksState({ status: 'success' })
      setFrameworksDirty(false)
    } catch (e) {
      setFrameworksState({
        status: 'error',
        message: e instanceof Error ? e.message : 'publish_failed',
      })
    }
  }

  const publishFrameworksIfNeeded = async () => {
    if (!autoPublish) return
    if (!adminToken.trim()) return
    void onFrameworksPublish()
  }

  const onLinksPublish = async () => {
    if (!adminToken.trim()) return
    setLinksState({ status: 'loading' })
    try {
      await saveLinksToServer(adminToken.trim())
      setLinksState({ status: 'success' })
      setLinksDirty(false)
    } catch (e) {
      setLinksState({
        status: 'error',
        message: e instanceof Error ? e.message : 'publish_failed',
      })
    }
  }

  const startEdit = (slug: string) => {
    const p = projects.find((x) => x.slug === slug)
    if (!p) return
    setEditingSlug(slug)
    setDraft(p)
  }

  const publishProjectsIfNeeded = async () => {
    if (!autoPublish) return
    if (!adminToken.trim()) return

    setPublishState({ status: 'loading' })
    try {
      await saveToServer(adminToken.trim())
      setPublishState({ status: 'success' })
      setProjectsDirty(false)
    } catch (e) {
      setPublishState({
        status: 'error',
        message: e instanceof Error ? e.message : 'publish_failed',
      })
    }
  }

  const onSave = () => {
    const slug = normalizeSlug(draft.slug || draft.title)
    if (!slug) return

    const normalizedStatus = draft.status?.trim() ? draft.status.trim() : undefined
    const normalizedRepoUrl = draft.repoUrl?.trim() ? draft.repoUrl.trim() : undefined

    const normalizedStack: ProjectTech[] = (draft.stack ?? [])
      .map((tech) => ({
        name: tech.name?.trim() ?? '',
        role: tech.role ?? '',
        roleEn: tech.roleEn ?? '',
        color: tech.color?.trim() || '#64748B',
        description: tech.description ?? '',
        descriptionEn: tech.descriptionEn ?? '',
        how: tech.how ?? '',
        howEn: tech.howEn ?? '',
        importance: tech.importance ?? '',
        importanceEn: tech.importanceEn ?? '',
      }))
      .filter((t) => Boolean(t.name))

    const next: Project = {
      ...draft,
      slug,
      id: draft.id || Date.now(),
      status: normalizedStatus,
      repoUrl: normalizedRepoUrl,
      tags: Array.from(new Set(draft.tags.map((t) => t.trim()).filter(Boolean))),
      stack: normalizedStack.length ? normalizedStack : undefined,
      architecture:
        draft.architecture && (draft.architecture.description || draft.architecture.diagram)
          ? {
              description: draft.architecture.description ?? '',
              descriptionEn: draft.architecture.descriptionEn ?? '',
              diagram: draft.architecture.diagram ?? '',
            }
          : undefined,
    }

    upsertProject(next)
    setEditingSlug(next.slug)
    setDraft(next)

    setProjectsDirty(true)
    void publishProjectsIfNeeded()
  }

  const onSaveAndPreview = () => {
    const slug = normalizeSlug(draft.slug || draft.title)
    if (!slug) return
    onSave()
    navigate(`/project/${slug}`)
  }

  const onDelete = () => {
    if (!editingSlug) return
    deleteProject(editingSlug)
    startNew()

    setProjectsDirty(true)
    void publishProjectsIfNeeded()
  }

  const onExport = () => {
    downloadJson('projects.json', exportProjects())
  }

  const onImportFile = async (file: File) => {
    const text = await file.text()
    const parsed = JSON.parse(text) as Project[]
    if (!Array.isArray(parsed)) return
    importProjects(parsed)
    startNew()

    setProjectsDirty(true)
    void publishProjectsIfNeeded()
  }

  const onPublishToVercel = async () => {
    if (!adminToken.trim()) return
    setPublishState({ status: 'loading' })
    try {
      await saveToServer(adminToken.trim())
      setPublishState({ status: 'success' })
      setProjectsDirty(false)
    } catch (e) {
      setPublishState({
        status: 'error',
        message: e instanceof Error ? e.message : 'publish_failed',
      })
    }
  }

  const onReloadFromVercel = async () => {
    setPublishState({ status: 'loading' })
    try {
      await loadFromServer()
      setPublishState({ status: 'success' })
      setProjectsDirty(false)
    } catch (e) {
      setPublishState({
        status: 'error',
        message: e instanceof Error ? e.message : 'load_failed',
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <section className="pt-28 pb-16 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-tight">
              Admin
            </h1>
            <p className="text-sm text-[#6B6B6B] mt-2">
              Ajoute / modifie tes projets (stockés dans ton navigateur)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full md:w-auto">
            <Link
              to="/"
              className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors font-mono"
            >
              ← Retour
            </Link>
            <button
              onClick={() => void onReloadFromVercel()}
              className="text-sm font-medium border border-[#1A1A1A] px-4 py-2 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors w-full sm:w-auto"
              type="button"
            >
              Recharger Vercel
            </button>
            <button
              onClick={onExport}
              className="text-sm font-medium border border-[#1A1A1A] px-4 py-2 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors w-full sm:w-auto"
              type="button"
            >
              Export JSON
            </button>
            <label className="text-sm font-medium border border-[#1A1A1A] px-4 py-2 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer w-full sm:w-auto text-center">
              Import JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) void onImportFile(f)
                  e.currentTarget.value = ''
                }}
              />
            </label>
          </div>
        </div>

        <div className="mb-8 bg-white border border-[#E8E6E1] rounded-2xl p-5">
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <div className="flex-1">
              <div className="text-sm font-mono text-[#6B6B6B] mb-2">Publication Vercel (KV)</div>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-mono text-[#6B6B6B]">ADMIN_TOKEN</span>
                <input
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30 w-full"
                  placeholder="Colle ton token Vercel ici"
                />
              </label>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-mono text-[#6B6B6B]">
                  <input
                    type="checkbox"
                    checked={autoPublish}
                    onChange={(e) => setAutoPublish(e.target.checked)}
                    className="accent-[#1A1A1A]"
                  />
                  Auto-publier (avec ADMIN_TOKEN)
                </label>
                {projectsDirty && (
                  <span className="text-xs font-mono text-amber-700">Modifs non publiées</span>
                )}
              </div>
              <div className="text-xs text-[#6B6B6B] mt-2">
                Le token n’est pas stocké. Il sert uniquement à envoyer les données vers Vercel.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => void onPublishToVercel()}
                className="text-sm font-medium bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full hover:bg-[#2D5BE3] transition-colors w-full sm:w-auto"
              >
                Publier sur Vercel
              </button>
              {publishState.status === 'loading' && (
                <span className="text-xs font-mono text-[#6B6B6B]">…</span>
              )}
              {publishState.status === 'success' && (
                <span className="text-xs font-mono text-green-600">OK</span>
              )}
              {publishState.status === 'error' && (
                <span className="text-xs font-mono text-red-600">{publishState.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E8E6E1] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-mono text-[#6B6B6B]">Projets</h2>
                <button
                  type="button"
                  onClick={startNew}
                  className="text-sm font-medium text-[#2D5BE3] hover:underline"
                >
                  + Nouveau
                </button>
              </div>
              <div className="flex flex-col gap-2 max-h-[50vh] lg:max-h-[70vh] overflow-y-auto pr-1">
                {projects.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => startEdit(p.slug)}
                    className={`text-left px-3 py-2 rounded-xl border transition-colors ${
                      (editingSlug ?? draft.slug) === p.slug
                        ? 'border-[#2D5BE3]/40 bg-[#FAFAFF]'
                        : 'border-[#E8E6E1] bg-white hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#1A1A1A]">{p.title}</div>
                    <div className="text-xs text-[#6B6B6B] font-mono">{p.slug}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[#E8E6E1]">
                <button
                  type="button"
                  onClick={() => {
                    resetToDefault()
                    startNew()
                    setProjectsDirty(true)
                    void publishProjectsIfNeeded()
                  }}
                  className="text-xs font-mono text-[#6B6B6B] hover:text-[#1A1A1A]"
                >
                  Reset données par défaut
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#E8E6E1] rounded-2xl p-5 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-mono text-[#6B6B6B]">Liens</h2>
                <button
                  type="button"
                  onClick={onLinksAdd}
                  className="text-sm font-medium text-[#2D5BE3] hover:underline"
                >
                  + Ajouter
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {links.map((l) => {
                  const iconKey = detectSocialIconKey(l.url)
                  return (
                    <div key={l.id} className="border border-[#E8E6E1] rounded-xl p-3 bg-[#FAF9F7]">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[#6B6B6B]">
                          {socialIcons[iconKey]}
                          <span className="text-xs font-mono">{iconKey}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onLinksDelete(l.id)}
                          className="text-xs font-mono text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      </div>

                      <div className="mt-3 flex flex-col gap-2">
                        <label className="flex flex-col gap-1">
                          <span className="text-xs font-mono text-[#6B6B6B]">Label</span>
                          <input
                            value={l.label}
                            onChange={(e) => onLinksUpdate(l.id, { label: e.target.value })}
                            className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                          />
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-xs font-mono text-[#6B6B6B]">URL</span>
                          <input
                            value={l.url}
                            onChange={(e) => onLinksUpdate(l.id, { url: e.target.value })}
                            className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                            placeholder="https://..."
                          />
                        </label>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => void onLinksReload()}
                  className="text-sm font-medium border border-[#1A1A1A] px-4 py-2 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors w-full sm:w-auto"
                >
                  Recharger
                </button>
                <button
                  type="button"
                  onClick={() => void onLinksPublish()}
                  className="text-sm font-medium bg-[#1A1A1A] text-white px-4 py-2 rounded-full hover:bg-[#2D5BE3] transition-colors w-full sm:w-auto"
                >
                  Publier
                </button>
                {linksState.status === 'loading' && (
                  <span className="text-xs font-mono text-[#6B6B6B]">…</span>
                )}
                {linksState.status === 'success' && (
                  <span className="text-xs font-mono text-green-600">OK</span>
                )}
                {linksState.status === 'error' && (
                  <span className="text-xs font-mono text-red-600">{linksState.message}</span>
                )}
                {linksDirty && (
                  <span className="text-xs font-mono text-amber-700">Modifs non publiées</span>
                )}
              </div>
            </div>

            <div className="bg-white border border-[#E8E6E1] rounded-2xl p-5 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-mono text-[#6B6B6B]">Frameworks</h2>
                <label className="flex items-center gap-2 text-xs font-mono text-[#6B6B6B]">
                  <input
                    type="checkbox"
                    checked={showFrameworksEnglishFields}
                    onChange={(e) => setShowFrameworksEnglishFields(e.target.checked)}
                    className="accent-[#1A1A1A]"
                  />
                  Champs EN (optionnel)
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Titre (Hero)</span>
                  <input
                    value={frameworksContent.heroTitle}
                    onChange={(e) => updateFrameworks({ heroTitle: e.target.value })}
                    className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                {showFrameworksEnglishFields && (
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#6B6B6B]">Titre (Hero) (EN)</span>
                    <input
                      value={frameworksContent.heroTitleEn ?? ''}
                      onChange={(e) => updateFrameworks({ heroTitleEn: e.target.value })}
                      className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Sous-titre (Hero)</span>
                  <textarea
                    value={frameworksContent.heroSubtitle}
                    onChange={(e) => updateFrameworks({ heroSubtitle: e.target.value })}
                    rows={4}
                    className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                {showFrameworksEnglishFields && (
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#6B6B6B]">Sous-titre (Hero) (EN)</span>
                    <textarea
                      value={frameworksContent.heroSubtitleEn ?? ''}
                      onChange={(e) => updateFrameworks({ heroSubtitleEn: e.target.value })}
                      rows={4}
                      className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>
                )}

                <div className="pt-3 border-t border-[#E8E6E1]" />

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Bloc — Highlights (titre)</span>
                  <input
                    value={frameworksContent.highlightsTitle}
                    onChange={(e) => updateFrameworks({ highlightsTitle: e.target.value })}
                    className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                {showFrameworksEnglishFields && (
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#6B6B6B]">Bloc — Highlights (titre) (EN)</span>
                    <input
                      value={frameworksContent.highlightsTitleEn ?? ''}
                      onChange={(e) => updateFrameworks({ highlightsTitleEn: e.target.value })}
                      className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Bloc — Highlights (texte)</span>
                  <textarea
                    value={frameworksContent.highlightsBody}
                    onChange={(e) => updateFrameworks({ highlightsBody: e.target.value })}
                    rows={4}
                    className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                {showFrameworksEnglishFields && (
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#6B6B6B]">Bloc — Highlights (texte) (EN)</span>
                    <textarea
                      value={frameworksContent.highlightsBodyEn ?? ''}
                      onChange={(e) => updateFrameworks({ highlightsBodyEn: e.target.value })}
                      rows={4}
                      className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>
                )}
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => void onFrameworksReload()}
                  className="text-sm font-medium border border-[#1A1A1A] px-4 py-2 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors w-full sm:w-auto"
                >
                  Recharger
                </button>
                <button
                  type="button"
                  onClick={() => void onFrameworksPublish()}
                  className="text-sm font-medium bg-[#1A1A1A] text-white px-4 py-2 rounded-full hover:bg-[#2D5BE3] transition-colors w-full sm:w-auto"
                >
                  Publier
                </button>
                {frameworksState.status === 'loading' && (
                  <span className="text-xs font-mono text-[#6B6B6B]">…</span>
                )}
                {frameworksState.status === 'success' && (
                  <span className="text-xs font-mono text-green-600">OK</span>
                )}
                {frameworksState.status === 'error' && (
                  <span className="text-xs font-mono text-red-600">{frameworksState.message}</span>
                )}
                {frameworksDirty && (
                  <span className="text-xs font-mono text-amber-700">Modifs non publiées</span>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-[#E8E6E1]">
                <Link to="/frameworks" className="text-sm text-[#2D5BE3] hover:underline">
                  Prévisualiser
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E8E6E1] rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-lg font-medium text-[#1A1A1A]">
                  {editingProject ? 'Modifier projet' : 'Nouveau projet'}
                </h2>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-mono text-[#6B6B6B]">
                    <input
                      type="checkbox"
                      checked={showEnglishFields}
                      onChange={(e) => setShowEnglishFields(e.target.checked)}
                      className="accent-[#1A1A1A]"
                    />
                    Champs EN (optionnel)
                  </label>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={onDelete}
                      className="text-sm font-medium border border-red-500 text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition-colors w-full sm:w-auto"
                    >
                      Supprimer
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onSave}
                    className="text-sm font-medium bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full hover:bg-[#2D5BE3] transition-colors w-full sm:w-auto"
                  >
                    Enregistrer
                  </button>

                  <button
                    type="button"
                    onClick={onSaveAndPreview}
                    className="text-sm font-medium border border-[#1A1A1A] px-5 py-2.5 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors w-full sm:w-auto"
                  >
                    Enregistrer & prévisualiser
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Titre</span>
                  <input
                    value={draft.title}
                    onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                {showEnglishFields && (
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#6B6B6B]">Titre (EN)</span>
                    <input
                      value={draft.titleEn ?? ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, titleEn: e.target.value }))
                      }
                      className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Slug</span>
                  <input
                    value={draft.slug}
                    onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    placeholder="ex: basketblog"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Année</span>
                  <input
                    value={draft.year}
                    onChange={(e) => setDraft((d) => ({ ...d, year: e.target.value }))}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Statut</span>
                  <input
                    value={draft.status ?? ''}
                    onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    placeholder="En production / En développement / Maintenance..."
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Lien externe</span>
                  <input
                    value={draft.link}
                    onChange={(e) => setDraft((d) => ({ ...d, link: e.target.value }))}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    placeholder="https://..."
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[#6B6B6B]">Repo Git</span>
                  <input
                    value={draft.repoUrl ?? ''}
                    onChange={(e) => setDraft((d) => ({ ...d, repoUrl: e.target.value }))}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    placeholder="https://github.com/..."
                  />
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="text-xs font-mono text-[#6B6B6B]">Description courte</span>
                  <textarea
                    value={draft.shortDescription}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, shortDescription: e.target.value }))
                    }
                    rows={2}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                {showEnglishFields && (
                  <label className="flex flex-col gap-1 md:col-span-2">
                    <span className="text-xs font-mono text-[#6B6B6B]">Description courte (EN)</span>
                    <textarea
                      value={draft.shortDescriptionEn ?? ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, shortDescriptionEn: e.target.value }))
                      }
                      rows={2}
                      className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="text-xs font-mono text-[#6B6B6B]">Description complète</span>
                  <textarea
                    value={draft.fullDescription}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, fullDescription: e.target.value }))
                    }
                    rows={5}
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>

                {showEnglishFields && (
                  <label className="flex flex-col gap-1 md:col-span-2">
                    <span className="text-xs font-mono text-[#6B6B6B]">Description complète (EN)</span>
                    <textarea
                      value={draft.fullDescriptionEn ?? ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, fullDescriptionEn: e.target.value }))
                      }
                      rows={5}
                      className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="text-xs font-mono text-[#6B6B6B]">Tags (séparés par virgules)</span>
                  <input
                    value={draft.tags.join(', ')}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        tags: e.target.value.split(',').map((t) => t.trim()),
                      }))
                    }
                    className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                  />
                </label>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-mono text-[#6B6B6B]">Stack (technologies)</h3>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        stack: [
                          ...(d.stack ?? []),
                          {
                            name: '',
                            role: '',
                            roleEn: '',
                            color: '#64748B',
                            description: '',
                            descriptionEn: '',
                            how: '',
                            howEn: '',
                            importance: '',
                            importanceEn: '',
                          },
                        ],
                      }))
                    }
                    className="text-sm font-medium text-[#2D5BE3] hover:underline"
                  >
                    + Ajouter
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(draft.stack ?? []).map((tech, idx) => (
                    <div
                      key={`${tech.name}-${idx}`}
                      className="p-4 rounded-2xl border border-[#E8E6E1] bg-[#FAF9F7]"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                          <label className="flex flex-col gap-1">
                            <span className="text-xs font-mono text-[#6B6B6B]">Nom</span>
                            <input
                              value={tech.name}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  stack: (d.stack ?? []).map((t, i) =>
                                    i === idx ? { ...t, name: e.target.value } : t
                                  ),
                                }))
                              }
                              className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                              placeholder="ex: TypeScript"
                            />
                          </label>

                          <label className="flex flex-col gap-1">
                            <span className="text-xs font-mono text-[#6B6B6B]">Rôle</span>
                            <input
                              value={tech.role}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  stack: (d.stack ?? []).map((t, i) =>
                                    i === idx ? { ...t, role: e.target.value } : t
                                  ),
                                }))
                              }
                              className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                              placeholder="Frontend / Backend / DB..."
                            />
                          </label>

                          <label className="flex flex-col gap-1">
                            <span className="text-xs font-mono text-[#6B6B6B]">Couleur (hex)</span>
                            <input
                              value={tech.color}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  stack: (d.stack ?? []).map((t, i) =>
                                    i === idx ? { ...t, color: e.target.value } : t
                                  ),
                                }))
                              }
                              className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30 font-mono"
                              placeholder="#3178C6"
                            />
                          </label>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setDraft((d) => ({
                              ...d,
                              stack: (d.stack ?? []).filter((_, i) => i !== idx),
                            }))
                          }
                          className="text-xs font-mono text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      </div>

                      {showEnglishFields && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <label className="flex flex-col gap-1">
                            <span className="text-xs font-mono text-[#6B6B6B]">Rôle (EN)</span>
                            <input
                              value={tech.roleEn ?? ''}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  stack: (d.stack ?? []).map((t, i) =>
                                    i === idx ? { ...t, roleEn: e.target.value } : t
                                  ),
                                }))
                              }
                              className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                            />
                          </label>
                        </div>
                      )}

                      <label className="flex flex-col gap-1 mb-3">
                        <span className="text-xs font-mono text-[#6B6B6B]">Description</span>
                        <textarea
                          value={tech.description}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              stack: (d.stack ?? []).map((t, i) =>
                                i === idx ? { ...t, description: e.target.value } : t
                              ),
                            }))
                          }
                          rows={2}
                          className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                        />
                      </label>

                      {showEnglishFields && (
                        <label className="flex flex-col gap-1 mb-3">
                          <span className="text-xs font-mono text-[#6B6B6B]">Description (EN)</span>
                          <textarea
                            value={tech.descriptionEn ?? ''}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                stack: (d.stack ?? []).map((t, i) =>
                                  i === idx ? { ...t, descriptionEn: e.target.value } : t
                                ),
                              }))
                            }
                            rows={2}
                            className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                          />
                        </label>
                      )}

                      <label className="flex flex-col gap-1 mb-3">
                        <span className="text-xs font-mono text-[#6B6B6B]">Comment ça fonctionne</span>
                        <textarea
                          value={tech.how}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              stack: (d.stack ?? []).map((t, i) =>
                                i === idx ? { ...t, how: e.target.value } : t
                              ),
                            }))
                          }
                          rows={2}
                          className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                        />
                      </label>

                      {showEnglishFields && (
                        <label className="flex flex-col gap-1">
                          <span className="text-xs font-mono text-[#6B6B6B]">Comment ça fonctionne (EN)</span>
                          <textarea
                            value={tech.howEn ?? ''}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                stack: (d.stack ?? []).map((t, i) =>
                                  i === idx ? { ...t, howEn: e.target.value } : t
                                ),
                              }))
                            }
                            rows={2}
                            className="px-3 py-2 rounded-xl border border-[#E8E6E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-mono text-[#6B6B6B]">Architecture (Mermaid)</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#6B6B6B]">Texte</span>
                    <textarea
                      value={draft.architecture?.description ?? ''}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          architecture: {
                            description: e.target.value,
                            descriptionEn: d.architecture?.descriptionEn ?? '',
                            diagram: d.architecture?.diagram ?? '',
                          },
                        }))
                      }
                      rows={3}
                      className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                    />
                  </label>

                  {showEnglishFields && (
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-mono text-[#6B6B6B]">Texte (EN)</span>
                      <textarea
                        value={draft.architecture?.descriptionEn ?? ''}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            architecture: {
                              description: d.architecture?.description ?? '',
                              descriptionEn: e.target.value,
                              diagram: d.architecture?.diagram ?? '',
                            },
                          }))
                        }
                        rows={3}
                        className="px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                      />
                    </label>
                  )}

                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-mono text-[#6B6B6B]">Diagramme</span>
                    <textarea
                      value={draft.architecture?.diagram ?? ''}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          architecture: {
                            description: d.architecture?.description ?? '',
                            descriptionEn: d.architecture?.descriptionEn ?? '',
                            diagram: e.target.value,
                          },
                        }))
                      }
                      rows={10}
                      className="font-mono text-xs px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAF9F7] focus:outline-none focus:ring-2 focus:ring-[#2D5BE3]/30"
                      placeholder="flowchart TD\n  A-->B"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <Link
                    to={draft.slug ? `/project/${normalizeSlug(draft.slug)}` : '/'}
                    className="text-sm text-[#2D5BE3] hover:underline w-full sm:w-auto"
                  >
                    Prévisualiser (détail)
                  </Link>
                  <Link
                    to={
                      draft.slug
                        ? `/project/${normalizeSlug(draft.slug)}/architecture`
                        : '/'
                    }
                    className="text-sm text-[#2D5BE3] hover:underline w-full sm:w-auto"
                  >
                    Prévisualiser (architecture)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
