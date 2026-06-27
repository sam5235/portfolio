import { useContent } from '../../content'

type SeoProps = {
  title: string
  description?: string
  path?: string
  /** Page image (absolute or site-relative); defaults to the site OG image. */
  image?: string
  /** Open Graph type — 'website' for pages, 'article' for blog posts. */
  type?: 'website' | 'article' | 'profile'
  /** Set true on pages that shouldn't be indexed (e.g. 404). */
  noindex?: boolean
  /** Extra keywords merged with the site defaults. */
  keywords?: string[]
  /** Article metadata (only used when type === 'article'). */
  publishedTime?: string
  articleTags?: string[]
}

// React 19 hoists <title>/<meta>/<link>/<script> rendered anywhere into <head>,
// so we declare document metadata natively (no helmet dependency).
export function Seo({
  title,
  description,
  path = '',
  image,
  type = 'website',
  noindex = false,
  keywords = [],
  publishedTime,
  articleTags = [],
}: SeoProps) {
  const { profile } = useContent()
  const { siteUrl, ogImage, twitter } = profile.seo

  const fullTitle = `${title} — ${profile.name}`
  const desc = description ?? profile.intro
  const base = siteUrl.replace(/\/$/, '')
  const url = `${base}${path}`
  const absImage = /^https?:\/\//.test(image ?? ogImage)
    ? (image ?? ogImage)
    : `${base}${image ?? ogImage}`
  const allKeywords = [...profile.seo.keywords, ...keywords].join(', ')
  const sameAs = profile.socials
    .map((s) => s.url)
    .filter((u) => /^https?:\/\//.test(u))

  // Person structured data for rich results.
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: profile.intro,
    url: base,
    image: absImage,
    email: `mailto:${profile.email}`,
    address: profile.location,
    sameAs,
    knowsAbout: profile.seo.keywords,
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={profile.name} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow'}
      />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${profile.name} — ${profile.role}`} />
      <meta property="og:locale" content="en_US" />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' &&
        articleTags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={absImage} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
    </>
  )
}
