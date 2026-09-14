import { useAppContext } from '../app/AppContext'

type FaqItem = {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Зачем нужен временный код?',
    answer:
      'Кодом можно открывать домофоны и шлагбаумы в течение 24 часов. Это удобно, например, когда нужно пустить гостей или курьера.',
  },
  {
    question: 'Почему код действует только 24 часа?',
    answer:
      'Ограничение по времени нужно, чтобы по нему в ваш подъезд не заходили посторонние люди, а во дворе не парковались посторонние автомобили. Но вы можете удалить его и раньше. Например, через два часа после создания. А спустя 24 часа вы можете создать новый.',
  },
  {
    question: 'Можно ли создавать несколько кодов сразу?',
    answer:
      'Нет, на одну квартиру можно создать только один код.',
  },
  {
    question: 'Почему мой код открывает не все домофоны и шлагбаумы?',
    answer:
      'Возможны две причины:\n1. Если код не открывал домофон и раньше, то, скорее всего, домофон просто «не умный» и не умеет считывать наши коды;\n2. Если же раньше код открывал домофон или шлагбаум, а сейчас не открывает, то, похоже, устройство неисправно. Рекомендуем обратиться к нам по номеру 8‑800‑301‑05‑50.',
  },
]

export function TemporaryCodeInfoScreen() {
  const { navigate } = useAppContext()

  return (
    <div className="pb-xl">
      <header className="flex items-center gap-md pb-md">
        <button
          onClick={() => navigate({ id: 'home' })}
          aria-label="Закрыть"
          className="flex h-8 w-8 items-center justify-center text-primary"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h1 className="text-app-section font-bold text-text-primary">О временном коде</h1>
      </header>

      <div className="flex flex-col gap-xl">
        {FAQ_ITEMS.map((item) => (
          <div key={item.question}>
            <h2 className="text-app-body-sm font-bold leading-snug text-text-primary">
              {item.question}
            </h2>
            <p className="mt-sm whitespace-pre-line text-app-body-sm leading-relaxed text-text-secondary">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
