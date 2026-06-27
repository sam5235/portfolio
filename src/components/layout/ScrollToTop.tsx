import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll position on route change (skips in-page hash links).
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}
