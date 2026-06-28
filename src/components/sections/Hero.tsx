import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useContent } from '../../content'
import { ButtonAnchor, ButtonLink } from '../ui/Button'
import { SocialLinks } from '../ui/SocialLinks'
import { GridPattern } from '../ui/GridPattern'
import { ParticlesBackground } from '../ui/ParticlesBackground'
import { Tilt } from '../ui/Tilt'
import { WorkspaceIllustration } from '../illustrations/WorkspaceIllustration'

export function Hero() {
  const { t } = useTranslation()
  const { profile } = useContent()
  return (
    <section className="relative overflow-hidden">
      <ParticlesBackground />
      {/* Soft radial glows for depth behind the particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-lime-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:py-24">
        {/* Illustration panel */}
        <motion.div
          initial={{ opacity: 1, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-last lg:order-first hidden sm:block"
        >
          <Tilt className="glass relative overflow-hidden rounded-3xl p-6 shadow-xl shadow-violet-900/5">
            <GridPattern />
            <WorkspaceIllustration className="relative mx-auto w-full max-w-md transform-[translateZ(40px)]" />
          </Tilt>
        </motion.div>

        {/* Copy */}
        <div className="relative">
          <SocialLinks className="mb-6" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="heading-display text-4xl sm:text-5xl lg:text-[3.4rem]"
          >
            {t('hero.greeting', { name: profile.name.split(' ')[0] })}{' '}
            <span className="font-extrabold text-lime-accent-dark">
              {profile.role}
            </span>{' '}
            {t('hero.tail')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {profile.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink to="/projects" variant="primary" size="lg" icon="arrow-right">
              {t('actions.viewMyWork')}
            </ButtonLink>
            <ButtonAnchor
              href={profile.cvUrl}
              download
              variant="accent"
              size="lg"
              icon="download"
              iconPosition="left"
            >
              {t('hero.downloadCv')}
            </ButtonAnchor>
          </motion.div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <dt className="heading-display text-2xl text-violet-500 dark:text-violet-200">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
