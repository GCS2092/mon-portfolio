
import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import mermaid from 'mermaid'
import { projects } from '../data/projects'

type ProjectArchitectureData = {
  description: string
  diagram: string
}

type Project = {
  slug: string
  title: string
  architecture?: ProjectArchitectureData
}

export default function ProjectArchitecture() {
  const { slug } = useParams()
  const project = (projects as Project[]).find((p) => p.slug === slug)
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!project?.architecture || !diagramRef.current) return
    mermaid.initialize({ startOnLoad: false, theme: 'default' })
    diagramRef.current.innerHTML = ''
    const mermaidEl = document.createElement('div')
    mermaidEl.className = 'mermaid'
    mermaidEl.textContent = project.architecture.diagram
    diagramRef.current.appendChild(mermaidEl)
    mermaid.run({ nodes: [mermaidEl] })
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-[#6B6B6B] mb-4">Projet introuvable</p>
        <Link to="/" className="text-sm text-[#2D5BE3] hover:underline">← Retour à l'accueil</Link>
      </div>
    )
  }

  if (!project.architecture) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-[#6B6B6B] mb-4">Architecture indisponible</p>
        <Link to={`/project/${project.slug}`} className="text-sm text-[#2D5BE3] hover:underline">
          ← Retour au projet
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <section className="pt-32 pb-16 max-w-5xl mx-auto px-6">
        <Link
          to={`/project/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-10 font-mono"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          Retour au projet
        </Link>

        <h1 className="text-3xl md:text-5xl font-light text-[#1A1A1A] tracking-tight mb-6">
          Architecture — {project.title}
        </h1>

        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-10">
          {project.architecture.description}
        </p>

        <div
          ref={diagramRef}
          className="overflow-auto bg-white p-6 rounded-2xl border border-[#E8E6E1] shadow-sm"
        />
      </section>
    </div>
  )
}
