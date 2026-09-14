import { useAppContext } from '../app/AppContext'
import { TemporaryCodeCard } from '../components/features/TemporaryCodeCard'
import { RtButton } from '../components/ui/RtButton'
import { RtHeader } from '../components/ui/RtHeader'
import { RtSectionTitle } from '../components/ui/RtSectionTitle'
import { devices } from '../data/devices'

const DURATION_LABELS: Record<string, string> = {
  '24_hours': '24 часа',
  '3_days': '3 дня',
  '7_days': '7 дней',
  '14_days': '14 дней',
}

export function TemporaryCodesScreen() {
  const { navigate, temporaryCodes } = useAppContext()

  const activeCodes = temporaryCodes.filter((c) => c.status === 'active')
  const inactiveCodes = temporaryCodes.filter((c) => c.status !== 'active')

  return (
    <>
      <RtHeader title="Временные коды" onBack={() => navigate({ id: 'home' })} />

      <div className="mt-md">
        <RtButton label="Создать код" fullWidth />
      </div>

      {activeCodes.length > 0 && (
        <section className="mt-section">
          <RtSectionTitle title="Активные" />
          <div className="mt-md flex flex-col gap-card">
            {activeCodes.map((code) => {
              const device = devices.find((d) => d.id === code.deviceId)
              return (
                <div
                  key={code.id}
                  onClick={() => navigate({ id: 'code-details', codeId: code.id })}
                  className="cursor-pointer"
                >
                  <TemporaryCodeCard
                    deviceName={device?.name ?? 'Устройство'}
                    deviceType={device?.type ?? 'intercom'}
                    code={code.code}
                    servicePhone={code.servicePhone}
                    status={code.status}
                  />
                  <p className="mt-xs text-app-caption text-text-muted">
                    {DURATION_LABELS[code.duration] ?? code.duration} · Истекает{' '}
                    {new Date(code.expiresAt).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                    })}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {inactiveCodes.length > 0 && (
        <section className="mt-section">
          <RtSectionTitle title="Отозванные" />
          <div className="mt-md flex flex-col gap-card">
            {inactiveCodes.map((code) => {
              const device = devices.find((d) => d.id === code.deviceId)
              return (
                <div
                  key={code.id}
                  onClick={() => navigate({ id: 'code-details', codeId: code.id })}
                  className="cursor-pointer"
                >
                  <TemporaryCodeCard
                    deviceName={device?.name ?? 'Устройство'}
                    deviceType={device?.type ?? 'intercom'}
                    code={code.code}
                    servicePhone={code.servicePhone}
                    status={code.status}
                  />
                  <p className="mt-xs text-app-caption text-text-muted">
                    Отозван{' '}
                    {code.revokedAt
                      ? new Date(code.revokedAt).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                        })
                      : ''}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
