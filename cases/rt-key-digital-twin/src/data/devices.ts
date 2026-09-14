export type DeviceType = 'intercom' | 'barrier'

export type DeviceStatus = 'online' | 'offline' | 'error'

export type Device = {
  id: string
  type: DeviceType
  name: string
  status: DeviceStatus
  isOnline: boolean
  isFavorite: boolean
  /** Серийный номер — отображается на экране настроек */
  serialNumber: string
  previewImage?: string
}

export const devices: Device[] = [
  {
    id: 'barrier-1',
    type: 'barrier',
    name: 'Шлагбаум',
    status: 'online',
    isOnline: true,
    isFavorite: false,
    serialNumber: 'b25a7390f12c',
  },
  {
    id: 'intercom-1',
    type: 'intercom',
    name: 'Домофон',
    status: 'online',
    isOnline: true,
    isFavorite: false,
    serialNumber: '0c11051a6c89',
  },
]
