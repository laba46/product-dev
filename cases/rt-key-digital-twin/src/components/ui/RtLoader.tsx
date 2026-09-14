export type RtLoaderType = 'default' | 'spinner' | 'spinnerBg' | 'dots'
export type RtLoaderSize = '2xs' | 's' | 'm'
export type RtLoaderVariant = 'primary' | 'secondary'

type RtLoaderProps = {
  type?: RtLoaderType
  size?: RtLoaderSize
  variant?: RtLoaderVariant
}

const sizeClassMap: Record<RtLoaderSize, string> = {
  '2xs': 'h-4 w-4',
  s: 'h-6 w-6',
  m: 'h-10 w-10',
}

const borderClassMap: Record<RtLoaderVariant, string> = {
  primary: 'border-primary',
  secondary: 'border-white',
}

export function RtLoader({
  type = 'spinner',
  size = 'm',
  variant = 'primary',
}: RtLoaderProps) {
  if (type === 'dots') {
    return (
      <div className="flex items-center gap-xs">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:240ms]" />
      </div>
    )
  }

  const inner = (
    <span
      className={`inline-block animate-spin rounded-full border-[3px] border-transparent border-t-current ${sizeClassMap[size]} ${borderClassMap[variant]}`}
    />
  )

  if (type === 'spinnerBg') {
    return <span className="inline-flex rounded-full bg-white/8 p-md">{inner}</span>
  }

  return inner
}
