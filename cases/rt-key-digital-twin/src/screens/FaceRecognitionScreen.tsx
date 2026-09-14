import { useState } from 'react'
import { useAppContext } from '../app/AppContext'

const MAX_FACE_PHOTOS = 3

function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function FaceRecognitionScreen() {
  const { navigate } = useAppContext()
  const [facePhotos, setFacePhotos] = useState<string[]>([])

  const canAddMore = facePhotos.length < MAX_FACE_PHOTOS

  function handleAddPhoto() {
    if (!canAddMore) return
    setFacePhotos((prev) => [...prev, `face-${prev.length + 1}`])
  }

  return (
    <div className="-mx-layout-x">
      <header className="flex items-center gap-md px-layout-x py-md">
        <button
          onClick={() => navigate({ id: 'intercom-devices' })}
          aria-label="Закрыть"
          className="flex h-8 w-8 items-center justify-center text-primary"
        >
          <CloseIcon />
        </button>
        <h1 className="text-app-section font-semibold text-text-primary">
          Распознавание лица
        </h1>
      </header>

      <section className="px-layout-x pt-md">
        <h2 className="text-app-body-lg font-bold text-text-primary">
          Добавьте фото, чтобы домофон вас узнал
        </h2>
        <p className="mt-sm text-app-body-sm text-text-secondary">
          Можем добавить фото не более 3-х членов семьи
        </p>

        <div className="mt-lg grid grid-cols-3 gap-md">
          {facePhotos.map((photo) => (
            <div
              key={photo}
              className="aspect-square rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200"
            />
          ))}

          {canAddMore && (
            <button
              onClick={handleAddPhoto}
              aria-label="Добавить фото"
              className="flex aspect-square items-center justify-center rounded-2xl bg-surface-muted"
            >
              <PlusIcon />
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
