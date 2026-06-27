// Abstract "developer workspace" illustration built from flat shapes in the
// template's violet / lime / ink palette. Pure SVG so it scales and themes
// cleanly — swap for your own art any time.
export function WorkspaceIllustration({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 420 360"
      className={className}
      role="img"
      aria-label="Illustration of a developer workspace"
    >
      <defs>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34507f" />
          <stop offset="1" stopColor="#1b2a47" />
        </linearGradient>
      </defs>

      {/* Browser window */}
      <g stroke="#0b1220" strokeWidth="3" strokeLinejoin="round">
        <rect x="40" y="40" width="300" height="200" rx="12" fill="#f4f5f8" />
        <path d="M40 70 H340" />
        <circle cx="62" cy="55" r="5" fill="#1b2a47" stroke="none" />
        <circle cx="80" cy="55" r="5" fill="#f97316" stroke="none" />
        <circle cx="98" cy="55" r="5" fill="#0b1220" stroke="none" />

        {/* Area chart */}
        <path
          d="M70 200 L70 160 Q110 110 150 150 Q190 190 230 130 Q270 90 320 120 L320 200 Z"
          fill="#f97316"
          opacity="0.9"
        />
        <path d="M70 160 Q110 110 150 150 Q190 190 230 130 Q270 90 320 120" fill="none" />

        {/* Bars */}
        <rect x="84" y="178" width="18" height="22" fill="#1b2a47" stroke="none" />
        <rect x="112" y="160" width="18" height="40" fill="#455f8a" stroke="none" />
        <rect x="140" y="170" width="18" height="30" fill="#1b2a47" stroke="none" />
      </g>

      {/* Laptop */}
      <g stroke="#0b1220" strokeWidth="3" strokeLinejoin="round">
        <rect x="150" y="240" width="160" height="100" rx="10" fill="url(#screen)" />
        <rect x="172" y="262" width="116" height="10" rx="5" fill="#f97316" stroke="none" />
        <rect x="172" y="284" width="80" height="8" rx="4" fill="#ffffff" opacity="0.8" stroke="none" />
        <rect x="172" y="302" width="100" height="8" rx="4" fill="#ffffff" opacity="0.6" stroke="none" />
      </g>

      {/* Floating accents */}
      <g stroke="#0b1220" strokeWidth="3">
        <circle cx="360" cy="90" r="16" fill="#f97316" />
        <rect
          x="20"
          y="180"
          width="40"
          height="40"
          rx="8"
          fill="#1b2a47"
          transform="rotate(-12 40 200)"
        />
        <path d="M348 250 l10 10 l16 -24" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}
