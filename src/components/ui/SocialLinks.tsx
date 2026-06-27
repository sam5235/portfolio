import { useContent } from '../../content'
import { Icon } from './Icon'

export function SocialLinks({
  className = '',
  size = 18,
}: {
  className?: string
  size?: number
}) {
  const { profile } = useContent()
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {profile.socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.url}
            target={s.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={s.name}
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-ink"
          >
            <Icon name={s.icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  )
}
