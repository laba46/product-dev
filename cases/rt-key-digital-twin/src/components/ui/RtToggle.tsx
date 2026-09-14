type RtToggleProps = {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  ariaLabel: string
}

export function RtToggle({ checked, onChange, disabled = false, ariaLabel }: RtToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors ${
        checked ? 'bg-primary/25' : 'bg-black/18'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <span
        className={`absolute h-9 w-9 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-transform ${
          checked ? 'translate-x-7 bg-primary' : 'translate-x-0 bg-white'
        }`}
      />
    </button>
  )
}
