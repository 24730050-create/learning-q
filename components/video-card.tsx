"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Video {
  id: number
  title: string
  thumbnail: string
  length: "short-form" | "mid-form" | "long-form"
  summary: string
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
  const [isExpanded, setIsExpanded] = useState(false)

  const badge = lengthBadges[video.length]

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow fade-in">
      {/* Thumbnail */}
      <div className="relative w-full bg-muted aspect-video overflow-hidden">
        <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
          <button className="p-3 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground transition-all">
            <span className="text-2xl">▶</span>
          </button>
        </div>
        {/* Duration Badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 text-pretty">{video.title}</h3>

        {/* Length Badge */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-primary">{badge.label}</span>
          <span className="text-xs">{badge.stars}</span>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <p
            className={`text-xs text-muted-foreground leading-relaxed transition-all ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {video.summary}
          </p>
          {video.summary.split("\n").length > 1 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {isExpanded ? "간단히" : "더보기"}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            onClick={onLike}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${
              isLiked ? "bg-red-50 text-red-500" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <span className={isLiked ? "text-lg" : "text-lg"}>❤️</span>
            {video.likes}
          </button>
          <button className="flex-1 ml-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            지금 보기
          </button>
        </div>
      </div>
    </Card>
  )
}
