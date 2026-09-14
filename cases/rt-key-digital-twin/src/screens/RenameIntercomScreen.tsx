import { useState } from 'react'
import { useAppContext } from '../app/AppContext'
import { devices } from '../data/devices'

type RenameIntercomScreenProps = {
  deviceId: string
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ClearFieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="#cbd5e1" />
      <line x1="9" y1="9" x2="15" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function RenameIntercomScreen({ deviceId }: RenameIntercomScreenProps) {
  const { navigate, getDeviceName, renameDevice } = useAppContext()

  const baseDevice = devices.find((d) => d.id === deviceId)
  const initialName = baseDevice ? getDeviceName(deviceId, baseDevice.name) : ''

  const [name, setName] = useState(initialName)

  if (!baseDevice) return null

  const isFocused = name.length > 0
  const trimmed = name.trim()
  const canSave = trimmed.length > 0 && trimmed !== initialName

  function handleSave() {
    if (!canSave) return
    renameDevice(deviceId, trimmed)
    navigate({ id: 'intercom', deviceId })
  }

  return (
    <div className="-mx-layout-x">
      <header className="flex items-center justify-between px-layout-x py-md">
        <button
          onClick={() => navigate({ id: 'intercom', deviceId })}
          aria-label="Закрыть"
          className="flex h-8 w-8 items-center justify-center text-primary"
        >
          <CloseIcon />
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`text-app-body font-medium ${
            canSave ? 'text-primary' : 'text-text-muted'
          }`}
        >
          Сохранить
        </button>
      </header>

      <section className="px-layout-x pt-md">
        <div className="rounded-md bg-surface-muted px-md pt-sm pb-xs">
          <label
            className={`block text-app-caption ${isFocused ? 'text-primary' : 'text-text-muted'}`}
          >
            Название домофона
          </label>
          <div className="flex items-center gap-sm">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-transparent py-xs text-app-body text-text-primary outline-none"
              autoFocus
            />
            {name.length > 0 && (
              <button
                onClick={() => setName('')}
                aria-label="Очистить поле"
                className="flex-shrink-0"
              >
                <ClearFieldIcon />
              </button>
            )}
          </div>
        </div>
        {/* Подчёркивание под полем — фиолетовое при фокусе */}
        <div className={`h-[2px] ${isFocused ? 'bg-primary' : 'bg-border'}`} />
      </section>
    </div>
  )
}
