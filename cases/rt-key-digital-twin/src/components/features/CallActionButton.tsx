import type { ReactNode } from 'react'

type CallActionButtonTone = 'danger' | 'accent' | 'neutral' | 'dark'
type CallActionButtonSize = 'sm' | 'lg'

type CallActionButtonProps = {
  icon: ReactNode
  label?: string
  onClick?: () => void
  tone?: CallActionButtonTone
  size?: CallActionButtonSize
}

const toneClassMap: Record<CallActionButtonTone, string> = {
  danger: 'bg-[#ff3b30] text-white',
  accent: 'bg-primary text-white',
  neutral: 'bg-white text-text-primary',
  dark: 'bg-[#2a3767] text-white',
}

const sizeClassMap: Record<CallActionButtonSize, string> = {
  sm: 'h-14 w-14',
  lg: 'h-[72px] w-[72px]',
}

export function CallActionButton({
  icon,
  label,
  onClick,
  tone = 'neutral',
  size = 'lg',
}: CallActionButtonProps) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-sm">
      <span
        className={`flex items-center justify-center rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.18)] ${toneClassMap[tone]} ${sizeClassMap[size]}`}
      >
        {icon}
      </span>
      {label ? <span className="text-app-body-sm text-white/92">{label}</span> : null}
    </button>
  )
}
