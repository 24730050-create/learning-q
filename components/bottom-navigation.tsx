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
  home: "홈",
  dashboard: "대시보드",
  profile: "프로필",
}

export function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  const tabs = ["home", "dashboard", "profile"] as const

  return (
    <nav className="w-full bg-white border-t border-[#E5E7EB] px-4 py-3">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                isActive ? "text-[#0EA5E9] bg-blue-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
