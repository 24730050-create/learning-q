"use client"

import { Card } from "@/components/ui/card"

interface Video {
  id: number
  title: string
  thumbnail: string
  length: "short-form" | "mid-form" | "long-form"
  likes: number
  duration: string
}

interface VideoCardProps {
  video: Video
  isLiked: boolean
  onLike: () => void
}

const lengthBadges = {
  "short-form": { label: "쇼츠", stars: "⭐" },
  "mid-form": { label: "중간 영상", stars: "⭐⭐" },
  "long-form": { label: "장편", stars: "⭐⭐⭐" },
}

export function VideoCard({ video, isLiked, onLike }: VideoCardProps) {
  const badge = lengthBadges[video.length]

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full bg-gray-200 aspect-video overflow-hidden">
        <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
          <button className="p-3 rounded-full bg-[#0EA5E9]/90 hover:bg-[#0EA5E9] text-white transition-all">
            <span className="text-2xl">▶</span>
          </button>
        </div>
        {/* Duration badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{video.title}</h3>

        {/* Length badge */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-[#0EA5E9]">{badge.label}</span>
          <span className="text-xs">{badge.stars}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
          <button
            onClick={onLike}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
              isLiked ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>❤️</span>
            <span className="text-xs">{video.likes}</span>
          </button>
          <button className="flex-1 ml-2 px-3 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284C7] transition-colors text-sm font-medium">
            지금 보기
          </button>
        </div>
      </div>
    </Card>
  )
}
