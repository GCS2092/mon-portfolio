import { Link } from 'react-router-dom'
import type { Project } from '../types'
import { useI18n } from '../../i18n/useI18n'
import { getProjectShortDescription, getProjectTitle } from '../i18n'

export default function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const { t, lang } = useI18n()

  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block p-6 md:p-8 border border-[#E8E6E1] rounded-2xl bg-white hover:border-[#2D5BE3]/40 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-[#6B6B6B]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-xs text-[#6B6B6B]">{project.year}</span>
      </div>
      <h3 className="text-lg font-medium text-[#1A1A1A] mb-2 group-hover:text-[#2D5BE3] transition-colors">
        {getProjectTitle(project, lang)}
      </h3>
      <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">
        {getProjectShortDescription(project, lang)}
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#FAF9F7] text-[#6B6B6B] border border-[#E8E6E1]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-xs font-medium text-[#2D5BE3]">
        <span>{t('projects.viewProjectCta')}</span>
        <svg
          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  )
}
