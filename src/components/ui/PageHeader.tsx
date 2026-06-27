import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Container, Eyebrow } from './Section'
import { GridPattern } from './GridPattern'

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/5 bg-slate-50 dark:border-white/5 dark:bg-white/[0.02]">
      <GridPattern className="opacity-60" />
      <Container className="relative py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="heading-display mt-4 text-4xl sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </Container>
    </section>
  )
}
