"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Campaign {
  id: string
  name: string
  location: string
  description: string
  image: string
  date: string
}

const campaigns: Campaign[] = [
  {
    id: "yangtze",
    name: "Yangtze Cleanup",
    location: "Yangtze River, China",
    description: "Join us in cleaning the longest river in Asia and protecting its diverse ecosystem.",
    image: "/yangtze-river-cleanup.jpg",
    date: "Every Saturday",
  },
  {
    id: "nile",
    name: "Nile Initiative",
    location: "Nile River, Egypt",
    description: "Help preserve the historic Nile River by removing plastic waste and debris.",
    image: "/nile-river-cleanup.jpg",
    date: "Monthly Events",
  },
  {
    id: "amazon",
    name: "Amazon Project",
    location: "Amazon River, Brazil",
    description: "Protect the waterways and support local communities in conservation efforts.",
    image: "/amazon-river-cleanup.jpg",
    date: "Quarterly Campaigns",
  },
  {
    id: "ganges",
    name: "Ganges Restoration",
    location: "Ganges River, India",
    description: "Participate in cleaning one of the world's most sacred rivers and restoring its purity.",
    image: "/ganges-river-cleanup.jpg",
    date: "Weekly Activities",
  },
  {
    id: "mississippi",
    name: "Mississippi Care",
    location: "Mississippi River, USA",
    description: "Join volunteers in keeping North America's mighty river clean and healthy.",
    image: "/mississippi-river-cleanup.jpg",
    date: "Bi-weekly Events",
  },
]

export default function CleaningCampaignsPage() {
  const router = useRouter()
  const stickersRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(campaigns.length)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const cardsPerView = 3

  const infiniteCampaigns = [...campaigns, ...campaigns, ...campaigns]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    const stickers = stickersRef.current?.querySelectorAll(".sticker")
    if (!stickers) return

    stickers.forEach((sticker) => {
      const element = sticker as HTMLElement
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100
      const randomDelay = Math.random() * 5
      const randomDuration = 15 + Math.random() * 10

      element.style.left = `${randomX}%`
      element.style.top = `${randomY}%`
      element.style.animationDelay = `${randomDelay}s`
      element.style.animationDuration = `${randomDuration}s`
    })
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1)
  }

  useEffect(() => {
    if (currentSlide >= campaigns.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentSlide(campaigns.length)
      }, 500)
      setTimeout(() => {
        setIsTransitioning(true)
      }, 550)
    } else if (currentSlide < campaigns.length) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentSlide(campaigns.length * 2 - 1)
      }, 500)
      setTimeout(() => {
        setIsTransitioning(true)
      }, 550)
    }
  }, [currentSlide])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToCampaigns = () => {
    const campaignsSection = document.getElementById("campaigns-section")
    if (campaignsSection) {
      campaignsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const navigateToTakeAction = () => {
    router.push("/")
    setTimeout(() => {
      const takeActionSection = document.getElementById("take-action")
      if (takeActionSection) {
        takeActionSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <main className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <div className="fixed top-0 left-0 z-50 p-6 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out hover:bg-white/90 dark:hover:bg-gray-800/90 hover:scale-105"
        >
          <h2 className="font-serif text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider">
            Breathing Rivers
          </h2>
        </Link>
        <ThemeToggle />
      </div>

      {/* Landing Section with Background Image */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20and%20White%20Simple%20The%20Future%20Of%20The%20Arctic%20Presentation%20%283%29-PL3mTfkQZyn3LS9aL0RjWexFeFDzNF.png)",
        }}
        ref={stickersRef}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
            Welcome, River Heroes!
          </h1>
          <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-md">
            Get ready to make a real difference! Join our exciting cleanup campaigns and help protect the rivers that
            give life to our planet.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-2xl font-semibold text-cyan-400 mb-4 italic tracking-wide">
                "Before we explore solutions, let's understand the challenge we're facing together!"
              </p>
              <p className="text-lg text-gray-200 leading-relaxed">
                Rivers around the world are facing pollution from plastic waste, industrial discharge, and human
                activities. By joining our cleanup campaigns, you become part of a global movement to restore and
                protect these vital waterways. Together, we can make our rivers breathe again!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-center text-gray-200 mb-4">Join thousands of volunteers making a difference!</p>
              <Button
                onClick={scrollToCampaigns}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg rounded-full shadow-lg"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section id="campaigns-section" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">Pick a Campaign, Make an Impact!</h2>
            <p className="text-xl text-gray-200">"Every river has a story—are you ready to be part of it?"</p>
          </div>

          <div className="relative px-12">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous campaigns"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Campaigns Container */}
            <div className="overflow-hidden">
              <div
                className={`flex gap-6 ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
                style={{
                  transform: `translateX(-${(currentSlide * 100) / cardsPerView}%)`,
                }}
              >
                {infiniteCampaigns.map((campaign, index) => (
                  <div
                    key={`${campaign.id}-${index}`}
                    className="flex-shrink-0"
                    style={{ width: "calc(33.333% - 16px)" }}
                  >
                    <Card className="overflow-hidden bg-[#1a2942] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-cyan-500/30 h-full">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={campaign.image || "/placeholder.svg?height=200&width=400"}
                          alt={campaign.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-cyan-400 mb-2">{campaign.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{campaign.location}</p>
                        <p className="text-gray-200 mb-4 leading-relaxed">{campaign.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-cyan-400">{campaign.date}</span>
                          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6">
                            Discover
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next campaigns"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Make Waves?</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join our community of river heroes and be part of the solution. Every cleanup makes a difference!
          </p>
          <Button
            onClick={navigateToTakeAction}
            className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg"
          >
            Explore More Ways to Help
          </Button>
        </div>
      </section>
    </main>
  )
}
