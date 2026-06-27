import { useTranslation } from 'react-i18next'
import { Seo } from '../components/ui/Seo'
import { Container } from '../components/ui/Section'
import { ButtonLink } from '../components/ui/Button'
import { GridPattern } from '../components/ui/GridPattern'

export function NotFound() {
  const { t } = useTranslation()
  return (
    <>
      <Seo title={t('notFound.title')} />
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <GridPattern className="opacity-50" />
        <Container className="relative text-center">
          <p className="heading-display text-7xl text-lime-accent-dark sm:text-9xl">
            {t('notFound.code')}
          </p>
          <h1 className="heading-display mt-4 text-3xl sm:text-4xl">
            {t('notFound.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-slate-600 dark:text-slate-400">
            {t('notFound.text')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/" variant="primary" size="lg" icon="arrow-right">
              {t('actions.backHome')}
            </ButtonLink>
            <ButtonLink to="/projects" variant="outline" size="lg">
              {t('actions.seeProjects')}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
