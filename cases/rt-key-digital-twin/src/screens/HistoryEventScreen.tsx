import { useAppContext } from '../app/AppContext'
import { RtHeader } from '../components/ui/RtHeader'
import type { HistoryEventType, HistoryResult } from '../data/history'
import { devices } from '../data/devices'
import { temporaryCodes } from '../data/temporaryCodes'

type HistoryEventScreenProps = {
  eventId: string
}

const EVENT_TYPE_LABELS: Record<HistoryEventType, string> = {
  door_opened: 'Дверь открыта',
  door_open_failed: 'Ошибка открытия',
  incoming_call: 'Входящий звонок',
  incoming_call_answered_audio: 'Звонок принят (аудио)',
  incoming_call_answered_video: 'Звонок принят (видео)',
  incoming_call_door_opened: 'Дверь открыта при звонке',
  incoming_call_dismissed: 'Звонок отклонён',
  missed_call: 'Пропущенный звонок',
  code_created: 'Код создан',
  code_used: 'Код использован',
  device_offline: 'Устройство недоступно',
}

const RESULT_LABELS: Record<HistoryResult, string> = {
  success: 'Успешно',
  error: 'Ошибка',
  info: 'Информация',
}

const RESULT_COLOR: Record<HistoryResult, string> = {
  success: 'text-success',
  error: 'text-error',
  info: 'text-text-muted',
}

export function HistoryEventScreen({ eventId }: HistoryEventScreenProps) {
  const { navigate, historyEvents } = useAppContext()
  const event = historyEvents.find((e) => e.id === eventId)

  if (!event) return null

  const device = devices.find((d) => d.id === event.deviceId)
  const code = event.codeId ? temporaryCodes.find((c) => c.id === event.codeId) : undefined

  return (
    <>
      <RtHeader title="Событие" onBack={() => navigate({ id: 'history' })} />

      <section className="mt-md rounded-md border border-border bg-surface p-md shadow-sm">
        <p className="text-app-section font-bold text-text-primary">
          {EVENT_TYPE_LABELS[event.eventType]}
        </p>

        <p className={`mt-sm text-app-body-sm font-semibold ${RESULT_COLOR[event.result]}`}>
          {RESULT_LABELS[event.result]}
        </p>

        <p className="mt-md text-app-caption text-text-muted">Описание</p>
        <p className="mt-xs text-app-body-sm text-text-primary">{event.description}</p>

        {event.errorCode && (
          <>
            <p className="mt-md text-app-caption text-text-muted">Код ошибки</p>
            <p className="mt-xs font-mono text-app-body-sm text-error">{event.errorCode}</p>
          </>
        )}

        <p className="mt-md text-app-caption text-text-muted">Время</p>
        <p className="mt-xs text-app-body-sm text-text-primary">
          {new Date(event.timestamp).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>

        {device && (
          <>
            <p className="mt-md text-app-caption text-text-muted">Устройство</p>
            <p className="mt-xs text-app-body-sm text-text-primary">{device.name}</p>
          </>
        )}

        {code && (
          <>
            <p className="mt-md text-app-caption text-text-muted">Временный код</p>
            <p className="mt-xs text-app-body-sm font-semibold text-primary">{code.code}</p>
          </>
        )}
      </section>
    </>
  )
}
