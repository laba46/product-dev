import { useAppContext } from '../app/AppContext'

function ChevronRight() {
  return (
    <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

function SettingsLinkRow({
  title,
  description,
  onClick,
  badge,
}: {
  title: string
  description: string
  onClick?: () => void
  badge?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-lg py-xl text-left"
    >
      <div className="min-w-0 flex-1">
        <h2 className="text-[20px] font-medium leading-[1.18] text-text-primary">{title}</h2>
        <p className="mt-sm whitespace-pre-line text-[16px] leading-[1.45] text-[#c3c7d1]">{description}</p>
        {badge && (
          <span className="mt-md inline-flex rounded-full bg-[#ffe1e4] px-md py-xs text-[16px] font-medium text-[#ff3030]">
            {badge}
          </span>
        )}
      </div>
      <ChevronRight />
    </button>
  )
}

export function SystemSettingsScreen() {
  const { navigate } = useAppContext()

  return (
    <div className="pb-xl">
      <header className="relative flex items-center justify-center pb-md pt-xs">
        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => navigate({ id: 'call-settings' })}
          className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center text-primary"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h1 className="text-[22px] font-bold leading-[1.15] text-text-primary">Системные настройки</h1>
      </header>

      <section className="mt-sm divide-y divide-border rounded-[20px] bg-surface px-lg">
        <SettingsLinkRow
          title="Режим Энергосбережения"
          description="Чтобы принимать звонки с домофона, отключите режим энергосбережения"
          badge="Вкл"
          onClick={() => navigate({ id: 'call-permissions' })}
        />
        <SettingsLinkRow
          title="Обновите разрешение на звонки"
          description={
            'Зайдите в настройки телефона -> Приложения -> Приложение Ключ -> Разрешения -> Запретите в настройках Телефон -> Разрешите в настройках Телефон снова'
          }
          onClick={() => navigate({ id: 'call-permissions' })}
        />
        <SettingsLinkRow
          title="Если ничего не помогло"
          description="Следуйте инструкции из FAQ"
          onClick={() => navigate({ id: 'support-faq' })}
        />
      </section>
    </div>
  )
}
