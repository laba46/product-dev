import type { ReactNode } from 'react'

type RtHeaderAction = {
  ariaLabel: string
  onClick?: () => void
  icon: ReactNode
}

type RtHeaderProps = {
  title: string
  onBack?: () => void
  actions?: RtHeaderAction[]
}

export function RtHeader({ title, onBack, actions = [] }: RtHeaderProps) {
  if (onBack) {
    return (
      <header className="flex items-center gap-md pb-xxs">
        <button
          onClick={onBack}
          aria-label="Назад"
          className="flex h-8 w-8 items-center justify-center rounded-full text-app-body text-primary"
        >
          ←
        </button>
        <h1 className="text-app-section font-bold text-text-primary">{title}</h1>
      </header>
    )
  }

  return (
    <header className="flex items-center justify-between pb-xxs">
      <h1 className="text-app-hero font-bold text-text-primary">{title}</h1>
      {actions.length > 0 ? (
        <div className="flex items-center gap-compact">
          {actions.map((action) => (
            <button
              key={action.ariaLabel}
              onClick={action.onClick}
              aria-label={action.ariaLabel}
              className="flex h-8 w-8 items-center justify-center"
            >
              {action.icon}
            </button>
          ))}
        </div>
      ) : (
        <div />
      )}
    </header>
  )
}
