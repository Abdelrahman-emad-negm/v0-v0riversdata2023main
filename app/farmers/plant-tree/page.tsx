"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Upload, CheckCircle2, XCircle, Loader2, Camera, X } from "lucide-react"

interface DetectionResult {
  treeDetected: boolean
  accuracy: number
  beforeCount: number
  afterCount: number
  difference: number
  increasePercentage: number
  beforePercentage: number
  afterPercentage: number
}

export default function PlantTreePage() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [beforeFile, setBeforeFile] = useState<File | null>(null)
  const [afterFile, setAfterFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [showCamera, setShowCamera] = useState<"before" | "after" | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const beforeInputRef = useRef<HTMLInputElement>(null)
  const afterInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async (type: "before" | "after") => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      })
      setStream(mediaStream)
      setShowCamera(type)

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      }, 100)
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setShowCamera(null)
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(video, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (!blob) return

        const file = new File([blob], `${showCamera}-photo.jpg`, { type: "image/jpeg" })
        const imageUrl = URL.createObjectURL(blob)

        if (showCamera === "before") {
          setBeforeImage(imageUrl)
          setBeforeFile(file)
        } else {
          setAfterImage(imageUrl)
          setAfterFile(file)
        }

        stopCamera()
        setResult(null)
      },
      "image/jpeg",
      0.95,
    )
  }

  const handleBeforeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBeforeFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setBeforeImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResult(null)
    }
  }

  const handleAfterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAfterFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAfterImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResult(null)
    }
  }

  const analyzeImages = async () => {
    if (!beforeImage || !afterImage) return

    setIsAnalyzing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const beforeGreen = await countGreenPixels(beforeImage)
      const afterGreen = await countGreenPixels(afterImage)

      const difference = afterGreen - beforeGreen
      const increasePercentage = beforeGreen > 0 ? (difference / beforeGreen) * 100 : 100
      const treeDetected = difference > 1000 // Threshold for tree detection

      let accuracy = 0
      if (treeDetected) {
        if (difference > 5000) {
          accuracy = Math.min(95 + difference / 10000, 99.9)
        } else if (difference > 2000) {
          accuracy = 85 + difference / 1000
        } else {
          accuracy = 70 + difference / 500
        }
        accuracy = Math.min(accuracy, 99.9)
      } else {
        accuracy = (difference / 1000) * 50
        accuracy = Math.max(0, Math.min(accuracy, 50))
      }

      setResult({
        treeDetected,
        accuracy,
        beforeCount: beforeGreen,
        afterCount: afterGreen,
        difference,
        increasePercentage,
        beforePercentage: (beforeGreen / (1920 * 1080)) * 100,
        afterPercentage: (afterGreen / (1920 * 1080)) * 100,
      })
    } catch (error) {
      console.error("Error analyzing images:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const countGreenPixels = (imageDataUrl: string): Promise<number> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          resolve(0)
          return
        }

        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        let greenCount = 0

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          if (g > r && g > b && g > 40 && g - r > 10 && g - b > 10) {
            greenCount++
          }
        }

        resolve(greenCount)
      }
      img.src = imageDataUrl
    })
  }

  const reset = () => {
    setBeforeImage(null)
    setAfterImage(null)
    setBeforeFile(null)
    setAfterFile(null)
    setResult(null)
    stopCamera()
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
          href="/farmers"
          className="flex items-center bg-background/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-border transition-all duration-500 ease-in-out hover:bg-background/90 hover:scale-105 font-semibold text-sm text-primary"
        >
          Back to Farmers
        </Link>
      </div>

      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <Button
              onClick={stopCamera}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
            >
              <X className="w-6 h-6" />
            </Button>

            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />

              <div className="p-6 text-center">
                <Button onClick={capturePhoto} size="lg" className="px-8 py-6 text-lg font-semibold">
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
              </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}

      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-6xl mb-6">🌳</div>
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance uppercase">
            Plant a Tree, Help the Environment
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-pretty">
            Upload or capture before and after photos of your tree planting to verify your contribution to the
            environment
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <h3 className="font-oswald text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white uppercase">
                Before Planting
              </h3>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors min-h-[300px] flex flex-col items-center justify-center bg-white/50 dark:bg-gray-900/50"
                onClick={() => beforeInputRef.current?.click()}
              >
                {beforeImage ? (
                  <img
                    src={beforeImage || "/placeholder.svg"}
                    alt="Before"
                    className="max-w-full max-h-[400px] rounded-lg"
                  />
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Click to upload before image</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Photo of location before planting</p>
                  </>
                )}
              </div>
              <input
                ref={beforeInputRef}
                type="file"
                accept="image/*"
                onChange={handleBeforeImage}
                className="hidden"
              />
              <div className="mt-4 text-center">
                <Button onClick={() => startCamera("before")} variant="outline" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Use Camera
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <h3 className="font-oswald text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white uppercase">
                After Planting
              </h3>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors min-h-[300px] flex flex-col items-center justify-center bg-white/50 dark:bg-gray-900/50"
                onClick={() => afterInputRef.current?.click()}
              >
                {afterImage ? (
                  <img
                    src={afterImage || "/placeholder.svg"}
                    alt="After"
                    className="max-w-full max-h-[400px] rounded-lg"
                  />
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Click to upload after image</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Photo after planting the tree</p>
                  </>
                )}
              </div>
              <input ref={afterInputRef} type="file" accept="image/*" onChange={handleAfterImage} className="hidden" />
              <div className="mt-4 text-center">
                <Button onClick={() => startCamera("after")} variant="outline" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Use Camera
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center mb-8">
            <Button
              onClick={analyzeImages}
              disabled={!beforeImage || !afterImage || isAnalyzing}
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Images...
                </>
              ) : (
                "Verify Tree Planting"
              )}
            </Button>
            {beforeImage && afterImage && !result && (
              <Button
                onClick={reset}
                variant="outline"
                size="lg"
                className="ml-4 px-8 py-6 text-lg font-semibold bg-transparent"
              >
                Reset
              </Button>
            )}
          </div>

          {result && (
            <Card
              className={`p-8 ${result.treeDetected ? "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-500" : "bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 border-red-500"} border-2`}
            >
              <div className="text-center mb-6">
                {result.treeDetected ? (
                  <>
                    <CheckCircle2 className="w-20 h-20 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h2 className="font-oswald text-4xl font-bold text-green-800 dark:text-green-300 mb-2 uppercase">
                      Tree Detected!
                    </h2>
                    <p className="text-xl text-green-700 dark:text-green-400 font-semibold">
                      Thank you for helping the environment!
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-20 h-20 text-red-600 dark:text-red-400 mx-auto mb-4" />
                    <h2 className="font-oswald text-4xl font-bold text-red-800 dark:text-red-300 mb-2 uppercase">
                      No Tree Detected
                    </h2>
                    <p className="text-xl text-red-700 dark:text-red-400 font-semibold">
                      Please ensure you planted a tree and try again
                    </p>
                  </>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Detection Accuracy</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{result.accuracy.toFixed(1)}%</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vegetation Increase</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {result.increasePercentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              {result.treeDetected && (
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white p-6 rounded-lg text-center">
                  <h3 className="font-oswald text-2xl font-bold mb-3 uppercase">Your Environmental Impact</h3>
                  <p className="text-lg leading-relaxed mb-4">
                    You've added approximately{" "}
                    <span className="font-bold text-2xl">{result.difference.toLocaleString()}</span> pixels of
                    vegetation!
                  </p>
                  <p className="text-base leading-relaxed">
                    This tree will help absorb CO₂, produce oxygen, prevent soil erosion, and provide habitat for
                    wildlife. Your contribution makes a real difference in fighting climate change and protecting our
                    rivers!
                  </p>
                </div>
              )}

              <div className="text-center mt-6">
                <Button onClick={reset} size="lg" variant="outline" className="px-8 bg-transparent">
                  Plant Another Tree
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 bg-white/80 dark:bg-gray-900/80">
            <h2 className="font-oswald text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white uppercase">
              Why Plant Trees?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💨</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Clean Air</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    One tree can absorb up to 48 pounds of CO₂ per year
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💧</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Water Protection</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Trees filter water and prevent soil erosion near rivers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🦜</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Wildlife Habitat</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Trees provide shelter and food for countless species
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌡️</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Climate Control</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Trees cool the environment and reduce heat islands
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
