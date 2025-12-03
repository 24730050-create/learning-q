"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OnboardingProps {
  onComplete: () => void
}

const grades = ["1학년", "2학년", "3학년", "4학년"]
const majors = ["공학계열", "인문계열", "사회계열", "자연계열", "예체능계열"]
const subjects = [
  "Python 프로그래밍",
  "자료구조",
  "알고리즘",
  "미적분",
  "영어 회화",
  "생물학",
  "역사",
  "물리학",
  "화학",
  "웹 개발",
]
const videoLengthOptions = [
  { label: "쇼츠", desc: "1–3분" },
  { label: "일반 영상", desc: "10–20분" },
  { label: "혼합", desc: "모두" },
]

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const [grade, setGrade] = useState("")
  const [major, setMajor] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [videoLength, setVideoLength] = useState("")
  const [weeklyGoal, setWeeklyGoal] = useState(5)

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject)
      }
      if (prev.length < 3) {
        return [...prev, subject]
      }
      return prev
    })
  }

  const handleGetStarted = () => {
    const profile = {
      grade,
      major,
      subjects: selectedSubjects,
      videoLength,
      weeklyGoal,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("userProfile", JSON.stringify(profile))
    onComplete()
  }

  const isStepValid = () => {
    switch (step) {
      case 0:
        return grade !== ""
      case 1:
        return major !== ""
      case 2:
        return selectedSubjects.length > 0
      case 3:
        return videoLength !== ""
      case 4:
        return true
      default:
        return false
    }
  }

  const stepTitles = [
    "학년을 선택하세요",
    "전공 계열을 선택해주세요",
    "관심 과목을 선택해주세요",
    "선호하는 영상 길이를 선택하세요",
    "요약 및 시작",
  ]

  const stepDescriptions = [
    "수준에 맞는 콘텐츠를 추천해드립니다.",
    "관련 분야의 학습 영상을 찾아드립니다.",
    "최대 3개까지 선택 가능",
    "학습 스타일에 맞게 선택하세요.",
    "모든 선택 항목을 확인하고 시작하세요.",
  ]

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto pb-8">
      <div className="max-w-md mx-auto px-4 pt-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-4xl">🎓</span>
            <h1 className="text-3xl font-bold text-[#0EA5E9]">러닝큐</h1>
          </div>
          <p className="text-gray-600 text-sm">모든 학생을 위한 개인화된 학습</p>
        </div>

        <div className="flex gap-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all ${i <= step ? "bg-[#0EA5E9]" : "bg-gray-200"}`}
            />
          ))}
        </div>

        <Card className="p-6 shadow-lg border border-[#E5E7EB] rounded-xl">
          {/* Step 0: Grade */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{stepTitles[0]}</h2>
              <p className="text-sm text-gray-500 mb-6">{stepDescriptions[0]}</p>
              <div className="space-y-3">
                {grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      grade === g
                        ? "border-[#0EA5E9] bg-blue-50 text-[#0EA5E9]"
                        : "border-[#E5E7EB] bg-white text-gray-900 hover:border-[#0EA5E9]/50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Major */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{stepTitles[1]}</h2>
              <p className="text-sm text-gray-500 mb-6">{stepDescriptions[1]}</p>
              <div className="space-y-3">
                {majors.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMajor(m)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      major === m
                        ? "border-[#0EA5E9] bg-blue-50 text-[#0EA5E9]"
                        : "border-[#E5E7EB] bg-white text-gray-900 hover:border-[#0EA5E9]/50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{stepTitles[2]}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {stepDescriptions[2]} ({selectedSubjects.length}/3)
              </p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    disabled={selectedSubjects.length === 3 && !selectedSubjects.includes(subject)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSubjects.includes(subject)
                        ? "bg-[#0EA5E9] text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Video Length */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{stepTitles[3]}</h2>
              <p className="text-sm text-gray-500 mb-6">{stepDescriptions[3]}</p>
              <div className="space-y-3">
                {videoLengthOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setVideoLength(option.label)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      videoLength === option.label
                        ? "border-[#0EA5E9] bg-blue-50"
                        : "border-[#E5E7EB] bg-white hover:border-[#0EA5E9]/50"
                    }`}
                  >
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">{stepTitles[4]}</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">학년</p>
                  <p className="font-medium text-gray-900">{grade}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">전공</p>
                  <p className="font-medium text-gray-900">{major}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-2">관심 과목</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubjects.map((subject) => (
                      <span key={subject} className="px-3 py-1 bg-[#0EA5E9] text-white text-xs rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">선호 영상 길이</p>
                  <p className="font-medium text-gray-900">{videoLength}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-[#E5E7EB]">
                  <p className="text-xs text-gray-500 mb-1">주간 학습 목표</p>
                  <p className="font-medium text-gray-900">{weeklyGoal}시간</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex-1"
            >
              이전
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="flex-1 bg-[#0EA5E9] hover:bg-blue-600 text-white"
              >
                다음
              </Button>
            ) : (
              <Button onClick={handleGetStarted} className="flex-1 bg-[#0EA5E9] hover:bg-blue-600 text-white">
                시작하기
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
