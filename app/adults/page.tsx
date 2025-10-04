"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Activity {
  id: string
  name: string
  icon: string
  waterUsage: number
  duration: string
  tips: string[]
  image: string
}

const activities: Activity[] = [
  {
    id: "shower",
    name: "Shower",
    icon: "",
    waterUsage: 65,
    duration: "10 minutes",
    tips: [
      "Reduce shower time to 5 minutes to save 32 liters",
      "Install a low-flow showerhead to reduce usage by 40%",
      "Turn off water while soaping",
    ],
    image: "/modern-bathroom-with-rainfall-shower-head-and-glas.jpg",
  },
  {
    id: "dishes",
    name: "Washing Dishes",
    icon: "",
    waterUsage: 40,
    duration: "15 minutes",
    tips: [
      "Use a dishwasher when full - saves up to 20 liters",
      "Don't pre-rinse dishes before dishwasher",
      "Fill sink basin instead of running water",
    ],
    image: "/person-washing-dishes-in-kitchen-sink-with-running.jpg",
  },
  {
    id: "laundry",
    name: "Laundry",
    icon: "",
    waterUsage: 50,
    duration: "1 load",
    tips: [
      "Only run full loads to maximize efficiency",
      "Use cold water when possible",
      "Choose high-efficiency washing machines",
    ],
    image: "/modern-front-loading-washing-machine-with-clothes.jpg",
  },
  {
    id: "cooking",
    name: "Cooking",
    icon: "",
    waterUsage: 15,
    duration: "30 minutes",
    tips: [
      "Reuse pasta water for plants",
      "Steam vegetables instead of boiling",
      "Keep a pitcher of water in fridge instead of running tap",
    ],
    image: "/person-cooking-vegetables-in-modern-kitchen-with-s.jpg",
  },
  {
    id: "brushing",
    name: "Brushing Teeth",
    icon: "",
    waterUsage: 8,
    duration: "2 minutes",
    tips: [
      "Turn off tap while brushing - saves 6 liters",
      "Use a cup to rinse instead of running water",
      "Fix leaky faucets immediately",
    ],
    image: "/person-brushing-teeth-at-bathroom-sink-with-toothb.jpg",
  },
  {
    id: "garden",
    name: "Watering Garden",
    icon: "",
    waterUsage: 75,
    duration: "20 minutes",
    tips: [
      "Water early morning or evening to reduce evaporation",
      "Use drip irrigation systems",
      "Collect rainwater for garden use",
    ],
    image: "/person-watering-green-garden-plants-with-watering-.jpg",
  },
]

export default function AdultsPage() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const toggleActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId],
    )
    setShowResults(false)
  }

  const calculateTotal = () => {
    return activities
      .filter((activity) => selectedActivities.includes(activity.id))
      .reduce((total, activity) => total + activity.waterUsage, 0)
  }

  const getSelectedTips = () => {
    return activities
      .filter((activity) => selectedActivities.includes(activity.id))
      .flatMap((activity) => activity.tips)
  }

  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="fixed top-0 left-0 z-50 p-6 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center bg-background/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-border transition-all duration-500 ease-in-out hover:bg-background/90 hover:scale-105"
        >
          <h2 className="font-serif text-sm font-bold text-primary tracking-wider">Breathing Rivers</h2>
        </Link>
        <ThemeToggle />
      </div>

      <div className="fixed top-0 right-0 z-50 p-6">
        <Link
          href="/"
          className="flex items-center bg-background/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-border transition-all duration-500 ease-in-out hover:bg-background/90 hover:scale-105 font-semibold text-sm text-primary"
        >
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/daily-activity.jpg" alt="Daily Activities" className="w-full h-full object-cover" />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-cyan-900/70 dark:from-blue-950/80 dark:to-cyan-950/80" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-6 text-balance uppercase drop-shadow-lg">
            Adults
          </h1>
          <p className="text-xl text-white leading-relaxed mb-4 text-pretty drop-shadow-md">
            Every individual can make a difference in protecting our rivers and environment.
          </p>
          <p className="text-lg text-white/90 leading-relaxed text-pretty drop-shadow-md">
            Track your water usage, add trees to our monitoring system, and learn how your daily actions impact our
            water resources.
          </p>
        </div>
      </section>

      {/* Water Usage Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase">
              Your Daily Water Footprint
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Select your daily activities to calculate your water usage and learn how to conserve
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {activities.map((activity) => (
              <Card
                key={activity.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  selectedActivities.includes(activity.id)
                    ? "ring-2 ring-primary bg-primary/5 dark:bg-primary/10"
                    : "hover:ring-1 hover:ring-primary/50"
                } bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20`}
                onClick={() => toggleActivity(activity.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-4xl mb-3">{activity.icon}</div>
                  <h3 className="font-oswald text-xl font-bold mb-2 text-gray-900 dark:text-white uppercase">
                    {activity.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">{activity.duration}</p>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{activity.waterUsage}L water</p>
                  {selectedActivities.includes(activity.id) && (
                    <div className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-semibold">✓ Selected</div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Calculate Button */}
          {selectedActivities.length > 0 && (
            <div className="text-center">
              <button
                onClick={() => setShowResults(true)}
                className="px-12 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Calculate My Water Usage
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-oswald text-3xl font-bold text-center uppercase">
              Your Water Impact
            </DialogTitle>
            <DialogDescription className="text-center">
              See your daily water usage and learn how to reduce it
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Total Usage */}
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 h-fit">
                <p className="text-base text-gray-900 dark:text-white mb-2 font-semibold">Daily Water Usage</p>
                <p className="text-5xl font-bold text-primary mb-2">{calculateTotal()}L</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  That's {(calculateTotal() / 1000).toFixed(2)} cubic meters per day
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Annual usage: {(calculateTotal() * 365).toLocaleString()}L
                </p>
              </div>

              {/* Conservation Tips */}
              <div>
                <h3 className="font-oswald text-xl font-bold mb-4 text-gray-900 dark:text-white uppercase">
                  Ways to Reduce Your Water Footprint
                </h3>
                <div className="space-y-3">
                  {getSelectedTips().map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                    >
                      <span className="text-primary font-bold text-lg"></span>
                      <p className="text-sm text-gray-900 dark:text-white leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-primary/20">
              <p className="text-sm text-gray-900 dark:text-white leading-relaxed">
                By implementing these water-saving tips, you could reduce your daily water usage by up to{" "}
                <span className="font-bold text-primary">30-40%</span>, helping preserve our rivers and water resources
                for future generations.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Call to Action */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/design-mode/WhatsApp%20Image%202025-10-04%20at%2000.12.43_add4aa60.jpg"
            alt="Water droplet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/60 dark:bg-blue-950/70" />
        </div>

        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-oswald text-3xl md:text-4xl font-bold mb-6 text-white uppercase drop-shadow-lg">
            Every Drop Counts
          </h2>
          <p className="text-lg text-white leading-relaxed mb-8 drop-shadow-md">
            Small changes in our daily habits can make a significant impact on water conservation. Start today and be
            part of the solution to protect our rivers and water resources.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Explore More Roles
          </Link>
        </div>
      </section>
    </main>
  )
}
