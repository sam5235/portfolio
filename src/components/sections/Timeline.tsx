import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'
import type { Experience } from '../../content'

// A marker that lights up as the scroll-driven line reaches its position.
function TimelineDot({
  progress,
  at,
}: {
  progress: MotionValue<number>
  at: number
}) {
  const fill = useTransform(progress, [at - 0.04, at], [0, 1])
  const active = useTransform(progress, [at - 0.04, at], [0, 1])
  return (
    <span className="absolute -left-[33px] top-1.5 size-4 sm:-left-[41px]">
      {/* base ring (masks the line behind it) */}
      <span className="absolute inset-0 rounded-full border-2 border-ink/20 bg-white dark:border-white/20 dark:bg-[#0a0f1a]" />
      {/* active ring */}
      <motion.span
        style={{ opacity: active }}
        className="absolute inset-0 rounded-full border-2 border-violet-500"
      />
      {/* inner dot grows in */}
      <motion.span
        style={{ scale: fill }}
        className="absolute inset-[5px] rounded-full bg-violet-500"
      />
    </span>
  )
}

export function Timeline({ experiences }: { experiences: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 55%'],
  })
  // Smooth the raw scroll progress so the line glides rather than jitters.
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })

  const n = experiences.length

  return (
    <div ref={ref} className="relative pl-6 sm:pl-8">
      {/* static track */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-ink/10 dark:bg-white/10"
      />
      {/* scroll-driven fill */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-2 left-0 top-2 w-0.5 origin-top rounded-full bg-linear-to-b from-violet-500 to-lime-accent-dark"
      />

      <ol className="relative space-y-8">
        {experiences.map((exp, i) => (
          <li className="relative" key={`${exp.company}-${exp.period}`}>
            <TimelineDot progress={scaleY} at={n > 1 ? i / (n - 1) : 0} />
            <Reveal delay={i * 0.05}>
              <div className="rounded-2xl border border-ink/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="heading-display text-xl">{exp.role}</h3>
                    <p className="mt-0.5 font-medium text-violet-600 dark:text-violet-300">
                      {exp.company}
                    </p>
                  </div>
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
                    {exp.type}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="calendar" size={15} /> {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="map-pin" size={15} /> {exp.location}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {exp.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <Icon
                        name="check"
                        size={18}
                        className="mt-0.5 shrink-0 text-lime-accent-dark"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {exp.tech.map((techName) => (
                    <li
                      key={techName}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                    >
                      {techName}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}
