'use client'

import { useEffect, useState } from 'react'

export default function SpaceBackground() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string; size: string }[]>([])

  useEffect(() => {
    const starCount = 100
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      duration: `${Math.random() * 2.7 + 1.3}s`,
      delay: `${Math.random() * 8}s`,
      size: `${Math.random() * 4 + 2}px`,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="twinkle-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            // @ts-ignore
            '--twinkle-duration': star.duration,
            '--twinkle-delay': star.delay,
          }}
        />
      ))}
    </div>
  )
}
