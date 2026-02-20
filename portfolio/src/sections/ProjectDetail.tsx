import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

interface Tech {
  name: string
  role: string
  color: string
  description: string
  how: string
}

function getStatusDotClasses(status: string) {
  const s = status.trim().toLowerCase()
  const isProd = /production|prod\b|live|en ligne/.test(s)
  const isDev = /d[ée]veloppement|developp|dev\b|beta|b[ée]ta/.test(s)
  const isPaused = /pause|maintenance|hors ligne|offline/.test(s)

  if (isProd) return 'bg-green-500'
  if (isDev) return 'bg-amber-500 animate-pulse'
  if (isPaused) return 'bg-slate-400'
  return 'bg-blue-500'
}

function useVisible(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

function StackCard({ tech, index }: { tech: Tech; index: number }) {
  const [ref, visible] = useVisible()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="group p-6 rounded-2xl border border-[#E8E6E1] bg-white hover:shadow-lg hover:border-[#2D5BE3]/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: tech.color }} />
            <h3 className="font-medium text-[#1A1A1A] text-base">{tech.name}</h3>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-[#E8E6E1] text-[#6B6B6B] bg-[#FAF9F7]">
            {tech.role}
          </span>
        </div>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{tech.description}</p>
        <div className="pt-4 border-t border-[#E8E6E1]">
          <p className="font-mono text-xs text-[#2D5BE3] mb-1.5">Comment ça fonctionne</p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed">{tech.how}</p>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const [heroRef, heroVisible] = useVisible()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-[#6B6B6B] mb-4">Projet introuvable</p>
        <Link to="/" className="text-sm text-[#2D5BE3] hover:underline">← Retour à l'accueil</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <section
        ref={heroRef}
        className={`pt-32 pb-16 max-w-5xl mx-auto px-6 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-10 font-mono">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          Tous les projets
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-xs text-[#2D5BE3]">{project.year}</span>
          <span className="w-1 h-1 rounded-full bg-[#E8E6E1]" />
          {project.status && (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#6B6B6B]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${getStatusDotClasses(project.status)}`}
              />
              {project.status}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-light text-[#1A1A1A] tracking-tight mb-6">
          {project.title}
        </h1>

        <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl leading-relaxed mb-8">
          {project.fullDescription}
        </p>

        {/* Tags + CTA */}
        <div className="flex flex-wrap items-center gap-3">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs px-3 py-1.5 rounded-full border border-[#E8E6E1] bg-white text-[#6B6B6B]">
              {tag}
            </span>
          ))}
          
          {/* Boutons */}
          <div className="flex items-center gap-3 ml-auto">
            <Link
              to={`/project/${project.slug}/architecture`}
              className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Architecture
            </Link>
            
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#2D5BE3] transition-colors"
            >
              Voir le projet
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-[#E8E6E1]" />
      </div>

      {/* Stack technique */}
      <section className="py-16 pb-24 max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#2D5BE3]">Stack technique</span>
            <span className="h-px w-10 bg-[#E8E6E1]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-tight">
            Les technologies utilisées
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-2 max-w-xl">
            Chaque technologie a un rôle précis — voici ce qu'elle fait et comment elle interagit avec le reste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.stack && project.stack.map((tech, index) => (
            <StackCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}