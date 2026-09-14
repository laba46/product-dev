import { useAppContext } from '../app/AppContext'
import { CameraTile } from '../components/features/CameraTile'
import { RtHeader } from '../components/ui/RtHeader'
import { RtSectionTitle } from '../components/ui/RtSectionTitle'
import { cameras } from '../data/cameras'

export function CamerasScreen() {
  const { navigate } = useAppContext()

  return (
    <>
      <RtHeader title="Камеры" onBack={() => navigate({ id: 'devices' })} />

      <section className="mt-section">
        <RtSectionTitle title="Общедомовые и придомовые" />
        <div className="mt-md grid grid-cols-2 gap-card">
          {cameras.map((camera) => (
            <div
              key={camera.id}
              onClick={() => navigate({ id: 'camera-details', cameraId: camera.id })}
              className="cursor-pointer"
            >
              <CameraTile title={camera.name} isOnline={camera.isOnline} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
