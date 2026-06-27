import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from '../../context/ThemeContext'
import { Icon } from './Icon'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink dark:border-white/15 dark:text-white dark:hover:border-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <Icon name={isDark ? 'sun' : 'moon'} size={18} />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
