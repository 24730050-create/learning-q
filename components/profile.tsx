"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UserProfile {
  grade: string
  major: string
  subjects: string[]
  videoLength: string
  weeklyGoal: number
}

export function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleLogout = () => {
    if (confirm("로그아웃하시겠습니까?")) {
      localStorage.removeItem("userProfile")
      window.location.reload()
    }
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0EA5E9] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-hidden">
      <Header title="프로필" />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-4 pb-6 space-y-4">
          {/* Profile header */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow-sm border border-[#E5E7EB] rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">👤</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{profile.grade}</h2>
                <p className="text-sm text-gray-600">{profile.major} 전공</p>
              </div>
            </div>
          </Card>

          {/* Academic info */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">학과 정보</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">학년</p>
                <p className="text-sm font-medium text-gray-900">{profile.grade}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">전공</p>
                <p className="text-sm font-medium text-gray-900">{profile.major}</p>
              </div>
            </div>
          </Card>

          {/* Learning preferences */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">학습 선호도</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">선호하는 영상 길이</p>
                <p className="text-sm font-medium text-gray-900">{profile.videoLength}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">주간 학습 목표</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-[#0EA5E9]">{profile.weeklyGoal}</p>
                  <p className="text-sm text-gray-700">시간/주</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Interest subjects */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">관심 과목</h3>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((subject) => (
                <div
                  key={subject}
                  className="px-3 py-1.5 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] text-xs font-medium"
                >
                  {subject}
                </div>
              ))}
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">통계</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#0EA5E9]">42</p>
                <p className="text-xs text-gray-600 mt-2">총 시청한 영상</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#8B5CF6]">15</p>
                <p className="text-xs text-gray-600 mt-2">좋아요한 영상</p>
              </div>
            </div>
          </Card>

          {/* Logout button */}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2"
          >
            🚪 로그아웃
          </Button>
        </div>
      </div>
    </div>
  )
}
