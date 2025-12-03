"use client"

import { useState, useEffect } from "react"
import { Onboarding } from "@/components/onboarding"
import { Home } from "@/components/home"
import { Dashboard } from "@/components/dashboard"
import { Profile } from "@/components/profile"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function App() {
  const [currentTab, setCurrentTab] = useState<"home" | "dashboard" | "profile">("home")
  const [hasProfile, setHasProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if profile exists in localStorage
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setHasProfile(true)
    }
    setIsLoading(false)
  }, [])

  const handleProfileComplete = () => {
    setHasProfile(true)
    setCurrentTab("home")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!hasProfile) {
    return <Onboarding onComplete={handleProfileComplete} />
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-white overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <div className="w-full h-full">
          {currentTab === "home" && <Home />}
          {currentTab === "dashboard" && <Dashboard />}
          {currentTab === "profile" && <Profile />}
        </div>
      </div>
      <div className="flex-shrink-0 border-t border-[#E5E7EB]">
        <BottomNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  )
}
