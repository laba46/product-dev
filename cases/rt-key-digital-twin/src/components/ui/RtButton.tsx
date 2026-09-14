export type RtButtonVariant = 'primary' | 'secondary' | 'ghost'

export type RtButtonActionState = 'default' | 'loading' | 'success' | 'error'

export type RtButtonProps = {
  label: string
  onClick?: () => void
  variant?: RtButtonVariant
  actionState?: RtButtonActionState
  disabled?: boolean
  fullWidth?: boolean
}

function resolveClasses(
  variant: RtButtonVariant,
  actionState: RtButtonActionState,
  disabled: boolean,
  fullWidth: boolean,
): string {
  const base = 'rounded-md px-lg py-card text-app-subtitle font-semibold transition-opacity'

  const colorClass =
    actionState === 'success'
      ? 'bg-success text-surface'
      : actionState === 'error'
        ? 'bg-error text-surface'
        : variant === 'primary'
          ? 'bg-primary text-surface'
          : variant === 'secondary'
            ? 'border border-primary text-primary bg-surface'
            : 'text-primary bg-transparent'

  const stateClass =
    actionState === 'loading' || (disabled && actionState === 'default')
      ? 'opacity-60 cursor-not-allowed'
      : ''

  const widthClass = fullWidth ? 'w-full' : ''

  return [base, colorClass, stateClass, widthClass].filter(Boolean).join(' ')
}

function resolveLabel(label: string, actionState: RtButtonActionState): string {
  if (actionState === 'loading') return 'Загрузка...'
  if (actionState === 'success') return `✓ ${label}`
  if (actionState === 'error') return `✗ ${label}`
  return label
}

export function RtButton({
  label,
  onClick,
  variant = 'primary',
  actionState = 'default',
  disabled = false,
  fullWidth = false,
}: RtButtonProps) {
  const isInteractive = actionState === 'default' && !disabled

  return (
    <button
      onClick={isInteractive ? onClick : undefined}
      disabled={!isInteractive}
      className={resolveClasses(variant, actionState, disabled, fullWidth)}
    >
      {resolveLabel(label, actionState)}
    </button>
  )
}
