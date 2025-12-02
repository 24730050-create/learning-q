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
  const [isEditing, setIsEditing] = useState(false)

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

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full bg-background overflow-hidden">
      <Header title="프로필" />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
        <div className="space-y-4 pb-4">
          {/* Profile Header */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">👤</span>
                </div>
                <h2 className="text-lg font-bold text-foreground">{profile.grade}</h2>
                <p className="text-sm text-muted-foreground">{profile.major} 전공</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleEditProfile}
                className="flex items-center gap-2 bg-transparent"
              >
                ✏️ 수정
              </Button>
            </div>
          </Card>

          {/* Profile Information */}
          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">학과 정보</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">학년</p>
                <p className="text-sm font-medium text-foreground">{profile.grade}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">전공</p>
                <p className="text-sm font-medium text-foreground">{profile.major}</p>
              </div>
            </div>
          </Card>

          {/* Learning Preferences */}
          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">학습 선호도</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">선호하는 영상 길이</p>
                <p className="text-sm font-medium text-foreground">{profile.videoLength}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">주간 학습 목표</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-primary">{profile.weeklyGoal}</p>
                  <p className="text-sm text-foreground">시간/주</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Interest Subjects */}
          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">관심 과목</h3>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((subject) => (
                <div key={subject} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  {subject}
                </div>
              ))}
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">통계</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">42</p>
                <p className="text-xs text-muted-foreground mt-1">총 시청한 영상</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">15</p>
                <p className="text-xs text-muted-foreground mt-1">좋아요한 영상</p>
              </div>
            </div>
          </Card>

          {/* Logout Button */}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full mt-6 flex items-center justify-center gap-2"
          >
            🚪 로그아웃
          </Button>
        </div>
      </div>
    </div>
  )
}
