import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { Button, ButtonAnchor } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { Icon } from '../components/ui/Icon'
import { useContent } from '../content'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const field =
  'w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/[0.03] dark:text-white'

export function Contact() {
  const { t } = useTranslation()
  const { profile } = useContent()
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('submitting')
    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo
        title={t('nav.contact')}
        description={t('contact.subtitle')}
        path="/contact"
      />
      <PageHeader
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info column */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-2xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <h3 className="heading-display text-lg">{t('contact.getInTouch')}</h3>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
                      <Icon name="mail" size={18} />
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-slate-700 hover:text-violet-600 dark:text-slate-300"
                    >
                      {profile.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
                      <Icon name="map-pin" size={18} />
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {profile.location}
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t('contact.findMeOnline')}
                  </p>
                  <SocialLinks />
                </div>
              </div>

              <div className="rounded-2xl bg-violet-500 p-6 text-white">
                <h3 className="text-lg text-white">
                  {t('contact.preferToTalkTitle')}
                </h3>
                <p className="mt-2 text-sm text-violet-100">
                  {t('contact.preferToTalkText')}
                </p>
                <ButtonAnchor
                  href={profile.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="accent"
                  size="md"
                  icon="calendar"
                  iconPosition="left"
                  className="mt-4"
                >
                  {t('actions.bookACall')}
                </ButtonAnchor>
              </div>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                    {t('contact.name')}
                  </span>
                  <input
                    name="name"
                    required
                    placeholder={t('contact.namePlaceholder')}
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                    {t('contact.email')}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t('contact.emailPlaceholder')}
                    className={field}
                  />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                  {t('contact.subject')}
                </span>
                <input
                  name="subject"
                  placeholder={t('contact.subjectPlaceholder')}
                  className={field}
                />
              </label>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-medium text-ink dark:text-white">
                  {t('contact.message')}
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={t('contact.messagePlaceholder')}
                  className={`${field} resize-y`}
                />
              </label>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  icon="arrow-right"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? t('actions.sending')
                    : t('actions.sendMessage')}
                </Button>
                {status === 'success' && (
                  <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <Icon name="check" size={18} /> {t('contact.success')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    {t('contact.error', { email: profile.email })}
                  </p>
                )}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                {t('contact.formspreeNote')}
              </p>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
