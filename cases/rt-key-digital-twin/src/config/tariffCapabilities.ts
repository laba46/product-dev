import type { UserTariff } from '../app/types'

export type TariffCapabilities = {
  /** Ответить на входящий звонок по аудио */
  canAnswerAudioCall: boolean
  /** Ответить на входящий звонок по видео */
  canAnswerVideoCall: boolean
  /** Открыть дверь сразу при входящем звонке, без ответа на вызов */
  canOpenDoorDuringIncomingCall: boolean
  /** Открыть архив видео домофона */
  canAccessIntercomArchive: boolean
  /** Глубина архива домофона в днях */
  intercomArchiveDays: number
}

const CAPABILITIES: Record<UserTariff, TariffCapabilities> = {
  base: {
    canAnswerAudioCall: true,
    canAnswerVideoCall: false,
    canOpenDoorDuringIncomingCall: true,
    canAccessIntercomArchive: false,
    intercomArchiveDays: 0,
  },
  premium: {
    canAnswerAudioCall: true,
    canAnswerVideoCall: true,
    canOpenDoorDuringIncomingCall: true,
    canAccessIntercomArchive: true,
    intercomArchiveDays: 7,
  },
}

export function getTariffCapabilities(tariff: UserTariff): TariffCapabilities {
  return CAPABILITIES[tariff]
}
