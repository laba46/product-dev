import { useAppContext } from '../app/AppContext'
import type { UserTariff } from '../app/types'
import { getTariffCapabilities } from '../config/tariffCapabilities'

const TARIFFS: { id: UserTariff; title: string; description: string }[] = [
  {
    id: 'base',
    title: 'Базовый',
    description: 'Аудиоответ, live-домофон и открытие двери.',
  },
  {
    id: 'premium',
    title: 'Premium',
    description: 'Видеоответ и архив домофона за 7 дней.',
  },
]

export function ProfileScreen() {
  const { userTariff, setUserTariff } = useAppContext()
  const capabilities = getTariffCapabilities(userTariff)

  return (
    <>
      <header className="pb-xxs">
        <h1 className="text-app-hero font-bold text-text-primary">Профиль</h1>
        <p className="mt-xs text-app-body-sm text-text-muted">
          Технический переключатель тарифа для проверки MVP-сценариев.
        </p>
      </header>

      <section className="mt-section">
        <h2 className="text-app-section font-bold text-text-primary">Тариф</h2>
        <div className="mt-md flex flex-col gap-sm">
          {TARIFFS.map((tariff) => {
            const isActive = tariff.id === userTariff
            return (
              <button
                key={tariff.id}
                type="button"
                onClick={() => setUserTariff(tariff.id)}
                className={`rounded-md border px-md py-card text-left ${
                  isActive
                    ? 'border-primary bg-primary/10'
                    : 'border-border-subtle bg-surface-muted'
                }`}
              >
                <span className="flex items-center justify-between gap-md">
                  <span className="text-app-body font-semibold text-text-primary">
                    {tariff.title}
                  </span>
                  {isActive && (
                    <span className="rounded-md bg-primary px-sm py-xxs text-app-caption font-semibold text-white">
                      Активен
                    </span>
                  )}
                </span>
                <span className="mt-xs block text-app-body-sm text-text-muted">
                  {tariff.description}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="mt-section rounded-md border border-border-subtle bg-surface-muted px-md py-card">
        <h2 className="text-app-subtitle font-semibold text-text-primary">
          Возможности сейчас
        </h2>
        <ul className="mt-sm flex flex-col gap-xs text-app-body-sm text-text-secondary">
          <li>Аудиоответ: {capabilities.canAnswerAudioCall ? 'доступен' : 'недоступен'}</li>
          <li>Видеоответ: {capabilities.canAnswerVideoCall ? 'доступен' : 'Premium'}</li>
          <li>Архив домофона: {capabilities.canAccessIntercomArchive ? 'доступен' : 'Premium'}</li>
        </ul>
      </section>
    </>
  )
}
