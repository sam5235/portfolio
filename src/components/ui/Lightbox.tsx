import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import type { MediaItem } from '../../content'

type LightboxProps = {
  media: MediaItem[]
  startIndex?: number
  title?: string
  /** Builds a deep link to the item at `index`; enables the Share button. */
  getShareUrl?: (index: number) => string
  onClose: () => void
}

// Accessible media viewer: images + video, prev/next, Esc/arrow keys,
// click-outside to close, scroll lock. Rendered in a portal above everything.
export function Lightbox({
  media,
  startIndex = 0,
  title,
  getShareUrl,
  onClose,
}: LightboxProps) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(startIndex)
  const [copied, setCopied] = useState(false)
  const count = media.length

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  useEffect(() => setIndex(startIndex), [startIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, go])

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const item = media[index]

  // Native share sheet where available (mobile), otherwise copy the link.
  const share = async () => {
    if (!getShareUrl) return
    const url = getShareUrl(index)
    if (navigator.share) {
      try {
        await navigator.share({ title: item.alt ?? title, url })
        return
      } catch (err) {
        if ((err as DOMException).name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      window.prompt(t('actions.share'), url)
    }
  }

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Media viewer'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
      >
        <Icon name="close" size={22} />
      </button>

      {/* Share */}
      {getShareUrl && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            share()
          }}
          aria-label={t('actions.share')}
          className="absolute right-[4.25rem] top-4 z-10 flex h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          <Icon name={copied ? 'check' : 'share'} size={18} />
          <span aria-live="polite">
            {copied ? t('actions.linkCopied') : t('actions.share')}
          </span>
        </button>
      )}

      {/* Prev / Next */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:left-6"
          >
            <Icon name="arrow-right" size={22} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-6"
          >
            <Icon name="arrow-right" size={22} />
          </button>
        </>
      )}

      {/* Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-black shadow-2xl"
        >
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.alt ?? title ?? ''}
              className="max-h-[78vh] w-full object-contain"
            />
          ) : (
            <video
              src={item.src}
              poster={item.thumbnail}
              controls
              autoPlay
              playsInline
              className="max-h-[78vh] w-full bg-black object-contain"
            >
              <track kind="captions" />
            </video>
          )}
          {(item.alt || count > 1) && (
            <div className="flex items-center justify-between gap-4 bg-ink px-4 py-3 text-sm text-white/80">
              <span className="truncate">{item.alt ?? title}</span>
              {count > 1 && (
                <span className="shrink-0 text-white/60">
                  {index + 1} / {count}
                </span>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>,
    document.body,
  )
}
