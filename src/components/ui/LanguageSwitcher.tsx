import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { languages } from '../../i18n/config'
import { Icon } from './Icon'

// Globe dropdown that switches the active language. Drives both UI strings
// (i18next) and the personal content bundle (useContent reads i18n.language).
export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = i18n.language?.split('-')[0] ?? 'en'

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('language')}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-full border border-ink/15 px-3 text-sm font-medium text-ink transition-colors hover:border-ink dark:border-white/15 dark:text-white dark:hover:border-white"
      >
        <Icon name="globe" size={18} />
        <span className="uppercase">{current}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="glass-strong absolute right-0 z-50 mt-2 min-w-36 overflow-hidden rounded-xl p-1 shadow-xl"
          >
            {languages.map((l) => {
              const active = l.code === current
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      i18n.changeLanguage(l.code)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-violet-500/10 font-semibold text-violet-600 dark:text-violet-300'
                        : 'text-slate-600 hover:bg-ink/5 dark:text-slate-300 dark:hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                    {active && <Icon name="check" size={16} />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
