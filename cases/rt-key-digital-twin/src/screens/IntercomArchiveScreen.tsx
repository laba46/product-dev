import { useAppContext } from '../app/AppContext'
import { RtHeader } from '../components/ui/RtHeader'
import { RtSectionTitle } from '../components/ui/RtSectionTitle'
import { devices } from '../data/devices'

/** Симулированные записи архива домофона */
const ARCHIVE_ENTRIES = [
  { id: 'arch-1', date: '24.04.26', time: '09:15', label: 'Входящий звонок — принят', durationSec: 18 },
  { id: 'arch-2', date: '23.04.26', time: '18:42', label: 'Дверь открыта без ответа', durationSec: 0 },
  { id: 'arch-3', date: '23.04.26', time: '14:05', label: 'Пропущенный звонок', durationSec: 0 },
  { id: 'arch-4', date: '22.04.26', time: '21:30', label: 'Входящий звонок — видеоответ', durationSec: 34 },
  { id: 'arch-5', date: '22.04.26', time: '11:00', label: 'Входящий звонок — принят', durationSec: 12 },
]

export function IntercomArchiveScreen() {
  const { navigate } = useAppContext()
  const intercom = devices.find((d) => d.type === 'intercom')

  if (!intercom) return null

  return (
    <>
      <RtHeader
        title="Архив домофона"
        onBack={() => navigate({ id: 'intercom' })}
      />

      <section className="mt-section">
        <RtSectionTitle title="Записи" />
        <ul className="mt-md flex flex-col gap-sm">
          {ARCHIVE_ENTRIES.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between rounded-md border border-border-subtle bg-surface-muted px-md py-card"
            >
              <div>
                <p className="text-app-body-sm text-text-primary">{entry.label}</p>
                <p className="text-app-caption text-text-muted">
                  {entry.date} · {entry.time}
                  {entry.durationSec > 0 && ` · ${entry.durationSec} сек`}
                </p>
              </div>
              <span className="text-app-caption text-text-muted">▶</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-section">
        <div className="rounded-md border border-border-subtle bg-surface-muted px-md py-card">
          <p className="text-app-caption text-text-muted">
            Архив хранится 7 дней. Видеозаписи доступны только на тарифе Premium.
          </p>
        </div>
      </section>
    </>
  )
}
