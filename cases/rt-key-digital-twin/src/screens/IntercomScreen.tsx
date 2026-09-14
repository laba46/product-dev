import { useState } from 'react'
import { useAppContext } from '../app/AppContext'
import { DatePickerModal } from '../components/ui/DatePickerModal'
import { IntercomSettingsSheet } from '../components/features/IntercomSettingsSheet'
import { devices } from '../data/devices'
import { useSimulatedAction } from '../hooks/useSimulatedAction'
import { getTariffCapabilities } from '../config/tariffCapabilities'

const DOOR_OPEN_DELAY_MS = 1500

const MONTH_NAMES_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

function formatViewerDate(date: Date, today: Date): string {
  const isSameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  if (isSameDay) {
    return `Сегодня, ${date.getDate()} ${MONTH_NAMES_GENITIVE[date.getMonth()]}`
  }
  return `${date.getDate()} ${MONTH_NAMES_GENITIVE[date.getMonth()]}`
}

function CalendarIcon() {
  return (
    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  )
}

function MoreVerticalIcon() {
  return (
    <svg className="h-5 w-5 text-text-primary" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  )
}

function DoorIcon() {
  return (
    <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <circle cx="14" cy="13" r="1" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 9V4h5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
      <path d="M20 15v5h-5" />
    </svg>
  )
}

function QuarterHourIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12 L 12 7" strokeLinecap="round" />
      <text x="12" y="15" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor" stroke="none">¼</text>
    </svg>
  )
}

/** Компактный таймлайн-скруббер: тики на каждый час + оранжевый маркер сейчас. */
function PlaybackTimeline({ now }: { now: Date }) {
  const hour = now.getHours()
  const minute = now.getMinutes()
  // Плавный прогресс по середине шкалы
  const progress = (hour + minute / 60) / 24

  return (
    <div className="mt-md">
      <div className="relative h-10">
        {/* Линия шкалы */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-border" />

        {/* Тики каждый час */}
        <div className="absolute inset-0 flex justify-between">
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className={`block w-px ${i % 6 === 0 ? 'h-3 bg-text-muted' : 'h-2 bg-border'}`}
              style={{ alignSelf: 'center' }}
            />
          ))}
        </div>

        {/* Оранжевый маркер «сейчас» */}
        <div
          className="absolute top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-orange-500"
          style={{ left: `${progress * 100}%` }}
        />
      </div>

      {/* Подписи времени */}
      <div className="relative mt-xs h-4 text-app-caption text-text-muted">
        <span className="absolute" style={{ left: `${(hour - 1) / 24 * 100}%` }}>
          {String(Math.max(hour - 1, 0)).padStart(2, '0')}:00
        </span>
        <span className="absolute" style={{ left: `${(hour + 1) / 24 * 100}%` }}>
          {String(Math.min(hour + 1, 23)).padStart(2, '0')}:00
        </span>
      </div>
    </div>
  )
}

