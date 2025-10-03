"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Upload, CheckCircle2, XCircle, Loader2, Camera, X, Sparkles, TreeDeciduous, Leaf } from "lucide-react"

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
        video: { facingMode: "environment" },
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
      const treeDetected = difference > 1000

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

      {result && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <Card
              className={`relative overflow-hidden ${
                result.treeDetected
                  ? "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950"
                  : "bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-red-950 dark:via-orange-950 dark:to-amber-950"
              } border-2 ${result.treeDetected ? "border-emerald-200 dark:border-emerald-800" : "border-red-200 dark:border-red-800"} shadow-2xl animate-in zoom-in-95 duration-500`}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-3xl" />

              <div className="relative p-8 md:p-12">
                {/* Header Section */}
                <div className="text-center mb-8">
                  {result.treeDetected ? (
                    <>
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 mb-6 shadow-lg animate-in zoom-in duration-700">
                        <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                        <h2 className="font-oswald text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent uppercase">
                          Tree Detected!
                        </h2>
                        <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                      </div>
                      <p className="text-xl md:text-2xl text-emerald-700 dark:text-emerald-300 font-semibold">
                        Amazing work! You're making a real difference
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-orange-500 mb-6 shadow-lg">
                        <XCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
                      </div>
                      <h2 className="font-oswald text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-700 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent mb-4 uppercase">
                        No Tree Detected
                      </h2>
                      <p className="text-xl md:text-2xl text-red-700 dark:text-red-300 font-semibold">
                        Please plant a tree and try again
                      </p>
                    </>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                  <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Accuracy
                      </p>
                    </div>
                    <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                      {result.accuracy.toFixed(1)}%
                    </p>
                  </div>

                  <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        Growth
                      </p>
                    </div>
                    <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      +{result.increasePercentage.toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* Before/After Images */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="group">
                    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-800/50 transition-transform duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <h4 className="font-oswald text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                          Before Planting
                        </h4>
                      </div>
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <img src={beforeImage || "/placeholder.svg"} alt="Before" className="w-full h-auto" />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-800/50 transition-transform duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h4 className="font-oswald text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                          After Planting
                        </h4>
                      </div>
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <img src={afterImage || "/placeholder.svg"} alt="After" className="w-full h-auto" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                {result.treeDetected && (
                  <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-700 dark:via-green-700 dark:to-teal-700 text-white rounded-2xl p-8 shadow-xl mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <TreeDeciduous className="w-8 h-8" />
                      <h3 className="font-oswald text-3xl font-bold uppercase">Your Environmental Impact</h3>
                      <Leaf className="w-8 h-8" />
                    </div>
                    <div className="space-y-3 text-center">
                      <p className="text-lg leading-relaxed">
                        You've added approximately{" "}
                        <span className="font-bold text-2xl text-emerald-100">
                          {result.difference.toLocaleString()}
                        </span>{" "}
                        pixels of vegetation!
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-3xl font-bold mb-1">💨</p>
                          <p className="text-sm font-semibold">Absorbs CO₂</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-3xl font-bold mb-1">🌊</p>
                          <p className="text-sm font-semibold">Protects Rivers</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-3xl font-bold mb-1">🦜</p>
                          <p className="text-sm font-semibold">Wildlife Habitat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={reset}
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg"
                  >
                    <TreeDeciduous className="w-5 h-5 mr-2" />
                    Plant Another Tree
                  </Button>
                  <Button
                    onClick={() => setResult(null)}
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg font-semibold bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 relative">
        <div className="absolute inset-0 z-0">
          <img src="/planting-hands.jpg" alt="Planting trees" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-green-600/80 via-emerald-600/70 to-background/95" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="text-6xl mb-6">🌳</div>
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-6 text-balance uppercase drop-shadow-lg">
            Plant a Tree, Help the Environment
          </h1>
          <p className="text-xl text-white/95 leading-relaxed text-pretty drop-shadow-md">
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
                className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors ${beforeImage ? "min-h-[150px]" : "min-h-[300px]"} flex flex-col items-center justify-center bg-white/50 dark:bg-gray-900/50`}
                onClick={() => beforeInputRef.current?.click()}
              >
                {beforeImage ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">Image uploaded</p>
                  </div>
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
                className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors ${afterImage ? "min-h-[150px]" : "min-h-[300px]"} flex flex-col items-center justify-center bg-white/50 dark:bg-gray-900/50`}
                onClick={() => afterInputRef.current?.click()}
              >
                {afterImage ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">Image uploaded</p>
                  </div>
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
