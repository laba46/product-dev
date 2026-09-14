import type { ReactNode } from 'react'

type CallScreenShellProps = {
  statusLabel: string
  title: string
  media: ReactNode
  controls: ReactNode
}

export function CallScreenShell({
  statusLabel,
  title,
  media,
  controls,
}: CallScreenShellProps) {
  return (
    <div className="-mx-layout-x min-h-screen bg-[#091222] text-white">
      <div className="px-layout-x pt-xl">
        <p className="text-app-body-sm text-white/72">{statusLabel}</p>
        <h1 className="mt-xs text-[20px] font-semibold leading-[1.15]">{title}</h1>
      </div>

      <div className="mt-md">{media}</div>

      <div className="px-layout-x pb-2xl pt-2xl">{controls}</div>
    </div>
  )
}
