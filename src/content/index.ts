import { useTranslation } from 'react-i18next'
import type { ContentBundle, Project } from './types'
import { resolveAsset } from './mediaAssets'

import profile from './en/profile.json'
import services from './en/services.json'
import tech from './en/tech.json'
import projectsRaw from './en/projects.json'
import experience from './en/experience.json'
import testimonials from './en/testimonials.json'
import blog from './en/blog.json'

// Swap JSON media filenames for hashed asset URLs (see ./mediaAssets). Media
// whose file can't be found is dropped so the UI never points at a 404.
function resolveProjectMedia(list: Project[]): Project[] {
  return list.map((p) => ({
    ...p,
    thumbnail: resolveAsset(p.thumbnail),
    media: p.media
      ?.map((m) => ({
        ...m,
        src: resolveAsset(m.src),
        thumbnail: resolveAsset(m.thumbnail),
      }))
      .filter((m): m is typeof m & { src: string } => Boolean(m.src)),
  }))
}

// JSON is structurally validated against ContentBundle here. To add a language,
// create src/content/<lng>/*.json and register a bundle below — no other code
// changes needed.
const en = {
  profile,
  services,
  tech,
  projects: resolveProjectMedia(projectsRaw as unknown as Project[]),
  experience,
  testimonials,
  blog,
} as unknown as ContentBundle

const bundles: Record<string, ContentBundle> = { en }

/** Get the content bundle for a language code (falls back to English). */
export function getContent(lng?: string): ContentBundle {
  const base = lng?.split('-')[0]
  return (base && bundles[base]) || bundles.en
}

/** React hook: content for the currently active language. */
export function useContent(): ContentBundle {
  const { i18n } = useTranslation()
  return getContent(i18n.language)
}

export type { ContentBundle } from './types'
export * from './types'