export function IntercomScreen() {
  const {
    navigate,
    addHistoryEvent,
    setIncomingCall,
    getDeviceName,
    showPremiumBottomSheet,
    userTariff,
  } = useAppContext()

  const intercom = devices.find((d) => d.type === 'intercom')

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const { actionState, execute } = useSimulatedAction(DOOR_OPEN_DELAY_MS)

  if (!intercom) return null

  const today = new Date()
  const isLive =
    selectedDate.getFullYear() === today.getFullYear() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getDate() === today.getDate()

  const capabilities = getTariffCapabilities(userTariff)

  function handleOpenDoor() {
    if (actionState !== 'default') return
    execute('success', (settled) => {
      if (settled === 'success') {
        addHistoryEvent({
          deviceId: intercom!.id,
          eventType: 'door_opened',
          result: 'success',
          description: 'Дверь успешно открыта',
        })
      }
    })
  }

  function handleOpenArchive() {
    if (!capabilities.canAccessIntercomArchive) {
      showPremiumBottomSheet({
        featureTitle: 'Архив видео домофона',
        featureDescription:
          'На базовом тарифе доступен live-просмотр. Архив записей домофона доступен на Premium.',
      })
      return
    }

    navigate({ id: 'intercom-archive' })
  }

  return (
    <div className="-mx-layout-x">
      {/* Шапка */}
      <header className="flex items-center justify-between px-layout-x pb-md">
        <button
          onClick={() => navigate({ id: 'intercom-devices' })}
          aria-label="Назад"
          className="flex h-8 w-8 items-center justify-center text-primary"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h1 className="flex-1 text-app-section font-bold text-text-primary">
          {getDeviceName(intercom.id, intercom.name)}
        </h1>
        <button
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Настройки"
          className="flex h-8 w-8 items-center justify-center"
        >
          <MoreVerticalIcon />
        </button>
      </header>

      {/* Дата + LIVE */}
      <div className="flex items-center justify-between px-layout-x">
        <button
          onClick={() => setIsDatePickerOpen(true)}
          className="flex items-center gap-sm"
        >
          <CalendarIcon />
          <span className="text-app-body font-medium text-primary">
            {formatViewerDate(selectedDate, today)}
          </span>
        </button>
        {isLive && (
          <span className="rounded-md bg-orange-500 px-sm py-xs text-app-caption font-bold uppercase tracking-wide text-white">
            LIVE
          </span>
        )}
        {!isLive && (
          <span className="rounded-md border border-primary px-sm py-xs text-app-caption font-bold uppercase tracking-wide text-primary">
            Архив
          </span>
        )}
      </div>

      <div className="mt-md px-layout-x">
        <button
          type="button"
          onClick={handleOpenArchive}
          className="w-full rounded-md border border-border-subtle bg-surface-muted px-md py-card text-left"
        >
          <span className="block text-app-body-sm font-semibold text-text-primary">
            Архив домофона
          </span>
          <span className="mt-xxs block text-app-caption text-text-muted">
            {capabilities.canAccessIntercomArchive
              ? `Доступны записи за ${capabilities.intercomArchiveDays} дней`
              : 'Доступен на Premium'}
          </span>
        </button>
      </div>

      {/* Видео-плеер */}
      <div className="mt-md">
        <div
          className="relative w-full bg-[#0f1729]"
          style={{ aspectRatio: '16 / 11' }}
        >
          {/* Тёмные полосы сверху/снизу */}
          <div className="absolute inset-y-0 left-0 right-0 flex flex-col">
            <div className="h-3 w-full bg-[#0a1020]" />
            <div className="flex-1 bg-gradient-to-br from-[#1a1f2e] to-[#0a0f1a]" />
            <div className="h-3 w-full bg-[#0a1020]" />
          </div>
          {!intercom.isOnline && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-app-body-sm text-white/70">Поток недоступен</span>
            </div>
          )}
        </div>
      </div>

      {/* Таймлайн */}
      <div className="px-layout-x">
        <PlaybackTimeline now={today} />
      </div>

      {/* Метка часового пояса */}
      <div className="mt-xl flex justify-end px-layout-x">
        <span className="rounded-md bg-surface-muted px-sm py-xxs text-app-caption text-text-muted">
          GMT+3
        </span>
      </div>

      {/* Контролы */}
      <div className="mt-lg flex items-center justify-between px-layout-x">
        <div className="flex items-center gap-md">
          <button aria-label="Перемотать на 15 минут">
            <QuarterHourIcon />
          </button>
          <button className="text-app-body font-bold text-primary">1x</button>
        </div>

        <button
          onClick={handleOpenDoor}
          disabled={actionState !== 'default'}
          aria-label="Открыть дверь"
          className={`flex h-16 w-16 items-center justify-center rounded-full shadow-lg ${
            actionState === 'success'
              ? 'bg-success'
              : actionState === 'error'
                ? 'bg-error'
                : 'bg-primary'
          }`}
        >
          <DoorIcon />
        </button>

        <div className="flex items-center gap-md">
          <button
            onClick={() => setIsPaused((v) => !v)}
            aria-label={isPaused ? 'Воспроизвести' : 'Пауза'}
          >
            {isPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button aria-label="Полноэкранный режим">
            <FullscreenIcon />
          </button>
        </div>
      </div>

      {/* Тестовый блок */}
      <div className="mx-layout-x mt-xl mb-xl rounded-xl border border-border-subtle bg-surface-muted px-md py-card">
        <p className="text-app-caption text-text-muted">Тест: симуляция сценариев</p>
        <button
          onClick={() =>
            setIncomingCall({
              deviceName: 'Квартира',
              sourceLabel: 'Ключ-аудио',
              stage: 'incoming',
              durationSec: 0,
            })
          }
          className="mt-sm w-full rounded-md border border-border bg-surface py-sm text-app-body-sm text-primary"
        >
          Симулировать входящий звонок
        </button>
      </div>

      <DatePickerModal
        isOpen={isDatePickerOpen}
        initialDate={selectedDate}
        onConfirm={(d) => {
          setSelectedDate(d)
          setIsDatePickerOpen(false)
        }}
        onCancel={() => setIsDatePickerOpen(false)}
      />

      <IntercomSettingsSheet
        isOpen={isSettingsOpen}
        serialNumber={intercom.serialNumber}
        onClose={() => setIsSettingsOpen(false)}
        onRename={() => {
          setIsSettingsOpen(false)
          navigate({ id: 'rename-intercom', deviceId: intercom.id })
        }}
        onFaceRecognition={() => {
          setIsSettingsOpen(false)
          navigate({ id: 'face-recognition' })
        }}
      />
    </div>
  )
}
