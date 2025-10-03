"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

interface AdviceCategory {
  id: string
  title: string
  icon: string
  description: string
  tips: string[]
  benefits: string[]
  image: string
  link?: string
}

const adviceCategories: AdviceCategory[] = [
  {
    id: "environment",
    title: "Help Environment",
    icon: "🌳",
    description: "Plant trees and restore nature",
    tips: [
      "Plant trees along field boundaries to prevent erosion",
      "Create windbreaks to protect crops and reduce water loss",
      "Restore degraded land with native tree species",
      "Plant trees near water sources to protect water quality",
      "Join reforestation programs in your community",
    ],
    benefits: [
      "Improve air and water quality",
      "Increase biodiversity on your farm",
      "Reduce soil erosion by up to 80%",
      "Create additional income from timber",
    ],
    image: "/lush-green-trees-growing-along-riverbank-with-clea.jpg",
    link: "/farmers/plant-tree",
  },
  {
    id: "irrigation",
    title: "Smart Irrigation",
    icon: "💧",
    description: "Efficient water use in crop irrigation",
    tips: [
      "Use drip irrigation systems to deliver water directly to plant roots",
      "Install soil moisture sensors to water only when needed",
      "Schedule irrigation during early morning or evening to reduce evaporation",
      "Maintain irrigation equipment regularly to prevent leaks",
      "Use mulch around plants to retain soil moisture",
    ],
    benefits: ["Reduce water usage by up to 50%", "Lower energy costs", "Improve crop yields", "Prevent soil erosion"],
    image: "/modern-drip-irrigation-system-watering-crops-in-ag.jpg",
  },
  {
    id: "soil",
    title: "Soil Management",
    icon: "🌱",
    description: "Healthy soil retains more water",
    tips: [
      "Add organic matter and compost to improve soil water retention",
      "Practice crop rotation to maintain soil health",
      "Use cover crops to prevent erosion and retain moisture",
      "Avoid over-tilling which can damage soil structure",
      "Test soil regularly to optimize nutrient and water management",
    ],
    benefits: [
      "Increase water retention by 20-30%",
      "Reduce fertilizer needs",
      "Improve soil fertility",
      "Prevent nutrient runoff",
    ],
    image: "/rich-dark-fertile-soil-with-hands-holding-compost-.jpg",
  },
  {
    id: "crops",
    title: "Crop Selection",
    icon: "🌾",
    description: "Choose water-efficient crops",
    tips: [
      "Select drought-resistant crop varieties suited to your climate",
      "Plant native species that require less water",
      "Consider crop water requirements when planning rotations",
      "Use intercropping to maximize water efficiency",
      "Adjust planting dates to align with natural rainfall patterns",
    ],
    benefits: [
      "Reduce irrigation needs by 30-40%",
      "Increase resilience to drought",
      "Lower production costs",
      "Diversify farm income",
    ],
    image: "/golden-wheat-crops-growing-in-agricultural-field-u.jpg",
  },
  {
    id: "rainwater",
    title: "Rainwater Harvesting",
    icon: "🌧️",
    description: "Capture and store natural rainfall",
    tips: [
      "Build ponds or reservoirs to collect rainwater",
      "Install gutters and storage tanks on farm buildings",
      "Create contour bunds to slow water runoff",
      "Use swales to direct water to crop areas",
      "Maintain collection systems to prevent contamination",
    ],
    benefits: [
      "Free water source for irrigation",
      "Reduce dependence on groundwater",
      "Recharge aquifers naturally",
      "Provide water during dry seasons",
    ],
    image: "/rainwater-harvesting-system-with-storage-tanks-and.jpg",
  },
  {
    id: "runoff",
    title: "Prevent Runoff",
    icon: "🛡️",
    description: "Protect rivers from agricultural pollution",
    tips: [
      "Create buffer zones with vegetation along waterways",
      "Use terracing on sloped land to slow water flow",
      "Apply fertilizers and pesticides carefully to avoid excess",
      "Implement conservation tillage practices",
      "Plant grass waterways in drainage areas",
    ],
    benefits: [
      "Protect river water quality",
      "Reduce soil loss by 70-80%",
      "Save on fertilizer costs",
      "Support aquatic ecosystems",
    ],
    image: "/terraced-agricultural-land-with-vegetation-buffer-.jpg",
  },
  {
    id: "technology",
    title: "Modern Technology",
    icon: "📱",
    description: "Use technology for water management",
    tips: [
      "Install weather stations to track rainfall and evaporation",
      "Use mobile apps for irrigation scheduling",
      "Implement precision agriculture with GPS and sensors",
      "Monitor water usage with smart meters",
      "Access satellite data for crop water stress detection",
    ],
    benefits: [
      "Optimize water use efficiency",
      "Make data-driven decisions",
      "Reduce labor costs",
      "Increase productivity",
    ],
    image: "/farmer-using-tablet-and-sensors-for-smart-agricult.jpg",
  },
]

