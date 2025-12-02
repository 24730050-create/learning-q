"use client"

interface BottomNavigationProps {
  currentTab: "home" | "dashboard" | "profile"
  onTabChange: (tab: "home" | "dashboard" | "profile") => void
}

const iconMap = {
  home: "🏠",
  dashboard: "📊",
  profile: "👤",
}

const labelMap = {
  home: "Home",
  dashboard: "Dashboard",
  profile: "Profile",
}

export function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  const tabs = ["home", "dashboard", "profile"] as const

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-xl">{iconMap[tab]}</span>
              <span className="text-xs font-medium">{labelMap[tab]}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
