import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import type { Project } from '../../content'

// Project detail dialog: description, tags and merged pull requests.
// Esc / click-outside to close, scroll lock, rendered in a portal.
export function ProjectDetails({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const { t } = useTranslation()
  const contributions = project.contributions ?? []

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${project.slug}-details-title`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl border border-ink/10 bg-white p-6 shadow-2xl sm:p-8 dark:border-white/10 dark:bg-violet-900"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Icon name="close" size={20} />
        </button>

        <div className="flex flex-wrap gap-2 pr-12 text-xs font-semibold">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-ink dark:bg-white/10 dark:text-white">
            {project.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 dark:bg-white/10 dark:text-slate-300">
            {project.year}
          </span>
        </div>
        <h2
          id={`${project.slug}-details-title`}
          className="heading-display mt-4 text-2xl"
        >
          {project.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        {contributions.length > 0 && (
          <div className="mt-6 border-t border-ink/5 pt-5 dark:border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t('projectsPage.mergedPrs')} ({contributions.length})
            </h3>
            <ul className="mt-3 space-y-2">
              {contributions.map((pr) => (
                <li key={pr.url}>
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 rounded-xl border border-ink/10 p-3 text-sm transition-colors hover:border-violet-300 hover:bg-violet-100/40 dark:border-white/10 dark:hover:border-white/25 dark:hover:bg-white/5"
                  >
                    <Icon
                      name="github"
                      size={16}
                      className="mt-0.5 shrink-0 text-slate-500 dark:text-slate-400"
                    />
                    <span className="flex-1 text-ink dark:text-slate-200">
                      <span className="font-semibold text-violet-600 dark:text-violet-300">
                        #{pr.url.split('/').pop()}
                      </span>{' '}
                      {pr.title}
                    </span>
                    <Icon
                      name="external"
                      size={14}
                      className="mt-1 shrink-0 text-slate-400"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-6 flex gap-4 text-sm font-semibold">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 dark:text-violet-300 dark:hover:text-violet-100"
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
        )}
      </motion.div>
    </motion.div>,
    document.body,
  )
}
