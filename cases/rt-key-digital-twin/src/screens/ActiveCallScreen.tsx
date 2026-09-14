import { useEffect } from 'react'
import { useAppContext } from '../app/AppContext'
import { CallActionButton } from '../components/features/CallActionButton'
import { CallScreenShell } from '../components/features/CallScreenShell'
import { RtLoader } from '../components/ui/RtLoader'

function MutedSpeakerIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
      <path d="M11 5 6.5 9H4v6h2.5L11 19V5z" />
      <line x1="15" y1="9" x2="20" y2="14" />
      <line x1="20" y1="9" x2="15" y2="14" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
      <rect x="9" y="4" width="6" height="10" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <line x1="12" y1="17" x2="12" y2="20" />
    </svg>
  )
}

function HangupIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.2 8.6c4.2-1.9 7.4-1.9 11.6 0 .9.4 1.3 1.5.8 2.4l-1.2 2.2c-.3.6-1 .9-1.7.8l-2.6-.7a1.4 1.4 0 0 0-1.2.2l-1.5 1.1a1.4 1.4 0 0 1-1.2.2l-2.6-.8a1.4 1.4 0 0 1-.9-.8l-1.2-2.2c-.5-.9-.1-2 .7-2.4z" />
    </svg>
  )
}

function DoorUnlockIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
      <rect x="7" y="11" width="10" height="8" rx="2" />
      <path d="M10 11V8a3 3 0 0 1 5-2" />
    </svg>
  )
}

function ConnectingMedia() {
  return (
    <div className="flex min-h-[360px] items-center justify-center bg-[#091222]">
      <div className="text-primary">
        <RtLoader type="spinner" size="m" variant="primary" />
      </div>
    </div>
  )
}

function VideoMedia() {
  return (
    <div className="flex justify-center bg-[#091222]">
      <div className="relative aspect-[1.14/1] w-full max-w-[360px] overflow-hidden bg-[#d9ddd9]">
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[#e7e5df]" />
        <div className="absolute left-[52%] top-0 h-full w-[4px] bg-[#8f918f]" />
        <div className="absolute left-[31%] top-[20%] h-[24%] w-[10%] rounded-[2px] bg-[#7f8380]" />
        <div className="absolute left-[31%] top-[46%] h-[18%] w-[10%] rounded-[2px] bg-[#8b8f8a]" />
        <div className="absolute left-[73%] top-[14%] h-[62%] w-[18%] rounded-t-[20px] bg-[#202426]" />
        <div className="absolute left-[67%] top-[28%] h-[4px] w-[13%] rounded-full bg-[#d6b99a]" />
      </div>
    </div>
  )
}

function formatDuration(durationSec: number): string {
  const mm = String(Math.floor(durationSec / 60)).padStart(2, '0')
  const ss = String(durationSec % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export function ActiveCallScreen() {
  const { incomingCall, setIncomingCall, navigate, addHistoryEvent } = useAppContext()

  useEffect(() => {
    if (incomingCall === null) {
      navigate({ id: 'home' })
      return undefined
    }

    const tick = window.setInterval(() => {
      setIncomingCall((prev) => {
        if (prev === null) return null
        const nextDuration = prev.durationSec + 1
        const nextStage = prev.stage === 'connecting' && nextDuration >= 4 ? 'video' : prev.stage
        return {
          ...prev,
          durationSec: nextDuration,
          stage: nextStage,
        }
      })
    }, 1000)

    return () => window.clearInterval(tick)
  }, [incomingCall, navigate, setIncomingCall])

  if (incomingCall === null) return null

  function handleHangup() {
    addHistoryEvent({
      deviceId: 'intercom-1',
      eventType: 'incoming_call_dismissed',
      result: 'info',
      description: 'Входящий звонок завершён',
    })
    setIncomingCall(null)
    navigate({ id: 'home' })
  }

  function handleOpenDoor() {
    addHistoryEvent({
      deviceId: 'intercom-1',
      eventType: 'incoming_call_door_opened',
      result: 'success',
      description: 'Дверь открыта при входящем звонке',
    })
  }

  return (
    <CallScreenShell
      statusLabel={`Звонок Ключ ${formatDuration(incomingCall.durationSec)}`}
      title={incomingCall.deviceName}
      media={incomingCall.stage === 'video' ? <VideoMedia /> : <ConnectingMedia />}
      controls={
        <div className="flex flex-col items-center">
          <div className="flex gap-xl">
            <CallActionButton icon={<MutedSpeakerIcon />} label="" tone="dark" size="sm" />
            <CallActionButton icon={<MicIcon />} label="" tone="neutral" size="sm" />
          </div>

          <div className="mt-2xl flex gap-2xl">
            <CallActionButton icon={<HangupIcon />} label="Завершить" tone="danger" onClick={handleHangup} />
            <CallActionButton icon={<DoorUnlockIcon />} label="Открыть дверь" tone="accent" onClick={handleOpenDoor} />
          </div>
        </div>
      }
    />
  )
}
