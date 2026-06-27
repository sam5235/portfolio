import { useTranslation } from 'react-i18next'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { ButtonLink } from '../ui/Button'
import { ProjectCard } from '../ui/ProjectCard'
import { useContent } from '../../content'

export function FeaturedProjects() {
  const { t } = useTranslation()
  const { projects } = useContent()
  const featured = projects.filter((p) => p.featured)
  return (
    <Section id="work" className="bg-slate-50 dark:bg-white/[0.02]">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow={t('featured.eyebrow')}
          title={t('featured.title')}
          subtitle={t('featured.subtitle')}
        />
        <Reveal>
          <ButtonLink to="/projects" variant="outline" size="md" icon="arrow-right">
            {t('actions.allProjects')}
          </ButtonLink>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
