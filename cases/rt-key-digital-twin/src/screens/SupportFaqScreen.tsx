import { useState } from 'react'
import { useAppContext } from '../app/AppContext'

const POPULAR_QUESTIONS = [
  'Хочу купить ключ от домофона',
  'Хочу сменить номер телефона для входа',
  'Не проходит звонок в приложении',
  'Не работает ключ',
  'Дверь не открывается трубкой',
  'Хочу поделиться учётной записью с членами семьи',
  'Как добавить виджет на главный экран телефона',
]

const CATEGORIES = [
  { label: 'Оплата', icon: 'wallet' },
  { label: 'Аккаунт', icon: 'profile' },
  { label: 'Видео-\nнаблюдение', icon: 'camera' },
  { label: 'Шлагбаум', icon: 'barrier' },
  { label: 'Умный\nдомофон', icon: 'intercom' },
  { label: 'Умные\nсчетчики', icon: 'meter' },
  { label: 'Умный\nдоступ', icon: 'lock' },
] as const

function CategoryIcon({ type }: { type: (typeof CATEGORIES)[number]['icon'] }) {
  const className = 'h-11 w-11 text-primary'

  switch (type) {
    case 'wallet':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v14H6.5A2.5 2.5 0 0 1 4 16.5v-9z" />
          <path d="M18 9h2v6h-2" />
          <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'profile':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.4-3.2 4-4.8 7-4.8S17.6 16.8 19 20" />
        </svg>
      )
    case 'camera':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 17V9l8-5 8 5v8" />
          <path d="M9 13a3 3 0 0 1 6 0" />
          <path d="M12 13l5 5" />
        </svg>
      )
    case 'barrier':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 18V8" />
          <path d="M5 8h11l3 3" />
          <path d="M10 18h9" />
        </svg>
      )
    case 'intercom':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <line x1="10" y1="8" x2="14" y2="8" />
          <circle cx="12" cy="16" r="1.5" />
        </svg>
      )
    case 'meter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 12h8" />
          <path d="M12 12l3-4" />
        </svg>
      )
    case 'lock':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="6" y="11" width="12" height="9" rx="2" />
          <path d="M9 11V8a3 3 0 0 1 6 0v3" />
        </svg>
      )
  }
}

function BrowserActionDots() {
  return (
    <svg className="h-6 w-6 text-text-primary" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  )
}

export function SupportFaqScreen() {
  const { navigate } = useAppContext()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="-mx-layout-x min-h-screen bg-[#f5f6fb] pb-xl">
      <header className="border-b border-border bg-surface px-layout-x py-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            <button type="button" onClick={() => navigate({ id: 'system-settings' })} className="text-text-primary">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button type="button" onClick={() => navigate({ id: 'system-settings' })} className="text-text-primary">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <polyline points="7 10 12 15 17 10" />
              </svg>
            </button>
            <div>
              <p className="text-[22px] leading-[1.1] text-text-primary">FAQ</p>
              <p className="mt-xxs text-app-body-sm text-text-secondary">key-offer.rt.ru</p>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <svg className="h-6 w-6 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="18" cy="5" r="2" />
              <circle cx="6" cy="12" r="2" />
              <circle cx="18" cy="19" r="2" />
              <line x1="8" y1="12" x2="16" y2="6" />
              <line x1="8" y1="12" x2="16" y2="18" />
            </svg>
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-text-primary/30 text-[13px] font-semibold text-text-primary">
              G文
            </div>
            <BrowserActionDots />
          </div>
        </div>
      </header>

      <div className="px-layout-x py-xl">
        <div className="flex items-center gap-sm">
          <div className="h-8 w-8 rotate-45 rounded-[6px] bg-gradient-to-br from-primary to-orange-500" />
          <span className="text-[18px] font-semibold text-text-primary">Ростелеком Ключ</span>
        </div>

        <h1 className="mt-2xl text-[34px] font-bold leading-[1.05] text-text-primary">Чем мы можем помочь?</h1>

        <section className="mt-2xl">
          <h2 className="text-[24px] font-semibold text-text-primary">Популярные вопросы</h2>
          <div className="mt-lg flex flex-col gap-md">
            {POPULAR_QUESTIONS.map((question) => {
              const isOpen = expanded === question
              return (
                <button
                  key={question}
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : question)}
                  className="flex w-full items-start gap-md rounded-[6px] bg-surface px-lg py-lg text-left"
                >
                  <span className="min-w-0 flex-1 whitespace-pre-line text-[18px] leading-[1.25] text-text-primary">{question}</span>
                  <span className="mt-xxs text-[42px] font-thin leading-none text-[#9fa3ad]">{isOpen ? '−' : '+'}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-2xl">
          <h2 className="text-[24px] font-semibold text-text-primary">Вопросы по категориям</h2>
          <div className="mt-xl grid grid-cols-2 gap-y-2xl">
            {CATEGORIES.map((category) => (
              <button key={category.label} type="button" className="flex flex-col items-center gap-md text-center">
                <CategoryIcon type={category.icon} />
                <span className="whitespace-pre-line text-[18px] leading-[1.2] text-text-primary">{category.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
