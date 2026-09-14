import { RtButton } from '../ui/RtButton'

type PremiumBottomSheetProps = {
  isOpen: boolean
  featureTitle: string
  featureDescription: string
  onClose: () => void
}

/**
 * Глобальный paywall-слой. Показывается поверх экрана когда пользователь
 * пытается воспользоваться premium-функцией на тарифе base.
 * Визуально и логически отличается от технической ошибки.
 */
export function PremiumBottomSheet({
  isOpen,
  featureTitle,
  featureDescription,
  onClose,
}: PremiumBottomSheetProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Недоступно на базовом тарифе"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="relative z-10 w-full rounded-t-2xl bg-surface px-layout-x pb-xl pt-lg">
        {/* Drag indicator */}
        <div className="mx-auto mb-md h-1 w-10 rounded-full bg-border-subtle" />

        <div className="mb-sm flex items-start justify-between gap-sm">
          <div>
            <p className="text-app-caption uppercase tracking-wide text-amber-500">
              Доступно на Premium
            </p>
            <h2 className="mt-xs text-app-title text-text-primary">{featureTitle}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-secondary"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <p className="text-app-body-sm text-text-secondary">{featureDescription}</p>

        <div className="mt-lg flex flex-col gap-sm">
          <RtButton
            label="Подключить Premium"
            fullWidth
            onClick={onClose}
          />
          <RtButton
            label="Остаться на базовом тарифе"
            variant="ghost"
            fullWidth
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}
