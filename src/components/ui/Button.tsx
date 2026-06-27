import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0f1a] disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-violet-500 text-white hover:bg-violet-600 active:scale-[0.98] shadow-sm shadow-violet-900/30 dark:ring-1 dark:ring-inset dark:ring-white/10',
  accent:
    'bg-lime-accent text-ink hover:bg-lime-accent-dark active:scale-[0.98] shadow-sm shadow-lime-accent/40',
  outline:
    'border-2 border-ink text-ink hover:bg-ink hover:text-white dark:border-white/80 dark:text-white dark:hover:bg-white dark:hover:text-ink',
  ghost:
    'text-slate-600 hover:text-ink dark:text-slate-300 dark:hover:text-white',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  icon?: IconName
  iconPosition?: 'left' | 'right'
  children: ReactNode
  className?: string
}

function Inner({
  icon,
  iconPosition = 'right',
  children,
}: Pick<CommonProps, 'icon' | 'iconPosition' | 'children'>) {
  return (
    <>
      {icon && iconPosition === 'left' && <Icon name={icon} size={18} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size={18} />}
    </>
  )
}

// twMerge resolves conflicting Tailwind utilities (e.g. base `inline-flex` vs a
// passed `hidden`), keeping the last — so caller `className` always wins.
const cn = (...parts: (string | undefined | false)[]) => twMerge(...parts)

// Internal route link
export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition,
  className,
  children,
}: CommonProps & { to: string }) {
  return (
    <Link
      to={to}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <Inner icon={icon} iconPosition={iconPosition}>
        {children}
      </Inner>
    </Link>
  )
}

// External anchor
export function ButtonAnchor({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition,
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<'a'>) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <Inner icon={icon} iconPosition={iconPosition}>
        {children}
      </Inner>
    </a>
  )
}

// Plain button
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition,
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <Inner icon={icon} iconPosition={iconPosition}>
        {children}
      </Inner>
    </button>
  )
}