export default function FarmersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const selectedAdvice = adviceCategories.find((cat) => cat.id === selectedCategory)

  const handleCategoryClick = (category: AdviceCategory) => {
    if (category.link) {
      window.location.href = category.link
    } else {
      setSelectedCategory(category.id)
    }
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

      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance uppercase">
            For Farmers
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-pretty">
            As stewards of the land, farmers play a crucial role in protecting our rivers and water resources.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-pretty">
            Discover practical techniques to conserve water, restore nature, and build a sustainable future for your
            farm and community.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-foreground mb-4 uppercase">
              Water Conservation for Farmers
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Practical advice and proven techniques to conserve water and protect rivers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adviceCategories.slice(1).map((category) => (
              <Card
                key={category.id}
                className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-primary/50 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-oswald text-xl font-bold mb-2 text-gray-900 dark:text-white uppercase">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Category Details */}
      {selectedAdvice && (
        <section className="py-16 px-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-white to-green-50 dark:from-gray-900/50 dark:to-blue-900/20">
              <button
                onClick={() => setSelectedCategory(null)}
                className="mb-6 text-primary hover:text-primary/80 font-semibold flex items-center gap-2"
              >
                ← Back to Topics
              </button>

              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{selectedAdvice.icon}</div>
                <h2 className="font-oswald text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase">
                  {selectedAdvice.title}
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300">{selectedAdvice.description}</p>
              </div>

              {/* Image */}
              <div className="w-full h-64 mb-8 rounded-xl overflow-hidden">
                <img
                  src={selectedAdvice.image || "/placeholder.svg"}
                  alt={selectedAdvice.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tips */}
              <div className="mb-8">
                <h3 className="font-oswald text-2xl font-bold mb-6 text-gray-900 dark:text-white uppercase">
                  Practical Tips
                </h3>
                <div className="space-y-4">
                  {selectedAdvice.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
                    >
                      <span className="text-primary font-bold text-lg flex-shrink-0">{index + 1}.</span>
                      <p className="text-gray-900 dark:text-white leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-500/20">
                <h3 className="font-oswald text-2xl font-bold mb-4 text-gray-900 dark:text-white uppercase">
                  Benefits
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedAdvice.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                      <p className="text-gray-900 dark:text-white">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Impact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
            <h2 className="font-oswald text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white uppercase">
              Why Water Conservation Matters
            </h2>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Agriculture accounts for approximately 70% of global freshwater use. By implementing water-efficient
                practices, farmers can significantly reduce their environmental impact while maintaining or even
                improving crop yields.
              </p>
              <p>
                Protecting rivers and water sources ensures sustainable farming for future generations. Healthy rivers
                support biodiversity, provide irrigation water, and maintain the ecological balance essential for
                agriculture.
              </p>
              <p className="text-center font-semibold text-gray-900 dark:text-white text-xl">
                Every drop saved today secures tomorrow's harvest.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-oswald text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white uppercase">
            Start Conserving Today
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Implement these water-saving techniques on your farm and join the movement to protect our rivers and water
            resources for future generations.
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
