import { useState, useRef, useEffect } from 'react'

export type ActionState = 'default' | 'loading' | 'success' | 'error'

/** Длительность показа состояния success перед сбросом в default */
const SUCCESS_RESET_MS = 3000

/**
 * Хук для управляемых симулируемых асинхронных действий.
 * После вызова execute() переходит в loading → result → default (для success).
 * Для error состояние не сбрасывается автоматически — компонент явно вызывает reset().
 */
export function useSimulatedAction(delayMs: number): {
  actionState: ActionState
  execute: (result?: 'success' | 'error', onSettled?: (r: 'success' | 'error') => void) => void
  reset: () => void
} {
  const [actionState, setActionState] = useState<ActionState>('default')
  const timerActionRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerResetRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerActionRef.current) clearTimeout(timerActionRef.current)
      if (timerResetRef.current) clearTimeout(timerResetRef.current)
    }
  }, [])

  function execute(
    result: 'success' | 'error' = 'success',
    onSettled?: (r: 'success' | 'error') => void,
  ) {
    if (actionState !== 'default') return

    if (timerActionRef.current) clearTimeout(timerActionRef.current)
    if (timerResetRef.current) clearTimeout(timerResetRef.current)

    setActionState('loading')

    timerActionRef.current = setTimeout(() => {
      setActionState(result)
      onSettled?.(result)

      if (result === 'success') {
        timerResetRef.current = setTimeout(() => setActionState('default'), SUCCESS_RESET_MS)
      }
    }, delayMs)
  }

  function reset() {
    if (timerActionRef.current) clearTimeout(timerActionRef.current)
    if (timerResetRef.current) clearTimeout(timerResetRef.current)
    setActionState('default')
  }

  return { actionState, execute, reset }
}
