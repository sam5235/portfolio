// Decorative dotted-grid panel backdrop, echoing the template illustrations.
export function GridPattern({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`grid-dots pointer-events-none absolute inset-0 text-violet-400/40 dark:text-violet-300/20 ${className}`}
    />
  )
}
