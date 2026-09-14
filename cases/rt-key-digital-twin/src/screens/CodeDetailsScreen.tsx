import { useAppContext } from '../app/AppContext'
import { RtButton } from '../components/ui/RtButton'
import { RtHeader } from '../components/ui/RtHeader'
import { RtSectionTitle } from '../components/ui/RtSectionTitle'
import { devices } from '../data/devices'

type CodeDetailsScreenProps = {
  codeId: string
}

const DURATION_LABELS: Record<string, string> = {
  '24_hours': '24 часа',
  '3_days': '3 дня',
  '7_days': '7 дней',
  '14_days': '14 дней',
}

export function CodeDetailsScreen({ codeId }: CodeDetailsScreenProps) {
  const { navigate, userTariff, temporaryCodes } = useAppContext()
  const code = temporaryCodes.find((c) => c.id === codeId)

  if (!code) return null

  const device = devices.find((d) => d.id === code.deviceId)
  const isActive = code.status === 'active'
  const canExtend = userTariff === 'premium'
  const fullNumber = `${code.servicePhone}, ${code.code}`

  return (
    <>
      <RtHeader
        title="Код доступа"
        onBack={() => navigate({ id: 'temporary-codes' })}
      />

      <section className="mt-md rounded-xl border border-border bg-surface p-md shadow-sm">
        <p className="text-app-caption text-text-muted">Устройство</p>
        <p className="mt-xs text-app-body font-semibold text-text-primary">
          {device?.name ?? '—'}
        </p>

        <p className="mt-md text-app-caption text-text-muted">Срок действия</p>
        <p className="mt-xs text-app-body font-semibold text-text-primary">
          {DURATION_LABELS[code.duration] ?? code.duration}
        </p>

        <p className="mt-md text-app-caption text-text-muted">
          {isActive ? 'Истекает' : 'Отозван'}
        </p>
        <p className="mt-xs text-app-body font-semibold text-text-primary">
          {isActive
            ? new Date(code.expiresAt).toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })
            : code.revokedAt
              ? new Date(code.revokedAt).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'}
        </p>
      </section>

      {isActive && (
        <section className="mt-section">
          <RtSectionTitle title="Код" />
          <div className="mt-md flex items-center gap-xs rounded-xl border border-border-strong bg-surface-muted px-md py-card">
            <svg className="h-4 w-4 flex-shrink-0 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            <p className="text-app-body-tight font-semibold text-primary">{fullNumber}</p>
          </div>
        </section>
      )}

      {isActive && (
        <section className="mt-section flex flex-col gap-sm">
          <RtButton
            label="Скопировать"
            variant="secondary"
            fullWidth
            onClick={() => navigator.clipboard.writeText(fullNumber)}
          />
          <RtButton label="Поделиться" variant="secondary" fullWidth />
          {canExtend ? (
            <RtButton label="Продлить" variant="secondary" fullWidth />
          ) : (
            <RtButton label="Продление — только на premium" variant="ghost" disabled fullWidth />
          )}
          <RtButton label="Отозвать" variant="ghost" fullWidth />
        </section>
      )}
    </>
  )
}
