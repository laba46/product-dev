type CameraTileProps = {
  title: string
  isOnline?: boolean
}

export function CameraTile({ title, isOnline = true }: CameraTileProps) {
  return (
    <article className="relative overflow-hidden rounded-lg bg-[#1a1a2e]" style={{ aspectRatio: '4 / 3' }}>
      {/* Имитация тёмного видео-фона */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      {!isOnline && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <span className="text-app-caption text-white/60">Недоступна</span>
        </div>
      )}

      <p className="absolute bottom-md left-md text-app-body-sm font-medium text-white drop-shadow-sm">
        {title}
      </p>
    </article>
  )
}
