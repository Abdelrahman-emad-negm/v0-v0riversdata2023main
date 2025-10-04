"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LeftSidebar } from "@/components/left-sidebar"
import { ImageComparisonSlider } from "@/components/image-comparison-slider"

export default function AmazonPage() {
  const router = useRouter()
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setShowDescription(true), 300)
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
    <main className="min-h-screen bg-background">
      <LeftSidebar />

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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amaz10-HLZBuHOstvC0fu1NABzXOfoE5vnTle.mp4"
            type="video/mp4"
          />
        </video>

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold drop-shadow-2xl">Amazon River</h1>
          <p className="text-xl md:text-2xl mt-4 drop-shadow-lg">The Largest River in the World</p>

          <div className="mt-8 max-w-6xl mx-auto">
            <p
              className="text-left text-base md:text-lg leading-relaxed drop-shadow-lg transition-all duration-1000 ease-out"
              style={{
                opacity: showDescription ? 1 : 0,
                transform: showDescription ? "translateX(0)" : "translateX(-50px)",
              }}
            >
              Stretching over 6,400 km, the Amazon carries more water than any other river on Earth and drains the
              world's largest rainforest. It provides about 20% of the planet's freshwater outflow and sustains
              unmatched biodiversity. More than 30 million people, including Indigenous communities, rely on it for
              food, transport, and culture.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-4">
        <div className="w-full lg:w-1/2 mx-auto">
          <audio controls className="w-full rounded-lg">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amaz-JT2ElCmbIWNY9vVGBYKaukYLjMF49J.mp3"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase">VEGETATION</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div
            className="p-8 rounded-md flex flex-col w-full cursor-pointer relative overflow-hidden bg-gray-500/70"
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
            <p className="text-foreground font-merri tracking-wide leading-relaxed">
              The Amazon rainforest is home to the largest continuous stretch of tropical forest on Earth, producing
              about 20% of the planet's oxygen. Its dense vegetation regulates rainfall patterns, absorbs vast amounts
              of carbon dioxide, and sustains millions of species.
            </p>
            <p className="text-foreground font-merri mt-6 leading-relaxed">
              However, satellite observations of vegetation reveal alarming changes. Deforestation and human activities
              are reducing the forest cover, threatening biodiversity and weakening one of Earth's most important
              climate regulators.
            </p>
          </div>

          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full">
            <video className="w-full h-full rounded object-cover" autoPlay loop muted playsInline>
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amaz-mjMu6FkLJdT15N0w07sZ2ORLUNHllM.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 pb-16 pt-8">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase">FIRES</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full overflow-hidden">
            <ImageComparisonSlider
              beforeImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-03%20223329-at7JF1f0m5hf6LDvrY01Z1ZKTRLfRI.png"
              afterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-03%20223402-9b7bb8vupLB39QEW8X3rbcUPtyZVZw.png"
              beforeLabel="2005"
              afterLabel="2025"
            />
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
            className="p-8 rounded-md flex flex-col justify-center cursor-pointer relative overflow-hidden bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40 border border-red-200 dark:border-red-800"
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
            <p className="text-gray-800 dark:text-gray-100 font-merri leading-relaxed mb-4">
              The Port of Manaus recorded a water level of 12.66 meters on October 4, 2024 - the lowest since records
              began in 1902. This severe drought is directly linked to deforestation and fires in the Amazon.
            </p>
            <p className="text-gray-800 dark:text-gray-100 font-merri leading-relaxed">
              As trees are cut down, the forest loses its ability to generate rainfall. Less vegetation means less
              moisture, creating a dangerous cycle of drought and fire that threatens river transportation, communities,
              and wildlife throughout the region.
            </p>
          </div>

          <div className="border-4 border-gray-300 rounded-lg shadow-xl p-4 bg-white">
            <img
              src="/amazon-water-levels-graph.jpg"
              alt="Amazon River Water Levels Graph"
              className="w-full h-full rounded object-contain"
            />
          </div>
        </div>

        <div className="mt-8 w-full border-t-2 border-gray-300"></div>
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
