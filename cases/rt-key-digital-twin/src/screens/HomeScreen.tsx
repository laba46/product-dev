import { useState } from 'react'
import { useAppContext } from '../app/AppContext'
import type { TemporaryCode } from '../data/temporaryCodes'
import { CameraTile } from '../components/features/CameraTile'
import { DeviceActionCard } from '../components/features/DeviceActionCard'
import { PromoBanner } from '../components/features/PromoBanner'
import { TemporaryCodeCard } from '../components/features/TemporaryCodeCard'
import { RtHeader } from '../components/ui/RtHeader'
import { cameras } from '../data/cameras'
import { devices } from '../data/devices'
import { promoBanner } from '../data/home'

function formatExpiry(isoDate: string): string {
  const d = new Date(isoDate)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${day}.${month} в ${hours}:${minutes}`
}

export function HomeScreen() {
  const { navigate, temporaryCodes, createTemporaryCode, deleteTemporaryCode, getDeviceName } = useAppContext()

  const [isCamerasExpanded, setIsCamerasExpanded] = useState(true)
  const [creatingCodeForDevice, setCreatingCodeForDevice] = useState<string | null>(null)
  const [openMenuCodeId, setOpenMenuCodeId] = useState<string | null>(null)
  const [shareCode, setShareCode] = useState<TemporaryCode | null>(null)
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  const favoriteCameras = cameras.filter((c) => c.isFavorite)
  const barrier = devices.find((d) => d.type === 'barrier')
  const intercom = devices.find((d) => d.type === 'intercom')

  const activeBarrierCode = barrier
    ? temporaryCodes.find((c) => c.deviceId === barrier.id && c.status === 'active')
    : undefined
  const activeIntercomCode = intercom
    ? temporaryCodes.find((c) => c.deviceId === intercom.id && c.status === 'active')
    : undefined

  function handleCreateCode(deviceId: string) {
    setCreatingCodeForDevice(deviceId)
  }

  function handleConfirmCreate() {
    if (creatingCodeForDevice !== null) {
      createTemporaryCode(creatingCodeForDevice)
    }
    setCreatingCodeForDevice(null)
  }

  function handleDeleteCode(codeId: string) {
    deleteTemporaryCode(codeId)
    setOpenMenuCodeId(null)
  }

  function handleMenuToggle(codeId: string) {
    setOpenMenuCodeId((prev) => (prev === codeId ? null : codeId))
  }

  const activeCodesList = [
    ...(activeBarrierCode ? [activeBarrierCode] : []),
    ...(activeIntercomCode ? [activeIntercomCode] : []),
  ]

  const showCreateBarrierButton = !activeBarrierCode && !activeIntercomCode
  const showCreateIntercomButton = !!activeBarrierCode && !activeIntercomCode && intercom

  return (
    <>
      <RtHeader
        title="Мой дом"
        actions={[
          {
            ariaLabel: 'История',
            onClick: () => navigate({ id: 'history' }),
            icon: (
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 13.8" />
              </svg>
            ),
          },
          {
            ariaLabel: 'Настройка звонков',
            onClick: () => navigate({ id: 'call-settings' }),
            icon: (
              <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 14.5v3a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 5 7.6 1.5 1.5 0 0 1 6.5 6h3" />
                <path d="M8.2 4.5 10 8" />
                <path d="M14 4.5 20 10.5" />
                <line x1="4" y1="20" x2="20" y2="4" />
              </svg>
            ),
          },
        ]}
      />

      {/* Промо-баннер */}
      {isBannerVisible && (
        <div className="mt-md">
          <PromoBanner
            message={promoBanner.message}
            ctaLabel={promoBanner.ctaLabel}
            onDismiss={() => setIsBannerVisible(false)}
          />
        </div>
      )}

      {/* Избранные камеры */}
      {favoriteCameras.length > 0 && (
        <section className="mt-section">
          <button
            className="flex w-full items-center justify-between"
            onClick={() => setIsCamerasExpanded((prev) => !prev)}
          >
            <h2 className="text-app-section font-bold text-text-primary">Избранные камеры</h2>
            <svg
              className={`h-5 w-5 text-text-muted transition-transform ${isCamerasExpanded ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isCamerasExpanded && (
            <div className="mt-md grid grid-cols-2 gap-md">
              {favoriteCameras.map((camera) => (
                <div
                  key={camera.id}
                  onClick={() => navigate({ id: 'camera-details', cameraId: camera.id })}
                  className="cursor-pointer"
                >
                  <CameraTile title={camera.name} isOnline={camera.isOnline} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Шлагбаумы и домофоны */}
      <section className="mt-section">
        <h2 className="text-app-section font-bold text-text-primary">Шлагбаумы и домофоны</h2>
        <div className="mt-md grid grid-cols-2 gap-md">
          {barrier && (
            <DeviceActionCard
              title={getDeviceName(barrier.id, barrier.name)}
              actionLabel="Открыть"
              deviceType="barrier"
              isOnline={barrier.isOnline}
            />
          )}
          {intercom && (
            <DeviceActionCard
              title={getDeviceName(intercom.id, intercom.name)}
              actionLabel="Открыть"
              deviceType="intercom"
              isOnline={intercom.isOnline}
              onClick={() => navigate({ id: 'intercom', deviceId: intercom.id })}
            />
          )}
        </div>
      </section>

      {/* Секция активных временных кодов */}
      {activeCodesList.length > 0 && (
        <section className="mt-section">
          <div className="flex items-center justify-between">
            <h2 className="text-app-section font-semibold text-text-primary">Временный код</h2>
            <div className="flex items-center gap-md">
              {/* Поделиться — показываем для первого активного кода */}
              <button
                onClick={() => setShareCode(activeCodesList[0])}
                aria-label="Поделиться кодом"
                className="flex h-8 w-8 items-center justify-center text-primary"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
              {/* Меню ⋮ */}
              <div className="relative">
                <button
                  onClick={() => handleMenuToggle(activeCodesList[0].id)}
                  aria-label="Меню кода"
                  className="flex h-8 w-8 items-center justify-center text-primary"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                </button>
                {openMenuCodeId === activeCodesList[0].id && (
                  <div className="absolute right-0 top-full z-10 mt-xs min-w-[160px] rounded-xl border border-border bg-surface shadow-lg">
                    <button
                      className="flex w-full items-center gap-sm px-md py-card text-left text-app-body-sm text-text-primary"
                      onClick={() => {
                        setOpenMenuCodeId(null)
                        navigate({ id: 'temporary-code-info' })
                      }}
                    >
                      <svg className="h-4 w-4 flex-shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Информация
                    </button>
                    <button
                      className="flex w-full items-center gap-sm px-md py-card text-left text-app-body-sm text-error"
                      onClick={() => handleDeleteCode(activeCodesList[0].id)}
                    >
                      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="mt-xs text-app-body-sm text-text-muted">
            Истекает {formatExpiry(activeCodesList[0].expiresAt)}
          </p>

          <div className="mt-sm flex flex-col gap-card">
            {activeCodesList.map((code) => {
              const device = devices.find((d) => d.id === code.deviceId)
              return (
                <TemporaryCodeCard
                  key={code.id}
                  deviceName={device?.name ?? 'Устройство'}
                  deviceType={device?.type ?? 'intercom'}
                  code={code.code}
                  servicePhone={code.servicePhone}
                  status={code.status}
                />
              )
            })}
          </div>
        </section>
      )}

      {/* Кнопка создания кода */}
      {showCreateBarrierButton && (
        <button
          onClick={() => barrier && handleCreateCode(barrier.id)}
          className="mt-md w-full rounded-lg border border-border bg-surface-muted py-md text-center"
        >
          <p className="text-app-body-lg font-semibold text-primary">Создать код</p>
        </button>
      )}
      {showCreateIntercomButton && intercom && (
        <button
          onClick={() => handleCreateCode(intercom.id)}
          className="mt-md w-full rounded-lg border border-border bg-surface-muted py-md text-center"
        >
          <p className="text-app-body-lg font-semibold text-primary">Создать код для домофонов</p>
        </button>
      )}

      {/* Диалог «Пожалуйста, подождите» */}
      {creatingCodeForDevice !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleConfirmCreate}
        >
          <div
            className="mx-layout-x w-full max-w-[320px] rounded-2xl bg-surface px-xl py-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-app-body-lg font-bold text-text-primary">Пожалуйста, подождите</h3>
            <p className="mt-sm text-app-body-sm leading-snug text-text-secondary">
              Записываем гостевой код на ваши устройства. Это займёт немного времени
            </p>
            <div className="mt-lg flex justify-end">
              <button
                onClick={handleConfirmCreate}
                className="text-app-body-sm font-bold uppercase tracking-wide text-primary"
              >
                Хорошо
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Шит «Подключить» (имитация share sheet) */}
      {shareCode !== null && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          onClick={() => setShareCode(null)}
        >
          <div
            className="w-full rounded-t-2xl bg-surface px-layout-x pb-2xl pt-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-lg flex items-center">
              <button
                onClick={() => setShareCode(null)}
                className="flex h-8 w-8 items-center justify-center text-primary"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <h3 className="flex-1 text-center text-app-body-lg font-semibold text-text-primary">
                Подключить
              </h3>
              <div className="h-8 w-8" />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-surface-muted px-md py-card">
              <p className="text-app-body-sm text-text-secondary">
                Код: {shareCode.code}, истекает {formatExpiry(shareCode.expiresAt)}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(`${shareCode.servicePhone}, ${shareCode.code}`)}
                aria-label="Скопировать"
                className="ml-md flex-shrink-0 text-text-muted"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>

            <p className="mt-lg text-center text-app-body-sm text-text-muted">
              Отправьте код через любое удобное приложение
            </p>

            <div className="mt-lg grid grid-cols-4 gap-sm text-center">
              {['Telegram', 'WhatsApp', 'СМС', 'Почта'].map((app) => (
                <div key={app} className="flex flex-col items-center gap-xs">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted">
                    <span className="text-app-caption text-text-muted">{app[0]}</span>
                  </div>
                  <span className="text-app-caption text-text-muted">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Закрыть меню при клике вне */}
      {openMenuCodeId !== null && (
        <div
          className="fixed inset-0 z-[9]"
          onClick={() => setOpenMenuCodeId(null)}
        />
      )}
    </>
  )
}
