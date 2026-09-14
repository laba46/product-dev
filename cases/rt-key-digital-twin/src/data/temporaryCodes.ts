export type CodeDuration = '24_hours' | '3_days' | '7_days' | '14_days'

export type CodeStatus = 'active' | 'revoked' | 'expired'

export type TemporaryCode = {
  id: string
  deviceId: string
  /** PIN-код для набора (5 цифр), например '25462' */
  code: string
  /** Единый сервисный номер для набора */
  servicePhone: string
  expiresAt: string
  createdAt: string
  duration: CodeDuration
  status: CodeStatus
  revokedAt?: string
}

export const SERVICE_PHONE = '+7 (800) 301-72-17'

export const temporaryCodes: TemporaryCode[] = [
  {
    id: 'code-1',
    deviceId: 'barrier-1',
    code: '25462',
    servicePhone: SERVICE_PHONE,
    expiresAt: '2026-04-27T22:26:00Z',
    createdAt: '2026-04-26T22:26:00Z',
    duration: '24_hours',
    status: 'active',
  },
  {
    id: 'code-2',
    deviceId: 'intercom-1',
    code: '47291',
    servicePhone: SERVICE_PHONE,
    expiresAt: '2026-04-22T12:00:00Z',
    createdAt: '2026-04-21T12:00:00Z',
    duration: '24_hours',
    status: 'revoked',
    revokedAt: '2026-04-22T10:15:00Z',
  },
]
