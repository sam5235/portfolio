import type { ReactNode } from 'react'

type Kind = 'web' | 'mobile' | 'dashboard' | 'ai'

const INK = '#0b1220'
const NAVY = '#1b2a47'
const NAVY2 = '#34507f'
const ORANGE = '#f97316'
const PANEL = '#ffffff'
const PANEL2 = '#eef1f7'

// Browser chrome shared by web/dashboard/ai variants.
function Chrome({ children }: { children: ReactNode }) {
  return (
    <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
      <rect x="8" y="10" width="304" height="180" rx="12" fill={PANEL} />
      <path d="M8 36 H312" />
      <circle cx="26" cy="23" r="3.5" fill={ORANGE} stroke="none" />
      <circle cx="40" cy="23" r="3.5" fill={NAVY2} stroke="none" />
      <circle cx="54" cy="23" r="3.5" fill={INK} stroke="none" />
      <rect x="80" y="18" width="200" height="10" rx="5" fill={PANEL2} stroke="none" />
      {children}
    </g>
  )
}

function WebMock() {
  return (
    <Chrome>
      {/* hero split */}
      <rect x="24" y="52" width="120" height="118" rx="8" fill={NAVY} stroke="none" />
      <rect x="36" y="68" width="64" height="8" rx="4" fill="#ffffff" opacity="0.9" stroke="none" />
      <rect x="36" y="84" width="92" height="6" rx="3" fill="#ffffff" opacity="0.5" stroke="none" />
      <rect x="36" y="96" width="80" height="6" rx="3" fill="#ffffff" opacity="0.5" stroke="none" />
      <rect x="36" y="118" width="56" height="18" rx="9" fill={ORANGE} stroke="none" />
      {/* right cards */}
      <rect x="158" y="52" width="130" height="54" rx="8" fill={PANEL2} stroke="none" />
      <circle cx="176" cy="70" r="8" fill={ORANGE} stroke="none" />
      <rect x="192" y="64" width="80" height="6" rx="3" fill={NAVY2} stroke="none" />
      <rect x="192" y="76" width="60" height="5" rx="2.5" fill={NAVY2} opacity="0.5" stroke="none" />
      <rect x="158" y="116" width="62" height="54" rx="8" fill={PANEL2} stroke="none" />
      <rect x="226" y="116" width="62" height="54" rx="8" fill={NAVY2} stroke="none" />
    </Chrome>
  )
}

function DashboardMock() {
  return (
    <Chrome>
      {/* sidebar */}
      <rect x="24" y="50" width="44" height="120" rx="8" fill={NAVY} stroke="none" />
      <rect x="33" y="62" width="26" height="6" rx="3" fill="#ffffff" opacity="0.85" stroke="none" />
      <rect x="33" y="76" width="26" height="6" rx="3" fill="#ffffff" opacity="0.4" stroke="none" />
      <rect x="33" y="90" width="26" height="6" rx="3" fill={ORANGE} stroke="none" />
      {/* stat tiles */}
      <rect x="80" y="50" width="62" height="30" rx="6" fill={PANEL2} stroke="none" />
      <rect x="150" y="50" width="62" height="30" rx="6" fill={PANEL2} stroke="none" />
      <rect x="220" y="50" width="68" height="30" rx="6" fill={ORANGE} stroke="none" />
      {/* bar chart */}
      <rect x="80" y="90" width="120" height="80" rx="8" fill={PANEL2} stroke="none" />
      <rect x="92" y="138" width="14" height="22" fill={NAVY} stroke="none" />
      <rect x="112" y="124" width="14" height="36" fill={NAVY2} stroke="none" />
      <rect x="132" y="132" width="14" height="28" fill={NAVY} stroke="none" />
      <rect x="152" y="116" width="14" height="44" fill={ORANGE} stroke="none" />
      <rect x="172" y="128" width="14" height="32" fill={NAVY2} stroke="none" />
      {/* line chart */}
      <rect x="208" y="90" width="80" height="80" rx="8" fill={NAVY} stroke="none" />
      <path d="M216 150 Q232 120 248 134 T284 104" fill="none" stroke={ORANGE} strokeWidth="3" />
    </Chrome>
  )
}

function AiMock() {
  return (
    <Chrome>
      {/* assistant bubble */}
      <rect x="28" y="52" width="150" height="34" rx="10" fill={PANEL2} stroke="none" />
      <rect x="40" y="62" width="110" height="6" rx="3" fill={NAVY2} stroke="none" />
      <rect x="40" y="73" width="80" height="6" rx="3" fill={NAVY2} opacity="0.5" stroke="none" />
      {/* user bubble */}
      <rect x="150" y="96" width="138" height="30" rx="10" fill={NAVY} stroke="none" />
      <rect x="162" y="106" width="100" height="6" rx="3" fill="#ffffff" opacity="0.85" stroke="none" />
      {/* assistant bubble 2 */}
      <rect x="28" y="136" width="120" height="24" rx="10" fill={PANEL2} stroke="none" />
      <rect x="40" y="145" width="84" height="6" rx="3" fill={NAVY2} stroke="none" />
      {/* sparkle */}
      <path
        d="M276 52 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z"
        fill={ORANGE}
        stroke="none"
      />
      {/* input bar */}
      <rect x="28" y="170" width="232" height="14" rx="7" fill={PANEL2} stroke="none" />
      <circle cx="278" cy="177" r="9" fill={ORANGE} stroke="none" />
    </Chrome>
  )
}

function MobileMock() {
  return (
    <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
      <rect x="110" y="14" width="100" height="172" rx="18" fill={PANEL} />
      <rect x="138" y="20" width="44" height="6" rx="3" fill={PANEL2} stroke="none" />
      {/* header */}
      <rect x="122" y="36" width="76" height="34" rx="8" fill={NAVY} stroke="none" />
      <rect x="132" y="46" width="40" height="6" rx="3" fill="#ffffff" opacity="0.9" stroke="none" />
      <rect x="132" y="57" width="30" height="5" rx="2.5" fill="#ffffff" opacity="0.5" stroke="none" />
      {/* list */}
      <rect x="122" y="78" width="76" height="20" rx="6" fill={PANEL2} stroke="none" />
      <circle cx="134" cy="88" r="5" fill={ORANGE} stroke="none" />
      <rect x="122" y="104" width="76" height="20" rx="6" fill={PANEL2} stroke="none" />
      <circle cx="134" cy="114" r="5" fill={NAVY2} stroke="none" />
      <rect x="122" y="130" width="76" height="20" rx="6" fill={PANEL2} stroke="none" />
      <circle cx="134" cy="140" r="5" fill={NAVY2} stroke="none" />
      {/* bottom nav */}
      <rect x="122" y="160" width="76" height="16" rx="8" fill={NAVY} stroke="none" />
      <circle cx="140" cy="168" r="3" fill={ORANGE} stroke="none" />
      <circle cx="160" cy="168" r="3" fill="#ffffff" opacity="0.6" stroke="none" />
      <circle cx="180" cy="168" r="3" fill="#ffffff" opacity="0.6" stroke="none" />
    </g>
  )
}

const variants: Record<Kind, () => ReactNode> = {
  web: WebMock,
  dashboard: DashboardMock,
  ai: AiMock,
  mobile: MobileMock,
}

export function ProjectIllustration({
  kind = 'web',
  className = '',
}: {
  kind?: Kind
  className?: string
}) {
  const Variant = variants[kind]
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      role="img"
      aria-label={`${kind} project preview`}
    >
      <Variant />
    </svg>
  )
}
