"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"

const dummyVideos = [
  {
    id: 1,
    title: "자료구조: 배열 vs 연결 리스트 설명",
    thumbnail: "/data-structures-tutorial.jpg",
    length: "mid-form",
    summary:
      "배열과 연결 리스트의 기본적인 차이점을 배워보세요. 프로젝트에서 각 자료구조를 언제 사용해야 하는지 이해합니다.",
    likes: 234,
    duration: "12:45",
  },
  {
    id: 2,
    title: "Python 프로그래밍: 고급 리스트 컴프리헨션",
    thumbnail: "/python-programming.jpg",
    length: "short-form",
    summary: "실제 예제를 통해 Python 리스트 컴프리헨션을 마스터하세요. 더 깔끔하고 효율적인 Python 코드를 작성합니다.",
    likes: 456,
    duration: "3:20",
  },
  {
    id: 3,
    title: "알고리즘: Big O 표기법 간단하게 이해하기",
    thumbnail: "/algorithms-complexity.jpg",
    length: "long-form",
    summary: "알고리즘 복잡도 분석을 이해해보세요. Big O를 계산하고 코드를 최적화하는 방법을 배웁니다.",
    likes: 789,
    duration: "28:15",
  },
  {
    id: 4,
    title: "미적분 기초: 도함수 설명",
    thumbnail: "/calculus-derivatives.jpg",
    length: "mid-form",
    summary: "도함수와 그 응용을 소개합니다. 시각적 설명과 실제 예제로 배웁니다.",
    likes: 567,
    duration: "14:30",
  },
  {
    id: 5,
    title: "Python OOP: 클래스와 객체",
    thumbnail: "/python-oop-classes.jpg",
    length: "long-form",
    summary: "Python의 객체지향 프로그래밍을 깊이 있게 배워보세요. 클래스, 상속, 다형성을 이해합니다.",
    likes: 345,
    duration: "35:20",
  },
  {
    id: 6,
    title: "자료구조: 해시 테이블 심화",
    thumbnail: "/hash-tables.jpg",
    length: "short-form",
    summary: "해시 테이블의 작동 원리를 이해해보세요. 충돌과 최적화 전략을 배웁니다.",
    likes: 298,
    duration: "5:45",
  },
  {
    id: 7,
    title: "정렬 알고리즘 비교",
    thumbnail: "/sorting-algorithms.jpg",
    length: "mid-form",
    summary: "퀵소트, 병합정렬, 힙정렬을 비교해봅시다. 각 알고리즘을 언제 사용할지 배웁니다.",
    likes: 612,
    duration: "16:20",
  },
  {
    id: 8,
    title: "웹 개발: React Hooks 가이드",
    thumbnail: "/react-hooks.jpg",
    length: "long-form",
    summary: "React Hooks 완전 가이드. useState, useEffect, 커스텀 훅을 예제와 함께 설명합니다.",
    likes: 834,
    duration: "42:10",
  },
  {
    id: 9,
    title: "영어: 공개 발표 팁",
    thumbnail: "/public-speaking.jpg",
    length: "short-form",
    summary: "공개 발표 기술을 마스터하세요. 긴장을 줄이고 청중을 사로잡는 방법을 배웁니다.",
    likes: 456,
    duration: "4:30",
  },
  {
    id: 10,
    title: "물리학: 양자역학 입문",
    thumbnail: "/quantum-mechanics.jpg",
    length: "long-form",
    summary: "매력적인 양자역학의 세계를 발견해보세요. 파동-입자 이중성과 중첩을 배웁니다.",
    likes: 723,
    duration: "38:45",
  },
]

const filterOptions = ["전체", "쇼츠", "중간 영상", "장편"]

export function Home() {
  const [filterTab, setFilterTab] = useState("전체")
  const [likedVideos, setLikedVideos] = useState<number[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filteredVideos = dummyVideos.filter((video) => {
    if (filterTab === "전체") return true
    if (filterTab === "쇼츠") return video.length === "short-form"
    if (filterTab === "중간 영상") return video.length === "mid-form"
    if (filterTab === "장편") return video.length === "long-form"
    return true
  })

  const handleLike = (videoId: number) => {
    setLikedVideos((prev) => (prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]))
  }

  return (
    <div className="flex flex-col w-full h-full bg-background overflow-hidden">
      <Header title="LearnFlow" />

      {/* Filter Tabs */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 pt-4">
        <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilterTab(option)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                filterTab === option
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Video Feed */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-4">
        <div className="space-y-4 pb-4">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isLiked={likedVideos.includes(video.id)}
              onLike={() => handleLike(video.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
