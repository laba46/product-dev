type RtBannerTone = 'success' | 'warning'

type RtBannerProps = {
  tone: RtBannerTone
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  onClose?: () => void
}

const toneClassMap: Record<RtBannerTone, string> = {
  success: 'bg-[#dff8ef] text-text-primary',
  warning: 'bg-[#ffe4e6] text-[#eb3030]',
}

export function RtBanner({
  tone,
  title,
  description,
  actionLabel,
  onAction,
  onClose,
}: RtBannerProps) {
  return (
    <section className={`rounded-[22px] px-lg py-lg ${toneClassMap[tone]}`}>
      <div className="flex items-start gap-md">
        <div className="mt-xxs flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/70">
          {tone === 'success' ? (
            <svg className="h-5 w-5 text-[#6bd8b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="5 13 9 17 19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-[#eb3030]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <line x1="12" y1="7" x2="12" y2="13" />
              <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
            </svg>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-[17px] font-semibold leading-[1.22] ${tone === 'warning' ? 'text-[#eb3030]' : 'text-text-primary'}`}>
            {title}
          </p>
          {description && (
            <p className={`mt-sm text-app-body leading-[1.32] ${tone === 'warning' ? 'text-[#eb3030]' : 'text-text-primary'}`}>
              {description}
            </p>
          )}
          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className={`mt-lg text-[17px] font-semibold uppercase tracking-[0.02em] ${
                tone === 'warning' ? 'text-[#ff0000]' : 'text-primary'
              }`}
            >
              {actionLabel}
            </button>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center text-[#b8bcc6]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
