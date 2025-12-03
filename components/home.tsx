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
    likes: 234,
    duration: "12:45",
  },
  {
    id: 2,
    title: "Python 프로그래밍: 고급 리스트 컴프리헨션",
    thumbnail: "/python-programming.jpg",
    length: "short-form",
    likes: 456,
    duration: "3:20",
  },
  {
    id: 3,
    title: "알고리즘: Big O 표기법 간단하게 이해하기",
    thumbnail: "/algorithms-complexity.jpg",
    length: "long-form",
    likes: 789,
    duration: "28:15",
  },
  {
    id: 4,
    title: "미적분 기초: 도함수 설명",
    thumbnail: "/calculus-derivatives.jpg",
    length: "mid-form",
    likes: 567,
    duration: "14:30",
  },
  {
    id: 5,
    title: "Python OOP: 클래스와 객체",
    thumbnail: "/python-oop-classes.jpg",
    length: "long-form",
    likes: 345,
    duration: "35:20",
  },
  {
    id: 6,
    title: "자료구조: 해시 테이블 심화",
    thumbnail: "/hash-tables.jpg",
    length: "short-form",
    likes: 298,
    duration: "5:45",
  },
  {
    id: 7,
    title: "정렬 알고리즘 비교",
    thumbnail: "/sorting-algorithms.jpg",
    length: "mid-form",
    likes: 612,
    duration: "16:20",
  },
  {
    id: 8,
    title: "웹 개발: React Hooks 가이드",
    thumbnail: "/react-hooks.jpg",
    length: "long-form",
    likes: 834,
    duration: "42:10",
  },
  {
    id: 9,
    title: "영어: 공개 발표 팁",
    thumbnail: "/public-speaking.jpg",
    length: "short-form",
    likes: 456,
    duration: "4:30",
  },
  {
    id: 10,
    title: "물리학: 양자역학 입문",
    thumbnail: "/quantum-mechanics.jpg",
    length: "long-form",
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
    <div className="flex flex-col w-full h-full bg-white overflow-hidden">
      <Header title="러닝큐" />

      <div className="sticky top-0 z-10 bg-white border-b border-[#E5E7EB] px-4 pt-3 pb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilterTab(option)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                filterTab === option
                  ? "bg-[#0EA5E9] text-white shadow-sm"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-4 pb-6 space-y-3">
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
