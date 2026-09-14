import type { DeviceType } from '../../data/devices'

type DeviceActionCardProps = {
  title: string
  actionLabel: string
  deviceType: DeviceType
  isOnline?: boolean
  onClick?: () => void
}

function BarrierIcon() {
  return (
    <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="10" width="4" height="4" rx="1" />
      <line x1="6" y1="12" x2="22" y2="12" />
      <line x1="18" y1="12" x2="18" y2="18" />
      <line x1="15" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IntercomIcon() {
  return (
    <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <rect x="7" y="5" width="10" height="7" rx="1" />
      <circle cx="12" cy="16" r="2" />
    </svg>
  )
}

export function DeviceActionCard({
  title,
  actionLabel,
  deviceType,
  isOnline = true,
  onClick,
}: DeviceActionCardProps) {
  return (
    <article
      onClick={onClick}
      className={`rounded-xl border border-border bg-surface px-md py-md shadow-md ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="mb-md">
        {deviceType === 'barrier' ? <BarrierIcon /> : <IntercomIcon />}
      </div>
      <p className="text-app-card-title font-semibold text-text-primary">{title}</p>
      <p className={`text-app-body mt-compact font-medium ${isOnline ? 'text-primary' : 'text-text-muted'}`}>
        {isOnline ? actionLabel : 'Недоступно'}
      </p>
    </article>
  )
}
