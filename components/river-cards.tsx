"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface River {
  id: string
  name: string
  location: string
  length: string
  description: string
  imageUrl: string
}

const rivers: River[] = [
  {
    id: "nile",
    name: "Nile River",
    location: "Africa",
    length: "6,650 km",
    description:
      "The longest river in the world, cradle of ancient Egyptian civilization, flowing through 11 African countries and serving as a lifeline for millions of people",
    imageUrl: "/nile-river.jpg",
  },
  {
    id: "amazon",
    name: "Amazon River",
    location: "South America",
    length: "6,400 km",
    description:
      "The largest in the world by discharge, the heart of the rainforest, and home to over 3,000 fish species and unparalleled biodiversity.",
    imageUrl: "/amazon.jpg",
  },
  {
    id: "yangtze",
    name: "Yangtze River",
    location: "China",
    length: "6,300 km",
    description:
      "The longest river in Asia, economic lifeline of China, flowing through breathtaking landscapes and supporting over 400 million people",
    imageUrl: "/yangtze-river.jpg",
  },
]

export function RiverCards() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-12 max-w-6xl mx-auto">
      {/* Top Card - Centered */}
      <div className="flex justify-center">
        <Link href={`/rivers/${rivers[0].id}`}>
          <Card
            key={rivers[0].id}
            className={`relative overflow-hidden w-80 h-80 rounded-full cursor-pointer group transition-all duration-1000 hover:scale-110 hover:shadow-2xl border-4 border-primary/20 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-32"
            }`}
            style={{ transitionDelay: "0ms" }}
            onMouseEnter={() => setHoveredId(rivers[0].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={rivers[0].imageUrl || "/placeholder.svg"}
                alt={rivers[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  hoveredId === rivers[0].id
                    ? "bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75"
                    : "bg-gradient-to-br from-primary/60 via-primary/40 to-primary/30"
                }`}
              />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-primary-foreground text-center">
              {/* Title - Always Visible */}
              <h3
                className={`font-serif text-3xl font-bold transition-all duration-500 ${
                  hoveredId === rivers[0].id ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              >
                {rivers[0].name}
              </h3>

              {/* Details - Show on Hover */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                  hoveredId === rivers[0].id ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <h3 className="font-serif text-2xl font-bold mb-3">{rivers[0].name}</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className="text-sm">{rivers[0].location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span className="text-sm">{rivers[0].length}</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-primary-foreground/95">{rivers[0].description}</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Bottom Two Cards - Left and Right */}
      <div className="flex justify-center gap-16 flex-wrap">
        {rivers.slice(1).map((river, index) => (
          <Link key={river.id} href={`/rivers/${river.id}`}>
            <Card
              className={`relative overflow-hidden w-80 h-80 rounded-full cursor-pointer group transition-all duration-1000 hover:scale-110 hover:shadow-2xl border-4 border-primary/20 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              onMouseEnter={() => setHoveredId(river.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={river.imageUrl || "/placeholder.svg"}
                  alt={river.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    hoveredId === river.id
                      ? "bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75"
                      : "bg-gradient-to-br from-primary/60 via-primary/40 to-primary/30"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-primary-foreground text-center">
                {/* Title - Always Visible */}
                <h3
                  className={`font-serif text-3xl font-bold transition-all duration-500 ${
                    hoveredId === river.id ? "opacity-0 scale-90" : "opacity-100 scale-100"
                  }`}
                >
                  {river.name}
                </h3>

                {/* Details - Show on Hover */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                    hoveredId === river.id ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <h3 className="font-serif text-2xl font-bold mb-3">{river.name}</h3>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className="text-sm">{river.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span className="text-sm">{river.length}</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-primary-foreground/95">{river.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
