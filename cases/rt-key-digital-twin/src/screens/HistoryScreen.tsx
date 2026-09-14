import { useAppContext } from '../app/AppContext'
import { RtHeader } from '../components/ui/RtHeader'
import type { HistoryEventType, HistoryResult } from '../data/history'

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

const RESULT_ICON: Record<HistoryResult, string> = {
  success: '✓',
  error: '✗',
  info: '●',
}

const RESULT_COLOR: Record<HistoryResult, string> = {
  success: 'text-success',
  error: 'text-error',
  info: 'text-text-muted',
}

export function HistoryScreen() {
  const { navigate, historyEvents } = useAppContext()

  return (
    <>
      <RtHeader title="История" onBack={() => navigate({ id: 'home' })} />

      {historyEvents.length === 0 ? (
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-lg text-center">
          <div className="relative h-[220px] w-[240px]">
            <div className="absolute left-5 top-4 h-32 w-32 rounded-full bg-[#eef0f8]" />
            <div className="absolute right-0 top-5 h-28 w-28 rounded-full bg-[#eef0f8]" />
            <div className="absolute left-[70px] top-[60px] h-16 w-20 rounded-t-[18px] bg-[#101828]" />
            <div className="absolute left-[82px] top-[52px] h-5 w-5 -skew-x-12 rounded-t-full bg-[#101828]" />
            <div className="absolute left-[124px] top-[52px] h-5 w-5 skew-x-12 rounded-t-full bg-[#101828]" />
            <div className="absolute left-[87px] top-[72px] h-2.5 w-2.5 rounded-full border-2 border-[#ffcf4d]" />
            <div className="absolute left-[110px] top-[72px] h-2.5 w-2.5 rounded-full border-2 border-[#ffcf4d]" />
            <div className="absolute left-[60px] top-[95px] h-[84px] w-[132px] bg-[#e29a00]" />
            <div className="absolute left-[48px] top-[82px] h-9 w-[72px] -skew-x-[12deg] bg-[#eda71a]" />
            <div className="absolute left-[122px] top-[82px] h-9 w-[72px] skew-x-[12deg] bg-[#ffc20f]" />
            <div className="absolute bottom-4 left-[52px] h-4 w-[140px] rounded-full bg-[#ebeef5]" />
          </div>

          <h2 className="text-[28px] font-bold leading-[1.08] text-text-primary">История пока пуста</h2>
          <p className="mt-md max-w-[300px] text-[18px] leading-[1.42] text-[#a8adbb]">
            Здесь будет храниться история открытий домофонов
          </p>
        </section>
      ) : (
        <div className="mt-md flex flex-col gap-card">
          {historyEvents.map((event) => (
            <article
              key={event.id}
              onClick={() => navigate({ id: 'history-event', eventId: event.id })}
              className="flex cursor-pointer items-start gap-md rounded-md border border-border bg-surface px-md py-card shadow-sm"
            >
              <span className={`mt-xxs text-app-body-sm font-bold ${RESULT_COLOR[event.result]}`}>
                {RESULT_ICON[event.result]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-app-body-sm font-semibold text-text-primary">
                  {EVENT_TYPE_LABELS[event.eventType]}
                </p>
                <p className="mt-xxs text-app-caption text-text-muted">{event.description}</p>
              </div>
              <p className="whitespace-nowrap text-app-caption text-text-muted">
                {new Date(event.timestamp).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
