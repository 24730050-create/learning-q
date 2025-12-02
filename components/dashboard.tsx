"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"

const weeklyData = [
  { name: "월", actual: 1.2, goal: 1 },
  { name: "화", actual: 0.8, goal: 1 },
  { name: "수", actual: 1.5, goal: 1 },
  { name: "목", actual: 0.5, goal: 1 },
  { name: "금", actual: 1.0, goal: 1 },
  { name: "토", actual: 0.9, goal: 1 },
  { name: "일", actual: 0.0, goal: 1 },
]

const subjectData = [
  { name: "자료구조", value: 45 },
  { name: "알고리즘", value: 30 },
  { name: "Python", value: 25 },
]

const topCategories = [
  { rank: 1, name: "자료구조", hours: 8.5 },
  { rank: 2, name: "알고리즘", hours: 6.2 },
  { rank: 3, name: "Python 프로그래밍", hours: 5.1 },
]

export function Dashboard() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly")

  const totalActual = weeklyData.reduce((sum, day) => sum + day.actual, 0)
  const totalGoal = weeklyData.reduce((sum, day) => sum + day.goal, 0)
  const progressPercent = Math.min((totalActual / totalGoal) * 100, 100)
  const completedVideos = 7
  const likedVideos = 15

  const maxValue = Math.max(...weeklyData.map((d) => Math.max(d.actual, d.goal)))

  return (
    <div className="flex flex-col w-full h-full bg-background overflow-hidden">
      <Header title="학습 대시보드" />

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
        <div className="space-y-4 pb-4">
          {/* Timeframe Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTimeframe("weekly")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === "weekly" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              주간
            </button>
            <button
              onClick={() => setTimeframe("monthly")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === "monthly" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              월간
            </button>
          </div>

          {/* Progress Stats */}
          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">학습 진행률</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    {totalActual.toFixed(1)}h / {totalGoal}h
                  </span>
                  <span className="text-xs text-muted-foreground">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Completed Videos */}
          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">학습 활동</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">{completedVideos}</p>
                <p className="text-xs text-muted-foreground mt-1">영상 완료</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">{likedVideos}</p>
                <p className="text-xs text-muted-foreground mt-1">영상 좋아요</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">일일 학습 시간</h3>
            <div className="space-y-3">
              {weeklyData.map((day) => (
                <div key={day.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-foreground">{day.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {day.actual}h / {day.goal}h
                    </span>
                  </div>
                  <div className="flex gap-1 h-6 bg-muted rounded-md overflow-hidden">
                    <div
                      className="bg-primary rounded-l transition-all"
                      style={{ width: `${(day.actual / maxValue) * 100}%` }}
                    />
                    <div
                      className="bg-secondary/40"
                      style={{ width: `${((day.goal - day.actual) / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">과목별 학습</h3>
            <div className="space-y-4">
              <div className="flex h-24 gap-1 rounded-lg overflow-hidden">
                {subjectData.map((subject, index) => (
                  <div
                    key={subject.name}
                    className={`${index === 0 ? "bg-primary" : index === 1 ? "bg-secondary" : "bg-cyan-400"} rounded-sm transition-all`}
                    style={{ width: `${subject.value}%` }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                {subjectData.map((subject, index) => (
                  <div key={subject.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index === 0 ? "bg-primary" : index === 1 ? "bg-secondary" : "bg-cyan-400"
                        }`}
                      />
                      <span className="text-foreground">{subject.name}</span>
                    </div>
                    <span className="text-muted-foreground">{subject.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Top Categories */}
          <Card className="p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">상위 3개 카테고리</h3>
            <div className="space-y-3">
              {topCategories.map((category) => (
                <div key={category.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold text-xs">
                      {category.rank}
                    </div>
                    <p className="text-sm font-medium">{category.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{category.hours}h</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Satisfaction Message */}
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 shadow-sm">
            <p className="text-sm font-semibold text-foreground text-center">우수한 학습 루틴 유지 중</p>
            <p className="text-xs text-muted-foreground text-center mt-1">계속 이렇게 멋진 진행률을 유지하세요!</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
