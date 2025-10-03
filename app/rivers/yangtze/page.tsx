"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function YangtzePage() {
  const router = useRouter()
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleExploreMore = () => {
    router.push("/")
    setTimeout(() => {
      const element = document.getElementById("discover-rivers")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
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
        <button
          onClick={handleExploreMore}
          className="flex items-center bg-background/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-border transition-all duration-500 ease-in-out hover:bg-background/90 hover:scale-105 cursor-pointer"
        >
          <h2 className="font-serif text-sm font-bold text-primary tracking-wider">Explore More</h2>
        </button>
      </div>

      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yangtze-eAlUNT9R32k8voyyFyAvMj3qKsg5VH.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center text-white px-4 max-w-5xl">
          <h1 className="font-oswald text-5xl md:text-7xl font-bold drop-shadow-2xl uppercase">Yangtze River</h1>
          <p className="text-xl md:text-2xl mt-4 drop-shadow-lg">The Longest River in Asia</p>
          <p className="text-base md:text-lg mt-6 drop-shadow-lg leading-relaxed">
            Stretching for about 6,300 km, the Yangtze is the longest river in Asia and the third longest in the world.
            Flowing entirely within China, it begins on the Tibetan Plateau and winds eastward through diverse
            landscapes before emptying into the East China Sea near Shanghai. For thousands of years, the Yangtze has
            nourished civilizations, serving as a vital route for transport, agriculture, and trade. Today, it remains
            central to China's economy and culture, but faces increasing pressures from industrialization, dams,
            pollution, and climate change.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-4">
        <div className="w-full lg:w-1/2 mx-auto">
          <audio controls className="w-full rounded-lg">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_MSQncApIxGTAKdjDXP55fnhUitOs/r1qoDf5TRXiYvCokZLYl_o/public/audio/yangtze/audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase">VEGETATION</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div
            className="p-8 rounded-md flex flex-col w-full cursor-pointer relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30"
            style={{
              transform: hoveredBox === "vegetation" ? "translateZ(30px) scale(1.02)" : "translateZ(0) scale(1)",
              boxShadow:
                hoveredBox === "vegetation"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredBox("vegetation")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <p className="text-gray-900 dark:text-white font-merri tracking-wide leading-relaxed">
              The Amazon rainforest is home to the largest continuous stretch of tropical forest on Earth, producing
              about 20% of the planet's oxygen. Its dense vegetation regulates rainfall patterns, absorbs vast amounts
              of carbon dioxide, and sustains millions of species.
            </p>
            <p className="text-gray-900 dark:text-white font-merri mt-6 leading-relaxed">
              However, satellite observations of vegetation reveal alarming changes. Deforestation and human activities
              are reducing the forest cover, threatening biodiversity and weakening one of Earth's most important
              climate regulators.
            </p>
          </div>

          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full">
            <video className="w-full h-full rounded object-cover" autoPlay loop muted playsInline>
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amaz-DqxT5D3UgUqpx7lYYO6m6veq52xxN7.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div className="w-full border-t-2 border-gray-300 dark:border-gray-700"></div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 pb-16 pt-8">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase">FIRES</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full overflow-hidden">
            <video className="w-full h-full rounded object-cover scale-110" autoPlay loop muted playsInline>
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-02%20at%2014.46.57_d400de67-cBBvkyryAT9MLPvMXUUTlXP7C1Xq1y.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div
            className="p-8 rounded-md flex flex-col w-full bg-cover bg-center relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: "url('/fire-background.jpg')",
              transform: hoveredBox === "fires" ? "translateZ(30px) scale(1.02)" : "translateZ(0) scale(1)",
              boxShadow:
                hoveredBox === "fires"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredBox("fires")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative z-10">
              <p className="text-white font-merri tracking-wide leading-relaxed">
                Fires can occur naturally or due to human activity, affecting forests, grasslands, and wildlife. In the
                Amazon, fires caused by deforestation and land clearing destroy forest and threaten countless species.
              </p>
              <p className="text-white font-merri mt-6 leading-relaxed">
                These fires also impact the Amazon River and its surrounding vegetation. Loss of forest cover reduces
                the rainforest's ability to regulate rainfall, which can alter river flow and increase sediment in the
                water. The weakened vegetation absorbs less carbon dioxide and disrupts the river ecosystem, affecting
                both wildlife and the communities that depend on the Amazon for food, water, and resources.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div
            className="p-8 rounded-md flex flex-col justify-center cursor-pointer relative overflow-hidden bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30"
            style={{
              transform: hoveredBox === "waterLevels" ? "translateZ(30px) scale(1.02)" : "translateZ(0) scale(1)",
              boxShadow:
                hoveredBox === "waterLevels"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredBox("waterLevels")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <h3 className="font-oswald text-2xl font-bold text-gray-900 dark:text-white mb-4 uppercase">
              Record Low Water Levels
            </h3>
            <p className="text-gray-900 dark:text-white font-merri leading-relaxed mb-4">
              The Port of Manaus recorded a water level of 12.66 meters on October 4, 2024 - the lowest since records
              began in 1902. This severe drought is directly linked to deforestation and fires in the Amazon.
            </p>
            <p className="text-gray-900 dark:text-white font-merri leading-relaxed">
              As trees are cut down, the forest loses its ability to generate rainfall. Less vegetation means less
              moisture, creating a dangerous cycle of drought and fire that threatens river transportation, communities,
              and wildlife throughout the region.
            </p>
          </div>

          <div className="border-4 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-4 bg-white dark:bg-gray-800">
            <img
              src="/amazon-water-levels-graph.jpg"
              alt="Amazon River Water Levels Graph"
              className="w-full h-full rounded object-contain"
            />
          </div>
        </div>

        <div className="mt-8 w-full border-t-2 border-gray-300 dark:border-gray-700"></div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground -mt-8 uppercase">
          HUMAN ACTIVITIES
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full">
            <img src="/amazon-river.jpg" alt="Amazon River" className="w-full h-full rounded object-cover" />
          </div>

          <div
            className="p-8 rounded-md flex flex-col w-full bg-cover bg-center relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: "url('/drought-background.jpg')",
              transform: hoveredBox === "humanActivities" ? "translateZ(30px) scale(1.02)" : "translateZ(0) scale(1)",
              boxShadow:
                hoveredBox === "humanActivities"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredBox("humanActivities")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative z-10">
              <p className="text-white font-merri tracking-wide leading-relaxed">
                Over the past two decades, human activities such as forest burning for agriculture and global greenhouse
                gas emissions have increased atmospheric dryness over the Amazon.
              </p>
              <p className="text-white font-merri mt-6 leading-relaxed">
                This reduces rainfall and soil moisture, weakening the forest's ability to supply water to the Amazon
                River. Fires release aerosols like black carbon, which warm the atmosphere and disrupt cloud formation,
                further decreasing river flow and affecting aquatic life and local communities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
