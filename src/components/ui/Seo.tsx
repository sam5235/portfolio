import { useContent } from '../../content'

type SeoProps = {
  title: string
  description?: string
  path?: string
}

// React 19 hoists <title>/<meta> rendered anywhere into <head>, so we use
// native document metadata instead of an extra dependency.
export function Seo({ title, description, path = '' }: SeoProps) {
  const { profile } = useContent()
  const fullTitle = `${title} — ${profile.name}`
  const desc = description ?? profile.intro
  const url = `https://example.com${path}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </>
  )
}
