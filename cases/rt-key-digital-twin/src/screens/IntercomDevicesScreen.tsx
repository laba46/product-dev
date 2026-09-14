import { useAppContext } from '../app/AppContext'
import { RtHeader } from '../components/ui/RtHeader'
import { devices } from '../data/devices'

function ChevronRight() {
  return (
    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

function FaceIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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

function SparklesIcon() {
  return (
    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
    </svg>
  )
}

export function IntercomDevicesScreen() {
  const { navigate, getDeviceName } = useAppContext()

  const intercoms = devices.filter((d) => d.type === 'intercom')

  return (
    <>
      <RtHeader title="Домофоны" onBack={() => navigate({ id: 'devices' })} />

      <section className="mt-md">
        <ul className="flex flex-col">
          {intercoms.map((device) => (
            <li key={device.id}>
              <button
                onClick={() => navigate({ id: 'intercom', deviceId: device.id })}
                className="flex w-full items-center gap-md border-b border-border py-md text-left"
              >
                <span className="flex-1 text-app-body font-medium text-text-primary">
                  {getDeviceName(device.id, device.name)}
                </span>
                <ChevronRight />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Промо-карточка про переезд кода */}
      <section className="mt-md rounded-xl border border-border bg-surface px-md py-card">
        <div className="flex items-center gap-sm">
          <SparklesIcon />
          <p className="text-app-body font-semibold text-text-primary">
            Код переехал в «Мой дом»
          </p>
        </div>
        <p className="mt-xs text-app-body-sm text-text-muted">
          Теперь вы сможете создавать коды ещё быстрее с главного экрана
        </p>
      </section>

      <section className="mt-md">
        <ul className="flex flex-col">
          <li>
            <button
              onClick={() => navigate({ id: 'face-recognition' })}
              className="flex w-full items-center gap-md border-b border-border py-md text-left"
            >
              <FaceIcon />
              <span className="flex-1 text-app-body font-medium text-text-primary">
                Распознавание лица
              </span>
              <ChevronRight />
            </button>
          </li>
        </ul>
      </section>
    </>
  )
}
