export type HistoryEventType =
  | 'door_opened'
  | 'door_open_failed'
  | 'incoming_call'
  | 'incoming_call_answered_audio'
  | 'incoming_call_answered_video'
  | 'incoming_call_door_opened'
  | 'incoming_call_dismissed'
  | 'missed_call'
  | 'code_created'
  | 'code_used'
  | 'device_offline'

export type HistoryResult = 'success' | 'error' | 'info'

export type HistoryEvent = {
  id: string
  deviceId: string
  timestamp: string
  eventType: HistoryEventType
  result: HistoryResult
  description: string
  snapshotUrl?: string
  codeId?: string
  errorCode?: string
}

export const historyEvents: HistoryEvent[] = [
  {
    id: 'evt-1',
    deviceId: 'intercom-1',
    timestamp: '2026-04-23T10:15:00Z',
    eventType: 'door_opened',
    result: 'success',
    description: 'Дверь успешно открыта',
  },
  {
    id: 'evt-2',
    deviceId: 'intercom-1',
    timestamp: '2026-04-23T09:30:00Z',
    eventType: 'incoming_call',
    result: 'info',
    description: 'Входящий звонок — принят',
  },
  {
    id: 'evt-3',
    deviceId: 'intercom-1',
    timestamp: '2026-04-22T18:45:00Z',
    eventType: 'missed_call',
    result: 'info',
    description: 'Пропущенный звонок',
  },
  {
    id: 'evt-4',
    deviceId: 'intercom-1',
    timestamp: '2026-04-22T14:00:00Z',
    eventType: 'door_open_failed',
    result: 'error',
    description: 'Ошибка открытия двери',
    errorCode: 'ERR_CONNECTION_TIMEOUT',
  },
  {
    id: 'evt-5',
    deviceId: 'intercom-1',
    timestamp: '2026-04-21T22:10:00Z',
    eventType: 'device_offline',
    result: 'error',
    description: 'Устройство недоступно',
  },
  {
    id: 'evt-6',
    deviceId: 'intercom-1',
    timestamp: '2026-04-21T12:00:00Z',
    eventType: 'code_created',
    result: 'success',
    description: 'Создан временный код',
    codeId: 'code-1',
  },
  {
    id: 'evt-7',
    deviceId: 'intercom-1',
    timestamp: '2026-04-21T13:30:00Z',
    eventType: 'code_used',
    result: 'success',
    description: 'Временный код использован',
    codeId: 'code-1',
  },
]
