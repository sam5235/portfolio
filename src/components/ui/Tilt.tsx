import { useRef, type ReactNode, type PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

type TiltProps = {
  children: ReactNode
  className?: string
  /** Max rotation in degrees at the edges. */
  max?: number
  /** Perspective distance in px — lower = stronger 3D. */
  perspective?: number
}

// Wrap any element to give it a smooth, spring-damped 3D tilt that follows the
// cursor. Falls back to a static container when the user prefers reduced motion.
export function Tilt({
  children,
  className,
  max = 12,
  perspective = 900,
}: TiltProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // 0..1 cursor position within the element; 0.5,0.5 is centered/rest.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const spring = { stiffness: 150, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
