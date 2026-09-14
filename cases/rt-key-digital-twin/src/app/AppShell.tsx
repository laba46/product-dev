import { useState } from 'react'
import { AppContext } from './AppContext'
import type { AppContextValue, PremiumBottomSheetState } from './AppContext'
import type { Screen, UserTariff } from './types'
import { MAIN_NAV_SCREEN_IDS } from './types'
import { RtBottomNav } from '../components/ui/RtBottomNav'
import { HomeScreen } from '../screens/HomeScreen'
import { DevicesScreen } from '../screens/DevicesScreen'
import { ServicesScreen } from '../screens/ServicesScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { IntercomDevicesScreen } from '../screens/IntercomDevicesScreen'
import { IntercomScreen } from '../screens/IntercomScreen'
import { IntercomArchiveScreen } from '../screens/IntercomArchiveScreen'
import { FaceRecognitionScreen } from '../screens/FaceRecognitionScreen'
import { RenameIntercomScreen } from '../screens/RenameIntercomScreen'
import { CamerasScreen } from '../screens/CamerasScreen'
import { CameraDetailsScreen } from '../screens/CameraDetailsScreen'
import { TemporaryCodesScreen } from '../screens/TemporaryCodesScreen'
import { CodeDetailsScreen } from '../screens/CodeDetailsScreen'
import { TemporaryCodeInfoScreen } from '../screens/TemporaryCodeInfoScreen'
import { CallSettingsScreen } from '../screens/CallSettingsScreen'
import { SystemSettingsScreen } from '../screens/SystemSettingsScreen'
import { CallPermissionsScreen } from '../screens/CallPermissionsScreen'
import { SupportFaqScreen } from '../screens/SupportFaqScreen'
import { ActiveCallScreen } from '../screens/ActiveCallScreen'
import { HistoryScreen } from '../screens/HistoryScreen'
import { HistoryEventScreen } from '../screens/HistoryEventScreen'
import { IncomingCallModal } from '../components/features/IncomingCallModal'
import { PremiumBottomSheet } from '../components/features/PremiumBottomSheet'
import { getTariffCapabilities } from '../config/tariffCapabilities'
import type { IncomingCallState } from './AppContext'
import type { HistoryEvent } from '../data/history'
import { temporaryCodes as initialTemporaryCodes, SERVICE_PHONE } from '../data/temporaryCodes'
import type { TemporaryCode } from '../data/temporaryCodes'
import { devices } from '../data/devices'

const NAV_ITEMS = [
  { id: 'home', icon: 'home', label: 'Мой дом' },
  { id: 'devices', icon: 'devices', label: 'Устройства' },
  { id: 'services', icon: 'services', label: 'Сервисы' },
  { id: 'profile', icon: 'profile', label: 'Профиль' },
] as const satisfies { id: string; icon: string; label: string }[]

const MAIN_SCREEN_MAP: Record<string, Screen> = {
  home: { id: 'home' },
  devices: { id: 'devices' },
  services: { id: 'services' },
  profile: { id: 'profile' },
}

function ScreenRenderer({ screen }: { screen: Screen }) {
  switch (screen.id) {
    case 'home':
      return <HomeScreen />
    case 'devices':
      return <DevicesScreen />
    case 'services':
      return <ServicesScreen />
    case 'profile':
      return <ProfileScreen />
    case 'intercom-devices':
      return <IntercomDevicesScreen />
    case 'intercom':
      return <IntercomScreen />
    case 'intercom-archive':
      return <IntercomArchiveScreen />
    case 'rename-intercom':
      return <RenameIntercomScreen deviceId={screen.deviceId} />
    case 'face-recognition':
      return <FaceRecognitionScreen />
    case 'cameras':
      return <CamerasScreen />
    case 'camera-details':
      return <CameraDetailsScreen cameraId={screen.cameraId} />
    case 'temporary-codes':
      return <TemporaryCodesScreen />
    case 'code-details':
      return <CodeDetailsScreen codeId={screen.codeId} />
    case 'temporary-code-info':
      return <TemporaryCodeInfoScreen />
    case 'call-settings':
      return <CallSettingsScreen />
    case 'system-settings':
      return <SystemSettingsScreen />
    case 'call-permissions':
      return <CallPermissionsScreen />
    case 'support-faq':
      return <SupportFaqScreen />
    case 'active-call':
      return <ActiveCallScreen />
    case 'history':
      return <HistoryScreen />
    case 'history-event':
      return <HistoryEventScreen eventId={screen.eventId} />
  }
}

