import { useState } from 'react'

const MONTH_NAMES_FULL = [
  'ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ',
  'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ',
]

const MONTH_NAMES_SHORT = [
  'янв.', 'февр.', 'мар.', 'апр.', 'мая', 'июня',
  'июля', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.',
]

const WEEK_DAYS = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В']

type DatePickerModalProps = {
  isOpen: boolean
  initialDate: Date
  onConfirm: (date: Date) => void
  onCancel: () => void
}

function getMonthMatrix(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const totalDays = lastDay.getDate()
  // JS: 0=вс ... 6=сб; Нам нужен 0=пн ... 6=вс
  const firstWeekday = (firstDay.getDay() + 6) % 7

  const cells: (number | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const matrix: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) matrix.push(cells.slice(i, i + 7))
  return matrix
}

export function DatePickerModal({ isOpen, initialDate, onConfirm, onCancel }: DatePickerModalProps) {
  const [viewYear, setViewYear] = useState(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth())
  const [selected, setSelected] = useState<Date>(initialDate)

  if (!isOpen) return null

  const matrix = getMonthMatrix(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  function handleSelectDay(day: number) {
    setSelected(new Date(viewYear, viewMonth, day))
  }

  const selectedLabel = `${selected.getDate()} ${MONTH_NAMES_SHORT[selected.getMonth()]} ${selected.getFullYear()} г.`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-md">
      <div className="w-full max-w-[340px] overflow-hidden rounded-2xl bg-surface shadow-2xl">
        {/* Шапка с выбранной датой — фиолетовая */}
        <div className="bg-primary px-lg pb-md pt-md">
          <p className="text-app-caption font-bold uppercase tracking-wider text-white/85">
            Выберите дату
          </p>
          <div className="mt-sm flex items-center justify-between">
            <p className="text-3xl font-semibold text-white">{selectedLabel}</p>
            <svg className="h-5 w-5 text-white/85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        </div>

        {/* Навигация по месяцам */}
        <div className="flex items-center justify-between px-md pt-md">
          <button className="flex items-center gap-xs text-app-caption font-medium uppercase tracking-wide text-text-primary">
            {MONTH_NAMES_FULL[viewMonth]} {viewYear} Г.
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className="flex items-center gap-md">
            <button onClick={prevMonth} aria-label="Предыдущий месяц">
              <svg className="h-5 w-5 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button onClick={nextMonth} aria-label="Следующий месяц">
              <svg className="h-5 w-5 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Дни недели */}
        <div className="grid grid-cols-7 px-md pt-md text-center">
          {WEEK_DAYS.map((d, i) => (
            <span key={i} className="text-app-caption text-text-muted">{d}</span>
          ))}
        </div>

        {/* Сетка дней */}
        <div className="grid grid-cols-7 gap-y-xs px-md pt-sm pb-md text-center">
          {matrix.flat().map((day, i) => {
            if (day === null) return <div key={i} />
            const isSelected =
              selected.getDate() === day &&
              selected.getMonth() === viewMonth &&
              selected.getFullYear() === viewYear
            return (
              <button
                key={i}
                onClick={() => handleSelectDay(day)}
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-app-body-sm ${
                  isSelected
                    ? 'bg-primary font-semibold text-white'
                    : 'text-text-primary'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-lg px-md pb-md">
          <button
            onClick={onCancel}
            className="text-app-body-sm font-bold uppercase tracking-wide text-primary"
          >
            Отмена
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="text-app-body-sm font-bold uppercase tracking-wide text-primary"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  )
}
