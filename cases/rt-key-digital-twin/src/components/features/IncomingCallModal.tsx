import { CallActionButton } from './CallActionButton'

type IncomingCallModalProps = {
  isOpen: boolean
  deviceName: string
  sourceLabel: string
  canAnswerAudio: boolean
  canAnswerVideo: boolean
  canOpenDoor: boolean
  onAnswerAudio: () => void
  onAnswerVideo: () => void
  onBlockedVideo: () => void
  onOpenDoor: () => void
  onDismiss: () => void
}

function BellSlashIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M15 17H6l1.4-1.4A2 2 0 0 0 8 14.2V11a4 4 0 0 1 2.3-3.6" />
      <path d="M14 5.3A4 4 0 0 1 16 8.9v5.3c0 .5.2 1 .6 1.4L18 17h-1.5" />
      <line x1="4" y1="4" x2="20" y2="20" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function DeclineIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.2 8.6c4.2-1.9 7.4-1.9 11.6 0 .9.4 1.3 1.5.8 2.4l-1.2 2.2c-.3.6-1 .9-1.7.8l-2.6-.7a1.4 1.4 0 0 0-1.2.2l-1.5 1.1a1.4 1.4 0 0 1-1.2.2l-2.6-.8a1.4 1.4 0 0 1-.9-.8l-1.2-2.2c-.5-.9-.1-2 .7-2.4z" />
    </svg>
  )
}

function AnswerIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.1 18.2c4 1.7 5.8 1.7 9.8 0 .9-.4 1.3-1.5.9-2.4L16.4 13c-.3-.6-1-.9-1.6-.8l-2 .5a1.5 1.5 0 0 1-1.1-.2l-1.6-1.1a1.5 1.5 0 0 0-1.1-.2l-2 .5c-.7.1-1.3-.2-1.6-.8L4.2 15.8c-.4.9 0 2 .9 2.4z" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h7A2.5 2.5 0 0 1 16 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 16.5v-9z" />
      <path d="m17 10 3.2-2.2A.5.5 0 0 1 21 8.2v7.6a.5.5 0 0 1-.8.4L17 14v-4z" />
    </svg>
  )
}

function DoorUnlockIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
      <rect x="7" y="11" width="10" height="8" rx="2" />
      <path d="M10 11V8a3 3 0 0 1 5-2" />
    </svg>
  )
}

export function IncomingCallModal({
  isOpen,
  deviceName,
  sourceLabel,
  canAnswerAudio,
  canAnswerVideo,
  canOpenDoor,
  onAnswerAudio,
  onAnswerVideo,
  onBlockedVideo,
  onOpenDoor,
  onDismiss,
}: IncomingCallModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-[radial-gradient(circle_at_50%_78%,rgba(167,120,108,0.24),transparent_28%),linear-gradient(180deg,#1f2936_0%,#2f3847_48%,#434554_100%)] text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Входящий звонок"
    >
      <div className="flex min-h-screen flex-col px-layout-x pb-2xl pt-xl">
        <div>
          <h1 className="text-[22px] font-medium leading-[1.15]">{deviceName}</h1>
          <div className="mt-sm flex items-center gap-xs text-app-body-sm text-white/78">
            <span className="inline-block h-3 w-3 rotate-45 rounded-[2px] bg-[linear-gradient(135deg,#ffcc2f,#7700ff)]" />
            <span>{sourceLabel}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="mb-2xl flex justify-center gap-2xl">
            <CallActionButton icon={<BellSlashIcon />} label="Напомнить" tone="dark" size="sm" />
            <CallActionButton icon={<MessageIcon />} label="Сообщение" tone="dark" size="sm" />
          </div>

          <div className="mb-2xl flex justify-center gap-xl">
            {canAnswerAudio && (
              <CallActionButton
                icon={<AnswerIcon />}
                label="Аудио"
                tone="accent"
                size="sm"
                onClick={onAnswerAudio}
              />
            )}
            <CallActionButton
              icon={<VideoIcon />}
              label="Видео"
              tone={canAnswerVideo ? 'accent' : 'dark'}
              size="sm"
              onClick={canAnswerVideo ? onAnswerVideo : onBlockedVideo}
            />
            {canOpenDoor && (
              <CallActionButton
                icon={<DoorUnlockIcon />}
                label="Открыть"
                tone="neutral"
                size="sm"
                onClick={onOpenDoor}
              />
            )}
          </div>

          <div className="flex justify-center">
            <CallActionButton icon={<DeclineIcon />} label="Отклонить" tone="danger" onClick={onDismiss} />
          </div>
        </div>
      </div>
    </div>
  )
}
