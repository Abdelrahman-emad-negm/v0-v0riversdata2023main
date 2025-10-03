"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl: string
}

const teamMembers: TeamMember[] = [
  {
    id: "member1",
    name: "Team Member 1",
    role: "Role",
    imageUrl: "/team-member-portrait.png",
  },
  {
    id: "member2",
    name: "Team Member 2",
    role: "Role",
    imageUrl: "/team-member-portrait.png",
  },
  {
    id: "member3",
    name: "Team Member 3",
    role: "Role",
    imageUrl: "/team-member-portrait.png",
  },
  {
    id: "member4",
    name: "Team Member 4",
    role: "Role",
    imageUrl: "/team-member-portrait.png",
  },
  {
    id: "member5",
    name: "Team Member 5",
    role: "Role",
    imageUrl: "/team-member-portrait.png",
  },
  {
    id: "member6",
    name: "Team Member 6",
    role: "Role",
    imageUrl: "/team-member-portrait.png",
  },
]

export function TeamCircles() {
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
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
      {teamMembers.map((member, index) => (
        <div
          key={member.id}
          className={`flex flex-col items-center gap-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          {/* Circle Image */}
          <Card className="relative overflow-hidden w-56 h-56 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl border-4 border-primary/20">
            <div className="absolute inset-0">
              <img
                src={member.imageUrl || "/placeholder.svg"}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>

          {/* Text Below Circle - Always Visible */}
          <div className="text-center">
            <h3 className="font-serif text-xl font-bold text-foreground mb-1">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
