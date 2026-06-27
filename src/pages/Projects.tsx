import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { ProjectCard } from '../components/ui/ProjectCard'
import { useContent, type Project } from '../content'

const categories = ['All', 'Upwork', 'Client', 'Personal', 'Open Source'] as const
type Filter = (typeof categories)[number]

export function Projects() {
  const { t } = useTranslation()
  const { projects } = useContent()
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo<Project[]>(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  )

  return (
    <>
      <Seo
        title={t('nav.projects')}
        description={t('projectsPage.subtitle')}
        path="/projects"
      />
      <PageHeader
        eyebrow={t('projectsPage.eyebrow')}
        title={t('projectsPage.title')}
        subtitle={t('projectsPage.subtitle')}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === c
                  ? 'bg-violet-500 text-white'
                  : 'border border-ink/15 text-slate-600 hover:border-ink dark:border-white/15 dark:text-slate-300 dark:hover:border-white'
              }`}
            >
              {t(`projectsPage.filters.${c}`)}
            </button>
          ))}
        </div>
      </PageHeader>

      <Section>
        {filtered.length === 0 ? (
          <p className="text-center text-slate-500">{t('projectsPage.empty')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
