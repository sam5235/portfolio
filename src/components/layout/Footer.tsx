import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContent } from '../../content'
import { SocialLinks } from '../ui/SocialLinks'
import { ButtonAnchor, ButtonLink } from '../ui/Button'
import { GridPattern } from '../ui/GridPattern'
import { Logo } from '../ui/Logo'
import { BackToTop } from '../ui/BackToTop'

const nav = [
  { to: '/projects', key: 'nav.projects' },
  { to: '/experience', key: 'nav.experience' },
  { to: '/blog', key: 'nav.blog' },
  { to: '/contact', key: 'nav.contact' },
]

export function Footer() {
  const { t } = useTranslation()
  const { profile } = useContent()
  return (
    <footer className="mt-auto bg-violet-500 pb-28 text-white md:pb-0">
      <BackToTop />
      <div className="relative overflow-hidden">
        <GridPattern className="text-white/20" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          {/* CTA band */}
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/15 pb-12 md:flex-row md:items-center">
            <div>
              <h2 className="heading-footer text-3xl text-white sm:text-4xl">
                {t('footer.ctaTitle')}
              </h2>
              <p className="mt-2 max-w-md text-violet-100">
                {t('footer.ctaText')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="accent" size="lg" icon="arrow-right">
                {t('actions.startProject')}
              </ButtonLink>
              <ButtonAnchor
                href={profile.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="lg"
                icon="calendar"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-violet-600 dark:border-white dark:text-white"
              >
                {t('actions.bookACall')}
              </ButtonAnchor>
            </div>
          </div>

          {/* Lower row */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="sm:col-span-2">
              <Logo
                headingClass="heading-footer"
                className="text-xl text-white"
                markClassName="rounded-lg border border-white/25"
              />
              <p className="mt-3 max-w-xs text-sm text-violet-100">
                {profile.role} — {profile.tagline}
              </p>
              <SocialLinks className="mt-5 [&_a]:border-white/30 [&_a]:text-white [&_a:hover]:bg-white [&_a:hover]:text-violet-600" />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-200">
                {t('footer.navigation')}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {nav.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-violet-100 transition-colors hover:text-white"
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-200">
                {t('footer.getInTouch')}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-violet-100">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {profile.email}
                  </a>
                </li>
                <li>{profile.location}</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-violet-200 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name}. {t('footer.rights')}
            </p>
            <p>{t('footer.builtWith')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
