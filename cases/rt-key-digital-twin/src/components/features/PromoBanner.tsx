type PromoBannerProps = {
  message: string
  ctaLabel: string
  onCta?: () => void
  onDismiss?: () => void
}

export function PromoBanner({ message, ctaLabel, onCta, onDismiss }: PromoBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#5500cc] px-md py-md text-white shadow-sm">
      <div className="max-w-[60%]">
        <p className="text-app-body font-semibold leading-snug">{message}</p>
        <button
          onClick={onCta}
          className="mt-card inline-block rounded-full bg-white px-lg py-sm text-app-body-sm font-bold text-[var(--color-primary)]"
        >
          {ctaLabel}
        </button>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Закрыть"
          className="absolute right-sm top-sm flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-app-caption font-bold text-white"
        >
          ×
        </button>
      )}

      {/* Декоративный элемент — t2 бейдж */}
      <div className="absolute bottom-0 right-0 flex h-full items-center pr-md">
        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border-2 border-white/30 bg-white/10">
          <span className="text-app-label font-black tracking-tight text-white">t2</span>
          <div className="mt-xs flex gap-xxs">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 w-0.5 bg-white/60" style={{ height: `${6 + (i % 3) * 3}px` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
