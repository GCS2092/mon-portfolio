export type ProjectArchitecture = {
  description: string
  descriptionEn?: string
  diagram: string
}

export type ProjectTech = {
  name: string
  role: string
  roleEn?: string
  color: string
  description: string
  descriptionEn?: string
  how: string
  howEn?: string
  importance?: string
  importanceEn?: string
}

export type Project = {
  id: number
  slug: string
  title: string
  titleEn?: string
  year: string
  status?: string
  link: string
  repoUrl?: string
  tags: string[]
  shortDescription: string
  shortDescriptionEn?: string
  fullDescription: string
  fullDescriptionEn?: string
  architecture?: ProjectArchitecture
  stack?: ProjectTech[]
}