const intercomDevice = devices.find((d) => d.type === 'intercom')

export function AppShell() {
  const [screen, setScreen] = useState<Screen>({ id: 'home' })
  const [userTariff, setUserTariff] = useState<UserTariff>('base')
  const [incomingCall, setIncomingCall] = useState<IncomingCallState | null>(null)
  const [historyEvents, setHistoryEvents] = useState<HistoryEvent[]>([])
  const [intercomIsFavorite, setIntercomIsFavorite] = useState(
    intercomDevice?.isFavorite ?? false,
  )
  const [premiumBottomSheet, setPremiumBottomSheet] = useState<PremiumBottomSheetState | null>(null)
  const [temporaryCodesState, setTemporaryCodesState] = useState<TemporaryCode[]>(initialTemporaryCodes)
  const [deviceNames, setDeviceNames] = useState<Record<string, string>>({})
  const [callsEnabled, setCallsEnabled] = useState(true)
  const [callScheduleEnabled, setCallScheduleEnabled] = useState(false)
  const [intercomCallsEnabled, setIntercomCallsEnabled] = useState(true)

  const hasBottomNav = MAIN_NAV_SCREEN_IDS.includes(
    screen.id as (typeof MAIN_NAV_SCREEN_IDS)[number],
  )

  function addHistoryEvent(event: Omit<HistoryEvent, 'id' | 'timestamp'>) {
    const fullEvent: HistoryEvent = {
      ...event,
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
    setHistoryEvents((prev) => [fullEvent, ...prev])
  }

  function showPremiumBottomSheet(state: PremiumBottomSheetState) {
    setPremiumBottomSheet(state)
  }

  function hidePremiumBottomSheet() {
    setPremiumBottomSheet(null)
  }

  function createTemporaryCode(deviceId: string) {
    const pin = String(Math.floor(10000 + Math.random() * 90000))
    const newCode: TemporaryCode = {
      id: `code-${Date.now()}`,
      deviceId,
      code: pin,
      servicePhone: SERVICE_PHONE,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      duration: '24_hours',
      status: 'active',
    }
    setTemporaryCodesState((prev) => [...prev, newCode])
  }

  function deleteTemporaryCode(codeId: string) {
    setTemporaryCodesState((prev) => prev.filter((c) => c.id !== codeId))
  }

  function getDeviceName(deviceId: string, fallback: string): string {
    return deviceNames[deviceId] ?? fallback
  }

  function renameDevice(deviceId: string, newName: string) {
    setDeviceNames((prev) => ({ ...prev, [deviceId]: newName }))
  }

  const capabilities = getTariffCapabilities(userTariff)

  function handleAudioAnswer() {
    setIncomingCall({
      deviceName: 'Подъезд',
      sourceLabel: 'Ключ',
      stage: 'connecting',
      durationSec: 1,
    })
    setScreen({ id: 'active-call' })
    addHistoryEvent({
      deviceId: intercomDevice?.id ?? 'intercom-1',
      eventType: 'incoming_call_answered_audio',
      result: 'success',
      description: 'Входящий звонок — принят (аудио)',
    })
  }

  function handleVideoAnswer() {
    if (!capabilities.canAnswerVideoCall) {
      showPremiumBottomSheet({
        featureTitle: 'Видеоответ на звонок',
        featureDescription:
          'На базовом тарифе можно принять звонок по аудио. Видеоответ доступен на Premium.',
      })
      return
    }

    setIncomingCall({
      deviceName: 'Подъезд',
      sourceLabel: 'Ключ',
      stage: 'connecting',
      durationSec: 1,
    })
    setScreen({ id: 'active-call' })
    addHistoryEvent({
      deviceId: intercomDevice?.id ?? 'intercom-1',
      eventType: 'incoming_call_answered_video',
      result: 'success',
      description: 'Входящий звонок — принят (видео)',
    })
  }

  function handleCallDoorOpen() {
    if (!capabilities.canOpenDoorDuringIncomingCall) return

    setIncomingCall(null)
    addHistoryEvent({
      deviceId: intercomDevice?.id ?? 'intercom-1',
      eventType: 'incoming_call_door_opened',
      result: 'success',
      description: 'Дверь открыта сразу при входящем звонке',
    })
  }

  function handleCallDismiss() {
    setIncomingCall(null)
    addHistoryEvent({
      deviceId: intercomDevice?.id ?? 'intercom-1',
      eventType: 'incoming_call_dismissed',
      result: 'info',
      description: 'Входящий звонок — отклонён',
    })
  }

  const contextValue: AppContextValue = {
    screen,
    navigate: setScreen,
    userTariff,
    setUserTariff,
    incomingCall,
    setIncomingCall,
    historyEvents,
    addHistoryEvent,
    intercomIsFavorite,
    setIntercomIsFavorite,
    premiumBottomSheet,
    showPremiumBottomSheet,
    hidePremiumBottomSheet,
    temporaryCodes: temporaryCodesState,
    createTemporaryCode,
    deleteTemporaryCode,
    getDeviceName,
    renameDevice,
    callsEnabled,
    setCallsEnabled,
    callScheduleEnabled,
    setCallScheduleEnabled,
    intercomCallsEnabled,
    setIntercomCallsEnabled,
  }

  function handleNavSelect(id: string) {
    const target = MAIN_SCREEN_MAP[id]
    if (target) setScreen(target)
  }

  return (
    <AppContext.Provider value={contextValue}>
      <main className="min-h-screen bg-background">
        <div
          className={`mx-auto min-h-screen w-full max-w-mobile bg-surface px-layout-x pt-layout-top ${hasBottomNav ? 'pb-layout-bottom' : 'pb-xl'}`}
        >
          <ScreenRenderer screen={screen} />
        </div>
        {hasBottomNav && (
          <RtBottomNav
            items={NAV_ITEMS}
            activeId={screen.id}
            onSelect={handleNavSelect}
          />
        )}
      </main>

      {/* Глобальный слой: входящий звонок */}
      <IncomingCallModal
        isOpen={incomingCall?.stage === 'incoming'}
        deviceName={incomingCall?.deviceName ?? 'Квартира'}
        sourceLabel={incomingCall?.sourceLabel ?? 'Ключ-аудио'}
        canAnswerAudio={capabilities.canAnswerAudioCall}
        canAnswerVideo={capabilities.canAnswerVideoCall}
        canOpenDoor={capabilities.canOpenDoorDuringIncomingCall}
        onAnswerAudio={handleAudioAnswer}
        onAnswerVideo={handleVideoAnswer}
        onBlockedVideo={handleVideoAnswer}
        onOpenDoor={handleCallDoorOpen}
        onDismiss={handleCallDismiss}
      />

      {/* Глобальный слой: paywall */}
      {premiumBottomSheet !== null && (
        <PremiumBottomSheet
          isOpen
          featureTitle={premiumBottomSheet.featureTitle}
          featureDescription={premiumBottomSheet.featureDescription}
          onClose={hidePremiumBottomSheet}
        />
      )}
    </AppContext.Provider>
  )
}
