type RtBottomNavItem = {
  id: string
  icon: string
  label: string
}

type RtBottomNavProps = {
  items: RtBottomNavItem[]
  activeId: string
  onSelect: (id: string) => void
}

function NavIcon({ icon, isActive }: { icon: string; isActive: boolean }) {
  const cls = isActive ? 'text-primary' : 'text-text-muted'

  if (icon === 'home') {
    return (
      <svg className={`mx-auto h-6 w-6 ${cls}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    )
  }
  if (icon === 'devices') {
    return (
      <svg className={`mx-auto h-6 w-6 ${cls}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="18" height="4" rx="1" />
      </svg>
    )
  }
  if (icon === 'services') {
    return (
      <svg className={`mx-auto h-6 w-6 ${cls}`} viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    )
  }
  if (icon === 'profile') {
    return (
      <svg className={`mx-auto h-6 w-6 ${cls}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    )
  }
  return <span className={`text-base ${cls}`}>{icon}</span>
}

export function RtBottomNav({ items, activeId, onSelect }: RtBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 w-full max-w-mobile -translate-x-1/2 border-t border-border bg-surface px-md pb-lg pt-sm">
      <ul className="grid grid-cols-4 gap-sm text-center">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="cursor-pointer"
            >
              <NavIcon icon={item.icon} isActive={isActive} />
              <p className={`mt-xs text-app-caption font-medium ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                {item.label}
              </p>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
