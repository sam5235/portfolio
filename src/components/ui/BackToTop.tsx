import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'

// Floating "scroll to top" control. Rendered by the Footer but fixed to the
// viewport; fades in once the user has scrolled past a threshold.
export function BackToTop() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label={t('actions.backToTop')}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -3 }}
          className="fixed bottom-28 right-6 z-20 flex size-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg shadow-violet-900/30 ring-1 dark:ring-white/55 transition-colors hover:bg-violet-600 md:bottom-6"
        >
          <Icon name="arrow-up" size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
