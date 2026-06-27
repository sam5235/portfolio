import { useTranslation } from 'react-i18next'
import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { ButtonAnchor } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Timeline } from '../components/sections/Timeline'
import { useContent } from '../content'

export function Experience() {
  const { t } = useTranslation()
  const { profile, experience } = useContent()
  const { experiences, education, certifications } = experience
  return (
    <>
      <Seo
        title={t('nav.experience')}
        description={t('experiencePage.subtitle')}
        path="/experience"
      />
      <PageHeader
        eyebrow={t('experiencePage.eyebrow')}
        title={t('experiencePage.title')}
        subtitle={t('experiencePage.subtitle')}
      >
        <ButtonAnchor
          href={profile.cvUrl}
          download
          variant="accent"
          size="md"
          icon="download"
          iconPosition="left"
        >
          {t('experiencePage.downloadFullCv')}
        </ButtonAnchor>
      </PageHeader>

      <Section>
        <Timeline experiences={experiences} />

        {/* Education & certs */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <h3 className="heading-display text-lg">
                {t('experiencePage.education')}
              </h3>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="font-semibold text-ink dark:text-white">
                      {e.degree}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {e.school}
                      {e.period ? ` · ${e.period}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {certifications.length > 0 && (
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <h3 className="heading-display text-lg">
                  {t('experiencePage.certifications')}
                </h3>
                <ul className="mt-4 space-y-3">
                  {certifications.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <Icon
                        name="check"
                        size={18}
                        className="mt-0.5 shrink-0 text-lime-accent-dark"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </Section>
    </>
  )
}
