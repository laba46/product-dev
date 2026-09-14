import { useAppContext } from '../app/AppContext'
import { RtToggle } from '../components/ui/RtToggle'

function Row({
  label,
  value,
  muted = false,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <button type="button" className="flex w-full items-center justify-between py-lg text-left">
      <span className="text-[19px] leading-[1.18] text-text-primary">{label}</span>
      <span className={`text-[16px] leading-[1.25] ${muted ? 'text-[#c3c7d1]' : 'text-text-secondary'}`}>{value}</span>
    </button>
  )
}

export function CallPermissionsScreen() {
  const { navigate } = useAppContext()

  return (
    <div className="-mx-layout-x min-h-screen bg-[#f5f6fb] px-layout-x pb-[120px]">
      <header className="flex items-center justify-between py-md">
        <button type="button" onClick={() => navigate({ id: 'system-settings' })} className="text-text-primary">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <button type="button" className="text-text-primary">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </header>

      <h1 className="text-[32px] font-normal leading-[1.08] text-text-primary">О приложении</h1>

      <section className="mt-lg rounded-[24px] bg-surface px-lg py-lg">
        <div className="flex items-start gap-md">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[20px] border border-border bg-surface">
            <div className="h-12 w-12 rotate-45 rounded-[10px] bg-gradient-to-br from-primary to-orange-500" />
          </div>
          <div>
            <h2 className="text-[20px] font-medium text-text-primary">Ключ</h2>
            <p className="mt-xs text-[18px] text-text-secondary">Версия: 2.38.1</p>
          </div>
        </div>

        <div className="mt-md divide-y divide-border">
          <Row label="Память" value="85,49 МБ" />
          <Row label="Доступ к сети" value="Использование данных 97,3 МБ" muted />
          <Row label="Питание" value="Потребление энергии 1,4%" muted />
        </div>
      </section>

      <p className="mt-lg text-[16px] text-[#a7acb9]">Разрешения</p>

      <section className="mt-sm rounded-[24px] bg-surface px-lg py-lg">
        <div className="flex items-start justify-between gap-md">
          <div className="min-w-0 flex-1">
            <h2 className="text-[19px] leading-[1.25] text-text-primary">
              Приостановить работу приложения, если оно не используется
            </h2>
            <p className="mt-xs text-[16px] leading-[1.38] text-text-secondary">
              Отмена разрешений, удаление временных файлов и остановка уведомлений
            </p>
          </div>
          <RtToggle checked ariaLabel="Приостановить работу приложения" />
        </div>

        <div className="mt-md divide-y divide-border">
          <Row label="Разрешения приложений" value="" muted />
          <Row label="Другие разрешения" value="" muted />
          <Row label="Уведомления" value="Да" />
        </div>
      </section>

      <p className="mt-lg text-[16px] text-[#a7acb9]">Расширенные настройки</p>

      <section className="mt-sm rounded-[24px] bg-surface px-lg py-lg">
        <div className="divide-y divide-border">
          <Row label="Сброс действий по умолчанию" value="" muted />
          <div className="flex items-start justify-between gap-md py-lg">
            <div className="min-w-0 flex-1">
              <h2 className="text-[19px] leading-[1.25] text-text-primary">Разрешить запрещенные настройки</h2>
            </div>
            <RtToggle checked={false} ariaLabel="Разрешить запрещенные настройки" />
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 left-1/2 flex w-full max-w-mobile -translate-x-1/2 justify-around border-t border-border bg-surface px-layout-x py-md">
        {[
          ['Закрыть', '×'],
          ['Удалить', '🗑'],
          ['Очистить', '⌫'],
        ].map(([label, icon]) => (
          <button key={label} type="button" className="flex flex-col items-center gap-xs text-text-primary">
            <span className="text-[30px] leading-none">{icon}</span>
            <span className="text-app-body-sm">{label}</span>
          </button>
        ))}
      </footer>
    </div>
  )
}
