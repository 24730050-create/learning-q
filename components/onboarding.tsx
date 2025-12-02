"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OnboardingProps {
  onComplete: () => void
}

const grades = ["1학년", "2학년", "3학년", "4학년"]
const majors = ["공학", "인문학", "사회과학", "자연과학", "예술 및 체육"]
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
const videoLengthOptions = ["쇼츠(짧은 영상)", "일반 영상", "혼합"]

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

  return (
    <div className="w-full h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-y-auto pb-8">
      <div className="max-w-md mx-auto px-4 pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">LearnFlow</h1>
          <p className="text-muted-foreground text-sm">모든 학생을 위한 개인화된 학습</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-all ${i <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        <Card className="p-6 shadow-lg slide-up">
          {/* Step 0: Grade */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">학년을 선택하세요</h2>
              <div className="space-y-3">
                {grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      grade === g
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
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
              <h2 className="text-xl font-bold text-foreground mb-4">전공을 선택하세요</h2>
              <div className="space-y-3">
                {majors.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMajor(m)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      major === m
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
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
              <h2 className="text-xl font-bold text-foreground mb-2">관심사 3개를 선택하세요</h2>
              <p className="text-sm text-muted-foreground mb-4">{selectedSubjects.length}/3 선택됨</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    disabled={selectedSubjects.length === 3 && !selectedSubjects.includes(subject)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSubjects.includes(subject)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80 disabled:opacity-50"
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
              <h2 className="text-xl font-bold text-foreground mb-4">선호하는 영상 길이</h2>
              <div className="space-y-3">
                {videoLengthOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setVideoLength(option)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      videoLength === option
                        ? "border-secondary bg-secondary/10 text-secondary"
                        : "border-border bg-background text-foreground hover:border-secondary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Weekly Goal */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">주간 학습 목표</h2>
              <p className="text-muted-foreground text-sm mb-6">주당 학습할 시간을 설정하세요</p>
              <div className="space-y-6">
                <div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={weeklyGoal}
                    onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1시간</span>
                    <span>20시간</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-4xl font-bold text-primary">{weeklyGoal}</p>
                  <p className="text-sm text-foreground mt-1">시간/주</p>
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
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                다음
              </Button>
            ) : (
              <Button onClick={handleGetStarted} className="flex-1 bg-primary hover:bg-primary/90">
                시작하기
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
