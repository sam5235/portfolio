import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Section, SectionHeading } from '../ui/Section'
import { useContent } from '../../content'
import { resolveTechIcon, type ResolvedTechIcon } from '../../content/techIcons'

// #rrggbb -> rgba() so we can apply the brand color at a chosen opacity.
function rgba(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function TechTile({ tech }: { tech: ResolvedTechIcon }) {
  // Per-tile vars: icon fill + a soft/strong brand-tinted shadow color.
  const vars = {
    '--brand': tech.brand,
    '--shadow-soft': rgba(tech.brand, 0.25),
    '--shadow-strong': rgba(tech.brand, 0.5),
  } as CSSProperties

  return (
    <div
      className="group/tile flex w-36 shrink-0 flex-col items-center gap-3"
      style={vars}
    >
      <div className="glass flex size-20 items-center justify-center rounded-2xl shadow-[0_10px_30px_-8px_var(--shadow-soft)] transition-all duration-300 group-hover/tile:-translate-y-1.5 group-hover/tile:shadow-[0_18px_45px_-8px_var(--shadow-strong)]">
        <svg
          viewBox="0 0 24 24"
          className="size-9 fill-ink/70 transition-colors duration-300 dark:fill-white/70"
          aria-hidden="true"
        >
          <path
            d={tech.path}
            className="transition-[fill] duration-300 group-hover/tile:[fill:var(--brand)]"
          />
        </svg>
      </div>
      <span className="text-sm font-medium text-slate-500 transition-colors group-hover/tile:text-ink dark:text-slate-400 dark:group-hover/tile:text-white">
        {tech.name}
      </span>
    </div>
  )
}

export function TechMarquee() {
  const { t } = useTranslation()
  const { tech } = useContent()
  // Resolve slugs to icons (skip any without a matching simple-icon).
  const icons = tech
    .map((item) => resolveTechIcon(item.slug, item.name))
    .filter((i): i is ResolvedTechIcon => i !== null)
  // Render the list twice so the -50% translate loops seamlessly.
  const row = [...icons, ...icons]

  return (
    <Section id="tech" className="bg-slate-50 dark:bg-white/[0.02]">
      <SectionHeading
        eyebrow={t('tech.eyebrow')}
        title={t('tech.title')}
        subtitle={t('tech.subtitle')}
        align="center"
      />

      <div className="marquee-group marquee-mask relative mt-14 overflow-hidden">
        <div className="animate-marquee flex w-max gap-4 py-2">
          {row.map((item, i) => (
            <TechTile key={`${item.name}-${i}`} tech={item} />
          ))}
        </div>
      </div>
    </Section>
  )
}
