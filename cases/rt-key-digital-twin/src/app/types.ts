export type UserTariff = 'base' | 'premium'

export type Screen =
  | { id: 'home' }
  | { id: 'devices' }
  | { id: 'services' }
  | { id: 'profile' }
  | { id: 'intercom-devices' }
  | { id: 'intercom'; deviceId?: string }
  | { id: 'intercom-archive' }
  | { id: 'rename-intercom'; deviceId: string }
  | { id: 'face-recognition' }
  | { id: 'cameras' }
  | { id: 'camera-details'; cameraId: string }
  | { id: 'temporary-codes' }
  | { id: 'code-details'; codeId: string }
  | { id: 'temporary-code-info' }
  | { id: 'call-settings' }
  | { id: 'system-settings' }
  | { id: 'call-permissions' }
  | { id: 'support-faq' }
  | { id: 'active-call' }
  | { id: 'history' }
  | { id: 'history-event'; eventId: string }

export type MainNavScreenId = 'home' | 'devices' | 'services' | 'profile'

export const MAIN_NAV_SCREEN_IDS: MainNavScreenId[] = [
  'home',
  'devices',
  'services',
  'profile',
]
