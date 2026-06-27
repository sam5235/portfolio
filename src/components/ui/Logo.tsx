import { Link } from 'react-router-dom'
import { useContent } from '../../content'

type LogoProps = {
  /** Extra classes on the link (font size + text color). */
  className?: string
  /** Heading font utility — `heading-display` (default) or `heading-footer`. */
  headingClass?: string
  /** Color of the trailing accent dot. */
  accentClass?: string
  /** Extra classes for the favicon mark (e.g. a border on similar backgrounds). */
  markClassName?: string
  onClick?: () => void
}

// Brand mark (favicon) + wordmark, linking home. Shared by Navbar and Footer.
export function Logo({
  className = '',
  headingClass = 'heading-display',
  accentClass = 'text-lime-accent',
  markClassName = '',
  onClick,
}: LogoProps) {
  const { profile } = useContent()
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={profile.name}
      className={`${headingClass} flex items-center gap-2 ${className}`}
    >
      <img
        src="/favicon.svg"
        alt=""
        width={32}
        height={32}
        className={`size-8 shrink-0 ${markClassName}`}
      />
      {profile.name.split(' ')[0]}
      <span className={accentClass}>.</span>
    </Link>
  )
}
