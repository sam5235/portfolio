import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContent } from '../../content'
import { ButtonAnchor } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { Logo } from '../ui/Logo'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/experience', key: 'nav.experience' },
  { to: '/blog', key: 'nav.blog' },
  { to: '/contact', key: 'nav.contact' },
]

export function Navbar() {
  const { t } = useTranslation()
  const { profile } = useContent()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-ink dark:text-white'
        : 'text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-ink/5 bg-white/50 backdrop-blur-xs backdrop-saturate-180 dark:border-white/10 dark:bg-[#0a0f1a]/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo className="text-lg" />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
              {t(l.key)}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonAnchor
            href={profile.cvUrl}
            download
            variant="accent"
            size="sm"
            icon="download"
            iconPosition="left"
            className="hidden sm:inline-flex"
          >
            {t('nav.downloadCv')}
          </ButtonAnchor>
        </div>
      </nav>
    </header>
  )
}
