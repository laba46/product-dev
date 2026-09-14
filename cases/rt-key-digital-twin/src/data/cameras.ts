export type Camera = {
  id: string
  name: string
  location: string
  isOnline: boolean
  isFavorite: boolean
  previewImage?: string
}

export const cameras: Camera[] = [
  {
    id: 'cam-1',
    name: 'Гостиная – окно',
    location: 'Квартира',
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 'cam-2',
    name: 'Гостиная – вход',
    location: 'Квартира',
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 'cam-3',
    name: 'Парковка',
    location: 'Двор',
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 'cam-4',
    name: 'Домофон',
    location: 'Подъезд',
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 'cam-5',
    name: 'Детская площадка',
    location: 'Двор',
    isOnline: false,
    isFavorite: false,
  },
]
