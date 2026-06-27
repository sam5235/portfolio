import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../components/ui/Seo'
import { Container } from '../components/ui/Section'
import { ButtonLink } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { SocialLinks } from '../components/ui/SocialLinks'
import { useContent } from '../content'
import { NotFound } from './NotFound'

const formatDate = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export function BlogPost() {
  const { t, i18n } = useTranslation()
  const { blog } = useContent()
  const { slug } = useParams()
  const post = slug ? blog.find((p) => p.slug === slug) : undefined

  if (!post) return <NotFound />

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      {/* Hero cover */}
      <div className="relative h-56 sm:h-72" style={{ background: post.cover }}>
        <div className="grid-dots absolute inset-0 text-white/25" />
      </div>

      <Container className="py-12 sm:py-16">
        <article className="mx-auto max-w-2xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-300"
          >
            <Icon name="arrow-right" size={16} className="rotate-180" />{' '}
            {t('actions.backToBlog')}
          </Link>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-700 dark:text-violet-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="heading-display mt-4 text-3xl sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {formatDate(post.date, i18n.language)} · {post.readingTime}
          </p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-8 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-ink dark:text-white">
                {t('blogPage.enjoyed')}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('blogPage.shareIt')}
              </p>
            </div>
            <SocialLinks />
          </div>

          <div className="mt-10 text-center">
            <ButtonLink to="/contact" variant="primary" size="lg" icon="arrow-right">
              {t('actions.workWithMe')}
            </ButtonLink>
          </div>
        </article>
      </Container>
    </>
  )
}
