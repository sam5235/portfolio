import type { IconName } from '../components/ui/Icon'

export type Social = { name: string; url: string; icon: IconName }
export type Stat = { label: string; value: string }

export type Profile = {
  name: string
  role: string
  headline: string
  tagline: string
  intro: string
  about: string
  location: string
  email: string
  cvUrl: string
  calendlyUrl: string
  formspreeEndpoint: string
  stats: Stat[]
  whyMe: string[]
  socials: Social[]
  seo: {
    siteUrl: string
    ogImage: string
    twitter: string
    keywords: string[]
  }
}

export type Service = {
  title: string
  description: string
  icon: IconName
  highlights: string[]
}

export type Tech = { name: string; slug: string }

export type ProjectCategory = 'Upwork' | 'Client' | 'Personal' | 'Open Source'

export type MediaItem = {
  type: 'image' | 'video'
  /** Image URL, or for video a self-hosted file / direct mp4 URL. */
  src: string
  /** Optional poster/thumbnail (recommended for video). */
  thumbnail?: string
  alt?: string
}

export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  tags: string[]
  category: ProjectCategory
  year: number
  featured: boolean
  /** Visual style for the generated card illustration (fallback when no thumbnail). */
  kind?: 'web' | 'mobile' | 'dashboard' | 'ai'
  /** Real cover screenshot (filename in src/assets/projects); falls back to the SVG mock. */
  thumbnail?: string
  liveUrl?: string
  repoUrl?: string
  cover: string
  media?: MediaItem[]
}

export type Experience = {
  role: string
  company: string
  type: 'Full-time' | 'Contract' | 'Freelance'
  period: string
  location: string
  description: string
  highlights: string[]
  tech: string[]
}

export type Education = { degree: string; school: string; period: string }

export type ExperienceData = {
  experiences: Experience[]
  education: Education[]
  certifications: string[]
}

export type Testimonial = {
  quote: string
  name: string
  title: string
  rating: number
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
  cover: string
  content: string[]
}

export type ContentBundle = {
  profile: Profile
  services: Service[]
  tech: Tech[]
  projects: Project[]
  experience: ExperienceData
  testimonials: Testimonial[]
  blog: BlogPost[]
}
