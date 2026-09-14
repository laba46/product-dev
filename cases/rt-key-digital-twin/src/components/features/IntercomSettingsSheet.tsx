type IntercomSettingsSheetProps = {
  isOpen: boolean
  serialNumber: string
  onClose: () => void
  onRename?: () => void
  onFaceRecognition?: () => void
  onAddWidget?: () => void
}

function PencilIcon() {
  return (
    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function FaceIcon() {
  return (
    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7V5a2 2 0 012-2h2" />
      <path d="M17 3h2a2 2 0 012 2v2" />
      <path d="M21 17v2a2 2 0 01-2 2h-2" />
      <path d="M7 21H5a2 2 0 01-2-2v-2" />
      <circle cx="9" cy="10" r="0.7" fill="currentColor" />
      <circle cx="15" cy="10" r="0.7" fill="currentColor" />
      <path d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5" />
    </svg>
  )
}

function WidgetIcon() {
  return (
    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="13" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <circle cx="6" cy="14.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

function RtLogoIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="rt-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path
        d="M12 2 L18 8 L18 16 L12 22 L6 16 L6 8 Z"
        fill="url(#rt-grad)"
      />
    </svg>
  )
}

export function IntercomSettingsSheet({
  isOpen,
  serialNumber,
  onClose,
  onRename,
  onFaceRecognition,
  onAddWidget,
}: IntercomSettingsSheetProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-2xl bg-surface px-layout-x pb-xl pt-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-app-section font-bold text-text-primary">Настройки</h2>

        <ul className="mt-md flex flex-col">
          <li>
            <button
              onClick={onRename}
              className="flex w-full items-center gap-md border-b border-border py-md text-left"
            >
              <PencilIcon />
              <span className="flex-1 text-app-body font-medium text-text-primary">
                Переименовать
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={onFaceRecognition}
              className="flex w-full items-center gap-md border-b border-border py-md text-left"
            >
              <FaceIcon />
              <span className="flex-1 text-app-body font-medium text-text-primary">
                Распознавание лица
              </span>
            </button>
          </li>
          <li className="py-md">
            <div className="flex items-center gap-md">
              <WidgetIcon />
              <span className="flex-1 text-app-body font-medium text-text-primary">
                Виджет управления
              </span>
            </div>
            <p className="mt-xs pl-9 text-app-body-sm text-text-muted">
              Настройте виджет быстрого открытия двери на своём телефоне
            </p>
            <button
              onClick={onAddWidget}
              className="ml-9 mt-sm flex items-center gap-sm rounded-full border border-border bg-surface px-md py-xs"
            >
              <RtLogoIcon />
              <span className="text-app-body-sm font-medium text-text-primary">
                Добавить виджет
              </span>
            </button>
          </li>
        </ul>

        <p className="mt-md text-app-body-sm text-text-muted">
          Серийный номер домофона {serialNumber}
        </p>
      </div>
    </div>
  )
}
