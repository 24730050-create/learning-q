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
  const [timeframe] = useState<"weekly" | "monthly">("weekly")

  const totalActual = weeklyData.reduce((sum, day) => sum + day.actual, 0)
  const totalGoal = weeklyData.reduce((sum, day) => sum + day.goal, 0)
  const progressPercent = Math.min((totalActual / totalGoal) * 100, 100)
  const completedVideos = 7
  const likedVideos = 15

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-hidden">
      <Header title="대시보드" />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-4 pb-6 space-y-4">
          {/* Weekly goal card */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">이번 주 학습 시간</h3>
              <span className="text-2xl font-bold text-[#0EA5E9]">{totalActual.toFixed(1)}h</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>주간 목표</span>
                <span>{totalGoal}h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-[#0EA5E9] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-right text-xs text-gray-500">{Math.round(progressPercent)}% 달성</div>
            </div>
          </Card>

          {/* Daily breakdown chart */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">일별 학습 시간</h3>
            <div className="flex items-end justify-center h-32 gap-1.5 bg-gray-50 rounded-lg p-4">
              {weeklyData.map((day) => {
                const percentage = (day.actual / day.goal) * 100
                return (
                  <div key={day.name} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gray-200 rounded-t overflow-hidden" style={{ height: "80px" }}>
                      <div
                        className="bg-[#0EA5E9] rounded-t transition-all w-full"
                        style={{ height: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{day.name}</span>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Learning stats */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">학습 활동</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#0EA5E9]">{completedVideos}</p>
                <p className="text-xs text-gray-600 mt-2">완료한 영상</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <p className="text-3xl font-bold text-[#8B5CF6]">{likedVideos}</p>
                <p className="text-xs text-gray-600 mt-2">좋아요한 영상</p>
              </div>
            </div>
          </Card>

          {/* Subject distribution */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">과목별 학습</h3>
            <div className="space-y-4">
              <div className="flex h-24 gap-1 rounded-lg overflow-hidden">
                {subjectData.map((subject, index) => {
                  const colors = ["bg-[#0EA5E9]", "bg-[#8B5CF6]", "bg-cyan-400"]
                  return (
                    <div
                      key={subject.name}
                      className={`${colors[index]} rounded-sm transition-all`}
                      style={{ width: `${subject.value}%` }}
                    />
                  )
                })}
              </div>
              <div className="space-y-2">
                {subjectData.map((subject, index) => {
                  const colors = ["bg-[#0EA5E9]", "bg-[#8B5CF6]", "bg-cyan-400"]
                  return (
                    <div key={subject.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${colors[index]}`} />
                        <span className="text-gray-700">{subject.name}</span>
                      </div>
                      <span className="text-gray-500 font-medium">{subject.value}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Top categories */}
          <Card className="p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">상위 3개 카테고리</h3>
            <div className="space-y-3">
              {topCategories.map((category) => (
                <div key={category.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9] font-semibold text-xs">
                      {category.rank}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{category.hours}h</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Motivation banner */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm border border-[#E5E7EB] rounded-lg">
            <p className="text-sm font-semibold text-gray-900 text-center">우수한 학습 루틴 유지 중</p>
            <p className="text-xs text-gray-600 text-center mt-1">멋진 진행률을 계속 유지하세요!</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
