import { useEffect, useRef, useState } from 'react'
import ProjectCard from '../features/projects/components/ProjectCard'
import { useProjects } from '../features/projects/hooks/useProjects'
import { useI18n } from '../features/i18n/useI18n'

export default function Projects() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const { t } = useI18n()

  const { projects } = useProjects()

  // Animation apparition section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 max-w-5xl mx-auto px-6"
    >
      {/* HEADER */}
      <div
        className={`mb-14 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#2D5BE3]">02</span>
          <span className="h-px w-10 bg-[#E8E6E1]" />
        </div>

        <h2 className="text-3xl md:text-4xl font-light text-[#1A1A1A] tracking-tight">
          {t('projects.title')}
        </h2>

        <p className="text-[#6B6B6B] text-sm mt-2">
          {t('projects.count', { count: projects.length })}
        </p>
      </div>

      {/* GRID PROJETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`cursor-pointer transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: `${index * 100 + 200}ms` }}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}
