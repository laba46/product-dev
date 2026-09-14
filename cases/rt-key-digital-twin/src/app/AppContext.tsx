import { createContext, useContext } from 'react'
import type { Screen, UserTariff } from './types'
import type { HistoryEvent } from '../data/history'
import type { TemporaryCode } from '../data/temporaryCodes'
import type { Dispatch, SetStateAction } from 'react'

export type PremiumBottomSheetState = {
  featureTitle: string
  featureDescription: string
}

export type IncomingCallStage = 'incoming' | 'connecting' | 'video'

export type IncomingCallState = {
  deviceName: string
  sourceLabel: string
  stage: IncomingCallStage
  durationSec: number
  videoUrl?: string
}

export type AppContextValue = {
  screen: Screen
  navigate: (screen: Screen) => void
  userTariff: UserTariff
  setUserTariff: (tariff: UserTariff) => void
  incomingCall: IncomingCallState | null
  setIncomingCall: Dispatch<SetStateAction<IncomingCallState | null>>
  historyEvents: HistoryEvent[]
  addHistoryEvent: (event: Omit<HistoryEvent, 'id' | 'timestamp'>) => void
  intercomIsFavorite: boolean
  setIntercomIsFavorite: (value: boolean) => void
  /** null — bottom sheet скрыт */
  premiumBottomSheet: PremiumBottomSheetState | null
  showPremiumBottomSheet: (state: PremiumBottomSheetState) => void
  hidePremiumBottomSheet: () => void
  temporaryCodes: TemporaryCode[]
  createTemporaryCode: (deviceId: string) => void
  deleteTemporaryCode: (codeId: string) => void
  /** Возвращает актуальное имя устройства (с учётом ручного переименования) */
  getDeviceName: (deviceId: string, fallback: string) => string
  renameDevice: (deviceId: string, newName: string) => void
  /** Глобальная настройка «Принимать звонки» из экрана CallSettings */
  callsEnabled: boolean
  setCallsEnabled: (enabled: boolean) => void
  callScheduleEnabled: boolean
  setCallScheduleEnabled: (enabled: boolean) => void
  intercomCallsEnabled: boolean
  setIntercomCallsEnabled: (enabled: boolean) => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext)
  if (ctx === null) {
    throw new Error('useAppContext must be used within AppShell')
  }
  return ctx
}
