import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from './Icon'
import type { MediaItem } from '../../content'

type LightboxProps = {
  media: MediaItem[]
  startIndex?: number
  title?: string
  onClose: () => void
}

// Accessible media viewer: images + video, prev/next, Esc/arrow keys,
// click-outside to close, scroll lock. Rendered in a portal above everything.
export function Lightbox({
  media,
  startIndex = 0,
  title,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(startIndex)
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

  const item = media[index]

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
