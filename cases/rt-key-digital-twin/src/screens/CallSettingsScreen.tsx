import { useEffect, useState } from 'react'
import { useAppContext } from '../app/AppContext'
import { RtBanner } from '../components/ui/RtBanner'
import { RtToggle } from '../components/ui/RtToggle'

const WEEK_DAYS = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В']

function ChevronRight() {
  return (
    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

export function CallSettingsScreen() {
  const {
    navigate,
    callsEnabled,
    setCallsEnabled,
    callScheduleEnabled,
    setCallScheduleEnabled,
    intercomCallsEnabled,
    setIntercomCallsEnabled,
  } = useAppContext()
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)

  useEffect(() => {
    if (!showSuccessBanner) return undefined
    const timer = window.setTimeout(() => setShowSuccessBanner(false), 3000)
    return () => window.clearTimeout(timer)
  }, [showSuccessBanner])

  function handleCallsToggle(enabled: boolean) {
    setCallsEnabled(enabled)
    if (enabled) {
      setShowSuccessBanner(true)
    } else {
      setCallScheduleEnabled(false)
    }
  }

  return (
    <div className="pb-xl">
      <header className="flex items-center gap-lg pb-md pt-xs">
        <button
          type="button"
          aria-label="Назад"
          onClick={() => navigate({ id: 'home' })}
          className="flex h-10 w-10 items-center justify-center text-primary"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <h1 className="text-[22px] font-bold leading-[1.15] text-text-primary">Настройка звонков</h1>
      </header>

      <div className="mt-sm flex flex-col gap-md">
        {showSuccessBanner && (
          <RtBanner
            tone="success"
            title="Приём звонков активирован успешно"
            onClose={() => setShowSuccessBanner(false)}
          />
        )}

        {callsEnabled && (
          <RtBanner
            tone="warning"
            title="Устройство не может принимать звонки. Чтобы приём звонков работал корректно, настройте свой телефон"
            actionLabel="Подробнее"
            onAction={() => navigate({ id: 'system-settings' })}
          />
        )}
      </div>

      <section className="mt-md rounded-[20px] bg-surface px-lg py-lg">
        <div className="flex items-start justify-between gap-md">
          <div className="min-w-0 flex-1">
            <h2 className="text-[19px] font-medium leading-[1.2] text-text-primary">Принимать звонки</h2>
          </div>
          <RtToggle
            checked={callsEnabled}
            onChange={handleCallsToggle}
            ariaLabel="Принимать звонки"
          />
        </div>
        <p className="mt-xl max-w-[300px] text-[16px] leading-[1.45] text-[#c3c7d1]">
          Настройка распространяется на все устройства, привязанные к данной учетной записи
        </p>
      </section>

      {callsEnabled && (
        <>
          <section className="mt-md rounded-[20px] bg-surface px-lg py-lg">
            <div className="flex items-start justify-between gap-md">
              <div className="min-w-0 flex-1">
                <h2 className="text-[19px] font-medium leading-[1.2] text-text-primary">По расписанию</h2>
              </div>
              <RtToggle
                checked={callScheduleEnabled}
                onChange={setCallScheduleEnabled}
                ariaLabel="Принимать звонки по расписанию"
              />
            </div>

            {callScheduleEnabled && (
              <div className="mt-xl">
                <p className="text-[16px] leading-[1.3] text-[#c3c7d1]">По каким дням</p>
                <div className="mt-md flex justify-between gap-xs">
                  {WEEK_DAYS.map((day, index) => (
                    <button
                      key={`${day}-${index}`}
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[18px] font-medium text-white shadow-[0_3px_10px_rgba(119,0,255,0.32)]"
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="mt-lg divide-y divide-border">
                  <button type="button" className="flex w-full items-center justify-between py-lg text-left">
                    <span className="text-[19px] font-medium text-text-primary">Начало</span>
                    <span className="text-[19px] font-medium text-text-primary">8:00</span>
                  </button>
                  <button type="button" className="flex w-full items-center justify-between py-lg text-left">
                    <span className="text-[19px] font-medium text-text-primary">Конец</span>
                    <span className="text-[19px] font-medium text-text-primary">20:00</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="mt-md rounded-[20px] bg-surface px-lg py-lg">
            <p className="text-[16px] leading-[1.3] text-[#c3c7d1]">Устройства</p>
            <div className="mt-lg flex items-start justify-between gap-md">
              <h2 className="text-[19px] font-medium leading-[1.2] text-text-primary">Домофон</h2>
              <RtToggle
                checked={intercomCallsEnabled}
                onChange={setIntercomCallsEnabled}
                ariaLabel="Принимать звонки с домофона"
              />
            </div>
          </section>
        </>
      )}

      {callsEnabled && (
        <button
          type="button"
          onClick={() => navigate({ id: 'system-settings' })}
          className="mt-md flex w-full items-center justify-between rounded-[20px] bg-surface px-lg py-lg text-left"
        >
          <span className="text-[19px] font-medium text-text-primary">Системные настройки</span>
          <ChevronRight />
        </button>
      )}
    </div>
  )
}
