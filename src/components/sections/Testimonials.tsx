import { useTranslation } from 'react-i18next'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { Icon } from '../ui/Icon'
import { useContent } from '../../content'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-lime-accent-dark">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" size={16} className="fill-current" />
      ))}
    </div>
  )
}

export function Testimonials() {
  const { t } = useTranslation()
  const { testimonials } = useContent()
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow={t('testimonials.eyebrow')}
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
        align="center"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((item, i) => (
          <Reveal key={`${item.name}-${i}`} delay={i * 0.08}>
            <figure className="relative h-full rounded-2xl border border-ink/10 bg-white p-7 dark:border-white/10 dark:bg-white/3">
              <Stars count={item.rating} />
              <blockquote className="relative mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-violet-500 font-semibold text-white">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-ink dark:text-white">
                    {item.name}
                  </span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400">
                    {item.title}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
