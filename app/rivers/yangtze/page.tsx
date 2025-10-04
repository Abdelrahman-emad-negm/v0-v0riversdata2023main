"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ImageComparisonSlider from "@/components/image-comparison-slider"
import { LeftSidebar } from "@/components/left-sidebar"

export default function YangtzePage() {
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

      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-03%20at%2000.25.03_5114214e-lYGIwIsYsWKPWBLdvKH9WQPTsNprM6.mp4"
            type="video/mp4"
          />
        </video>

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white px-4 pt-16">
          <h1 className="font-serif text-5xl md:text-7xl font-bold drop-shadow-2xl">Yangtze River</h1>
          <p className="text-xl md:text-2xl mt-4 drop-shadow-lg">The Longest River in Asia</p>

          <div
            className="mt-8 max-w-6xl mx-auto text-left"
            style={{
              opacity: showDescription ? 1 : 0,
              transform: showDescription ? "translateX(0)" : "translateX(-50px)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <p className="text-base md:text-lg leading-relaxed drop-shadow-lg font-light">
              Stretching for about 6,300 km, the Yangtze is the longest river in Asia and the third longest in the
              world. Flowing entirely within China, it begins on the Tibetan Plateau and winds eastward through diverse
              landscapes before emptying into the East China Sea near Shanghai.For thousands of years, the Yangtze has
              nourished civilizations, serving as a vital route for transport, agriculture, and trade. Today, it remains
              central to China's economy and culture, but faces increasing pressures from industrialization, dams,
              pollution, and climate change.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-4">
        <div className="w-full lg:w-1/2 mx-auto">
          <audio controls className="w-full rounded-lg">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yang-dsca9iu6C7GRVLiuvO3yWwNjfbbsgp.mp3"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
      </section>

      {/* النص + الفيديو */}
      <section className="container mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground -mt-8 uppercase">
          THE THREE GORGES DAM
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div
            className="p-8 rounded-md flex flex-col w-full bg-cover bg-center relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: "url('/images/dam.jpg')",
              transform:
                hoveredBox === "From Sahara to the Nile" ? "translateZ(30px) scale(1.02)" : "translateZ(0) scale(1)",
              boxShadow:
                hoveredBox === "From Sahara to the Nile"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredBox("From Sahara to the Nile")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative z-10">
              <p className="text-white font-merri tracking-wide leading-relaxed">
                In 2000, Terra's MODIS satellite images showed the Yangtze River still flowing freely, with the Three
                Gorges Dam only partly built and construction sites visible on the banks.
              </p>
              <p className="text-white font-merri mt-6 leading-relaxed">
                By 2006, just six years later, MODIS imagery revealed the dam complete, spanning the entire river. A
                massive reservoir had formed behind it, replacing the narrow river channel with a wide, calm lake. The
                MODIS comparison highlights how quickly the dam transformed the Yangtze River and its surroundings.
              </p>
            </div>
          </div>

          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full min-h-[400px]">
            <ImageComparisonSlider
              beforeImage="/images/three-gorges-dam-2000.png"
              afterImage="/images/three-gorges-dam-2006.png"
              beforeAlt="Three Gorges Dam Area - July 2000 (During Construction)"
              afterAlt="Three Gorges Dam Area - May 2006 (After Completion)"
              beforeLabel="July 2000"
              afterLabel="May 2006"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-12">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 pb-16 pt-8">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase">VEGETATION</h2>

        <div className="w-full">
          <div
            className="rounded-lg shadow-xl overflow-hidden cursor-pointer"
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
            <img
              src="/images/yangtze-vegetation-ndvi.png"
              alt="Spatial distribution and significance of NDVI in the Upper Yangtze River Basin from 2001 to 2022"
              className="w-full h-auto rounded object-contain"
            />
          </div>

          <div className="mt-8 max-w-6xl mx-auto p-8 rounded-md bg-gray-800/70 backdrop-blur-sm">
            <p className="text-white font-merri text-lg leading-relaxed">
              Comparison between the spatial distribution of NDVI (left) and the dominant climate factors driving NDVI
              changes (right) in the Upper Yangtze River Basin from 2001 to 2022.
            </p>
            <p className="text-white font-merri text-lg leading-relaxed mt-4">
              The left map shows the vegetation cover classes ranging from low (red) to high (dark green), while the
              right map illustrates the dominant driving forces, including precipitation (yellow), temperature (green),
              and land utilization (brown).
            </p>
            <p className="text-white font-merri text-lg leading-relaxed mt-4">
              The arrows highlight areas where low vegetation cover corresponds with regions strongly influenced by land
              utilization, and areas of dense vegetation cover that are mainly driven by precipitation and temperature.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 pb-16 pt-8">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase">FIRES</h2>

        <div className="flex flex-col gap-12">
          {/* خريطة الحرائق في الأعلى */}
          <div
            className="rounded-lg shadow-xl overflow-hidden cursor-pointer"
            style={{
              transform: hoveredBox === "firesImage" ? "translateZ(30px) scale(1.02)" : "translateZ(0) scale(1)",
              boxShadow:
                hoveredBox === "firesImage"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredBox("firesImage")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <img
              src="/images/yangtze-fires-river.jpg"
              alt="Satellite view of fire hotspots in the Yangtze River delta region"
              className="w-full h-auto rounded object-contain"
            />
          </div>

          {/* النص في الأسفل مع خلفية fire-background.jpg */}
          <div
            className="p-8 rounded-md bg-cover bg-center relative overflow-hidden"
            style={{
              backgroundImage: "url('/images/fire-background.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative z-10">
              <p className="text-white font-merri tracking-wide leading-relaxed">
                On May 6, 2004, NASA's Terra satellite (MODIS sensor) spotted dozens of fires near the mouth of the
                Yangtze River in eastern China. In the image, the fires appear as red dots. The large lake on the left
                is Tai Lake, and to the east is the gray area of Shanghai city.
              </p>
              <p className="text-white font-merri mt-6 leading-relaxed">
                Most fires are in farmland areas, not in natural green vegetation, which suggests they were started on
                purpose for agriculture. Such burning is common at this time of year, but it can still affect weather,
                climate, air quality, and natural resources.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
      </section>
    </main>
  )
}
