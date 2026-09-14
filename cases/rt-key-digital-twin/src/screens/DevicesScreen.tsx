import type { ReactNode } from 'react'
import { useAppContext } from '../app/AppContext'
import type { Screen } from '../app/types'
import { RtHeader } from '../components/ui/RtHeader'

type DeviceListItem = {
  id: string
  label: string
  icon: ReactNode
  target?: Screen
  iconBg?: string
}

function ChevronRight() {
  return (
    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

function IntercomIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <rect x="8" y="5" width="8" height="6" rx="1" />
      <circle cx="12" cy="16" r="1.5" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7h4l2-3h6l2 3h4v12H3z" />
      <circle cx="12" cy="13" r="3.5" fill="currentColor" />
    </svg>
  )
}

function BarrierIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="10" width="4" height="4" rx="1" />
      <line x1="6" y1="12" x2="22" y2="12" />
      <line x1="18" y1="12" x2="18" y2="18" />
      <line x1="15" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function MeterIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="21" y2="12" />
      <path d="M12 12 L 16 8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="8" width="14" height="8" rx="1.5" />
      <line x1="5" y1="12" x2="13" y2="12" strokeDasharray="1 1.5" />
      <circle cx="19" cy="12" r="3" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 8.5a16 16 0 0120 0" />
      <path d="M5 12.5a11 11 0 0114 0" />
      <path d="M8.5 16a6 6 0 017 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  )
}

export function DevicesScreen() {
  const { navigate } = useAppContext()

  const sections: DeviceListItem[] = [
    {
      id: 'intercoms',
      label: 'Домофоны',
      icon: <IntercomIcon />,
      target: { id: 'intercom-devices' },
    },
    {
      id: 'shared-cameras',
      label: 'Общедомовые камеры',
      icon: <CameraIcon />,
      target: { id: 'cameras' },
    },
    {
      id: 'barriers',
      label: 'Шлагбаумы',
      icon: <BarrierIcon />,
    },
    {
      id: 'meters',
      label: 'Счётчики',
      icon: <MeterIcon />,
    },
    {
      id: 'keys',
      label: 'Ключи',
      icon: <KeyIcon />,
    },
    {
      id: 'private-cameras',
      label: 'Личные камеры',
      icon: <PinIcon />,
    },
  ]

  return (
    <>
      <RtHeader title="Устройства" />

      <section className="mt-md">
        <ul className="flex flex-col">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => section.target && navigate(section.target)}
                className="flex w-full items-center gap-md border-b border-border py-md text-left"
              >
                {section.icon}
                <span className="flex-1 text-app-body font-medium text-text-primary">
                  {section.label}
                </span>
                <ChevronRight />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-xl">
        <h2 className="text-app-section font-bold text-text-primary">Подключите услуги</h2>
        <ul className="mt-sm flex flex-col">
          <li>
            <button className="flex w-full items-center gap-md border-b border-border py-md text-left">
              <WifiIcon />
              <span className="flex-1 text-app-body font-medium text-text-primary">
                Интернет и ТВ
              </span>
              <ChevronRight />
            </button>
          </li>
        </ul>
      </section>
    </>
  )
}
