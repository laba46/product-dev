import { useAppContext } from '../app/AppContext'
import { RtButton } from '../components/ui/RtButton'
import { RtHeader } from '../components/ui/RtHeader'
import { RtSectionTitle } from '../components/ui/RtSectionTitle'
import { cameras } from '../data/cameras'

type CameraDetailsScreenProps = {
  cameraId: string
}

export function CameraDetailsScreen({ cameraId }: CameraDetailsScreenProps) {
  const { navigate } = useAppContext()
  const camera = cameras.find((c) => c.id === cameraId)

  if (!camera) return null

  return (
    <>
      <RtHeader title={camera.name} onBack={() => navigate({ id: 'cameras' })} />

      <div className="mt-md flex items-center gap-sm">
        <span
          className={`h-2 w-2 rounded-full ${camera.isOnline ? 'bg-success' : 'bg-error'}`}
        />
        <p className="text-app-body-sm text-text-secondary">
          {camera.isOnline ? `${camera.location} · В сети` : `${camera.location} · Недоступна`}
        </p>
      </div>

      <section className="mt-section">
        <RtSectionTitle title="Live-видео" />
        <div className="mt-md flex h-camera-card items-center justify-center rounded-md bg-surface-inverse">
          {camera.isOnline ? (
            <p className="text-app-body-sm text-surface opacity-60">Прямой эфир</p>
          ) : (
            <p className="text-app-body-sm text-surface opacity-60">Камера недоступна</p>
          )}
        </div>
      </section>

      <div className="mt-md">
        <RtButton
          label={camera.isFavorite ? 'В избранном' : 'Добавить в избранное'}
          variant="secondary"
          fullWidth
          disabled={camera.isFavorite}
        />
      </div>
    </>
  )
}
