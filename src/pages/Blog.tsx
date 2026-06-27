import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../components/ui/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { useContent } from '../content'

const formatDate = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export function Blog() {
  const { t, i18n } = useTranslation()
  const { blog: posts } = useContent()
  return (
    <>
      <Seo
        title={t('nav.blog')}
        description={t('blogPage.subtitle')}
        path="/blog"
      />
      <PageHeader
        eyebrow={t('blogPage.eyebrow')}
        title={t('blogPage.title')}
        subtitle={t('blogPage.subtitle')}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div
                  className="relative aspect-[16/9]"
                  style={{ background: post.cover }}
                >
                  <div className="grid-dots absolute inset-0 text-white/30" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-700 dark:text-violet-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="heading-display mt-3 text-xl group-hover:text-violet-600 dark:group-hover:text-violet-300">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{formatDate(post.date, i18n.language)}</span>
                    <span className="inline-flex items-center gap-1">
                      {post.readingTime}
                      <Icon
                        name="arrow-right"
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
