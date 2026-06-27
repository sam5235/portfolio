import { motion, type Variants } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Section, SectionHeading } from '../ui/Section'
import { Icon } from '../ui/Icon'
import { useContent, type Service } from '../../content'

// Card reveal — staggered per column. `custom` carries the grid index so the
// four cards in a row cascade. Children (the checkpoints) stagger after.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: (i % 4) * 0.07,
      staggerChildren: 0.05,
      delayChildren: (i % 4) * 0.07 + 0.18,
    },
  }),
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      // Only color/shadow transition via CSS — transform is owned by Motion so
      // the entrance/hover stay smooth (no CSS-vs-Motion transform conflict).
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/3 dark:hover:border-white/20"
    >
      {/* Soft brand glow that appears on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-violet-500/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/10"
      />

      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
        <Icon name={service.icon} size={24} />
      </span>

      <h3 className="heading-display mt-5 text-lg">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {service.description}
      </p>

      <ul className="mt-5 space-y-2.5 border-t border-ink/5 pt-4 dark:border-white/5">
        {service.highlights.map((h) => (
          <motion.li
            key={h}
            variants={itemVariants}
            className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime-accent/15 text-lime-accent-dark">
              <Icon name="check" size={13} />
            </span>
            {h}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function Services() {
  const { t } = useTranslation()
  const { services } = useContent()
  return (
    <Section id="services">
      <SectionHeading
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </Section>
  )
}
