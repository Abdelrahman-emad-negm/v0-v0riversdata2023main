"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ImageComparisonSlider from "@/components/image-comparison-slider"
import { LeftSidebar } from "@/components/left-sidebar"

export default function NilePage() {
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nilee-tmswqmyEXxpTqvJAwQpQxI18aEDU7R.mp4"
            type="video/mp4"
          />
        </video>

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold drop-shadow-2xl">Nile River</h1>
          <p className="text-xl md:text-2xl mt-4 drop-shadow-lg">The Longest River in the World</p>

          <div className="mt-8 max-w-6xl mx-auto">
            <p
              className="text-left text-base md:text-lg leading-relaxed drop-shadow-lg transition-all duration-1000 ease-out"
              style={{
                opacity: showDescription ? 1 : 0,
                transform: showDescription ? "translateX(0)" : "translateX(-50px)",
              }}
            >
              Stretching for about 6,650 km, the Nile flows through 11 African countries and has been the cradle of
              ancient Egyptian civilization. It is the main source of freshwater for millions of people, supporting
              agriculture, transport, and daily life across northeastern Africa. Today, the Nile remains a lifeline, but
              faces growing stress from rising temperatures, population demands, and climate change.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-4">
        <div className="w-full lg:w-1/2 mx-auto">
          <audio controls className="w-full rounded-lg">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nile-OSlIPpTfy7WkWwwO9nrU48bi00Eg5M.mp3"
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
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase tracking-wider">
          TEMPERATURE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div
            className="p-8 rounded-md flex flex-col w-full cursor-pointer relative overflow-hidden bg-gray-500/70"
            style={{
              transform: hoveredBox === "temperature" ? "translateZ(30px) scale(1.02)" : "translateZ(0) scale(1)",
              boxShadow:
                hoveredBox === "temperature"
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setHoveredBox("temperature")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <p className="text-foreground font-merri tracking-wide leading-relaxed">
              This global temperature map clearly shows that Africa stands out as the hottest continent on Earth.
              Persistent high land surface temperatures increase evaporation rates and intensify drought conditions,
              placing severe stress on freshwater resources.
            </p>
            <p className="text-foreground font-merri mt-6 leading-relaxed">
              For the Nile, Africa's longest river and a lifeline for millions, rising heat reduces water flow, affects
              agricultural productivity, and heightens the challenges of water management. As temperatures continue to
              climb, the Nile becomes increasingly vulnerable, making its preservation more critical than ever.
            </p>
          </div>

          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full">
            <video className="w-full h-full rounded object-cover" autoPlay loop muted playsInline>
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mod%20Lstd%20M-wNyUO8JKA883uQ2OVF1mUx97UwDhqk.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 pb-16 pt-8">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground uppercase">FIRES</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div
            className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full overflow-hidden cursor-pointer"
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
              src="/images/design-mode/Screenshot%202025-10-03%20073524.png"
              alt="NASA FIRMS Fire Map of Nile Region"
              className="w-full h-full rounded object-cover"
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
                On October 17, 2014, NASA's Terra satellite (MODIS) observed several small fires burning across the Nile
                Delta, most likely linked to agricultural practices. While such fires are common after harvests, they
                release large amounts of smoke and pollutants into the air.
              </p>
              <p className="text-white font-merri mt-6 leading-relaxed">
                These emissions can affect air quality for millions of people living around the Nile, contribute to
                greenhouse gases, and add stress to an already vulnerable river system. Over time, repeated burning also
                depletes soil quality, reducing agricultural productivity and increasing pressure on the Nile's
                freshwater resources.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full border-t-2 border-gray-300"></div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-oswald text-5xl font-bold text-center mb-12 text-foreground -mt-8 uppercase">
          FROM SAHARA TO THE NILE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div
            className="p-8 rounded-md flex flex-col w-full bg-cover bg-center relative overflow-hidden cursor-pointer"
            style={{
              backgroundImage: "url('/images/dust-storm-nile.png')",
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
                This comparison between 2019 and 2022 highlights the rise of dust across Africa, showing how North
                Africa—especially the Sahara Desert—is one of the largest global dust sources. Winds carry this dust
                south and east, reaching the Nile region in Egypt and Sudan.
              </p>
              <p className="text-white font-merri mt-6 leading-relaxed">
                Increased dust affects air quality and ecosystems along the river. When deposited on farmland, it can
                alter soil fertility, and when settling in the Nile itself, it may impact aquatic environments. The
                images show how broader climatic and environmental shifts in North Africa directly and indirectly
                influence the Nile, a vital lifeline for millions.
              </p>
            </div>
          </div>

          <div className="border-8 border-yellow-400 rounded-lg shadow-xl p-2 bg-yellow-50 flex w-full min-h-[400px]">
            <ImageComparisonSlider
              beforeImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-03%20033209-NncPvly1Xh2YXPlbp8p9mkP8upRBBO.png"
              afterImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-03%20033242-9wPBkwLngrLJ1s2bePCByoAsruotw8.png"
              beforeAlt="Nile River Temperature Map - After"
              afterAlt="Nile River Temperature Map - Before"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
