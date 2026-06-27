import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'motion/react'
import type { Project } from '../../content'
import { Icon } from './Icon'
import { Lightbox } from './Lightbox'
import { ProjectIllustration } from '../illustrations/ProjectIllustration'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const [lightbox, setLightbox] = useState(false)
  const media = project.media ?? []
  const hasMedia = media.length > 0
  const hasVideo = media.some((m) => m.type === 'video')

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/[0.03]">
      {/* Cover */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ background: project.cover }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div className="grid-dots absolute inset-0 text-white/25" />
            <ProjectIllustration
              kind={project.kind}
              className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2 translate-y-3 drop-shadow-2xl transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-[1.03]"
            />
          </>
        )}

        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
          {project.category}
        </span>
        <span className="absolute right-4 top-4 z-10 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.year}
        </span>

        {hasMedia ? (
          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label={`${t('actions.preview')} — ${project.title}`}
            className="group/preview absolute inset-0 z-10 flex items-center justify-center bg-ink/0 transition-colors duration-300 hover:bg-ink/30"
          >
            <span className="flex size-14 scale-90 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 shadow-lg transition duration-300 group-hover/preview:scale-100 group-hover/preview:opacity-100">
              <Icon name={hasVideo ? 'play' : 'maximize'} size={22} />
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {media.length} {hasVideo ? '▶' : '◳'}
            </span>
          </button>
        ) : (
          <Icon
            name="arrow-up-right"
            size={28}
            className="absolute bottom-4 right-4 z-10 text-white opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="heading-display text-xl">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-4 border-t border-ink/5 pt-4 text-sm font-semibold dark:border-white/5">
          {hasMedia && (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 dark:text-violet-300"
            >
              <Icon name={hasVideo ? 'play' : 'maximize'} size={16} />{' '}
              {t('actions.preview')}
            </button>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 dark:text-violet-300"
            >
              <Icon name="external" size={16} /> {t('actions.liveDemo')}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-ink dark:text-slate-300 dark:hover:text-white"
            >
              <Icon name="github" size={16} /> {t('actions.code')}
            </a>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            media={media}
            title={project.title}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </article>
  )
}
