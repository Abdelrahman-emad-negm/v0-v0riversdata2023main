"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  image: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "You are brushing your teeth. The water is running from the tap. What is the best thing to do?",
    options: [
      "Let the water flow so you can hear the nice sound.",
      "Turn off the tap while you are brushing and turn it back on to rinse.",
      "Try to brush your teeth faster than the water fills the sink.",
      "Open the tap even more so the toothbrush gets cleaner.",
    ],
    correctAnswer: 1,
    explanation:
      "Turning off the tap saves a lot of water. This helps protect the environment and keeps more water in our rivers and lakes.",
  },
  {
    id: 2,
    question: "Which of these activities uses the MOST water in a typical household?",
    options: ["Washing dishes", "Toilet flushing", "Showering", "Laundry"],
    correctAnswer: 1,
    explanation:
      "Toilet flushing typically uses the most water in households, accounting for about 30% of indoor water use.",
  },
  {
    id: 3,
    question: "What should you do if you see trash near a river?",
    options: [
      "Leave it - it's not my problem",
      "Pick it up and dispose of it properly",
      "Push it into the water",
      "Take a photo and walk away",
    ],
    correctAnswer: 1,
    explanation:
      "Always pick up trash near rivers and dispose of it properly. Trash can harm aquatic life and pollute water sources.",
  },
  {
    id: 4,
    question: "How long does it take for a plastic bottle to decompose in water?",
    options: ["1 year", "10 years", "100 years", "450+ years"],
    correctAnswer: 3,
    explanation:
      "Plastic bottles can take 450 years or more to decompose, causing long-term pollution in rivers and oceans.",
  },
  {
    id: 5,
    question: "What is the best time to water plants to conserve water?",
    options: ["Midday when it's hottest", "Early morning or evening", "Anytime is fine", "Only at night"],
    correctAnswer: 1,
    explanation:
      "Watering early morning or evening reduces evaporation, ensuring plants get more water while conserving resources.",
  },
  {
    id: 6,
    question: "Which action helps protect river ecosystems the most?",
    options: [
      "Using chemical fertilizers",
      "Disposing motor oil in drains",
      "Planting trees along riverbanks",
      "Building more concrete structures",
    ],
    correctAnswer: 2,
    explanation:
      "Planting trees along riverbanks prevents erosion, filters pollutants, and provides habitat for wildlife.",
  },
]

const waterLevelVideos = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-01%20at%2006.04.49_2cee550e-IVJ2po42qcx8KrHyqvRLbrNO4S7bvQ.mp4", // Empty/dry barrel
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-01%20at%2006.05.16_cbaed6cd-EWdjU5xLBEOWM2S1mkgCzMuJH8ACJE.mp4", // 1 correct answer
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-01%20at%2006.32.08_daadbf1d-WvOLwB6bpGLpjZ9KN56st6bsHiubC2.mp4", // 2 correct answers
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-01%20at%2006.42.04_d54bc31b-8j9abU0hjEDNNY8Z250tHYAj5P7rnj.mp4", // 3 correct answers
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-01%20at%2006.17.25_a94a3204-ic93hMOKPYyNVrujVUHyf84qeYjRVc.mp4", // 4 correct answers
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-01%20at%2006.20.21_4505bd61-lPszJbiBTgwEwDDDRguezX51Fdw6by.mp4", // 5 correct answers
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-10-01%20at%2018.45.21_13ea77d9-ax1EVyNeY2GV9cY19h7smcv4f7fl6r.mp4", // Updated video 6 for perfect score (6 correct answers)
]

export default function StudentsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    setIsTransitioning(true)

    setTimeout(() => {
      video.play().catch(() => {})
      setIsTransitioning(false)
    }, 100)
  }, [score])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)

    setShowExplanation(true)
    let finalScore = score
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      finalScore = score + 1
      setScore(finalScore)
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion])

    if (currentQuestion === quizQuestions.length - 1) {
      const delayTime = finalScore === 6 ? 10000 : 3000
      setTimeout(() => {
        setQuizCompleted(true)
      }, delayTime)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowExplanation(true)
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      const newScore = score + 1
      setScore(newScore)
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion])

    if (currentQuestion === quizQuestions.length - 1) {
      const delayTime = score === 6 ? 10000 : 3000
      setTimeout(() => {
        setQuizCompleted(true)
      }, delayTime)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage === 100) return "Perfect! You're a River Guardian!"
    if (percentage >= 80) return "Excellent! You really care about rivers!"
    if (percentage >= 60) return "Good job! Keep learning about water conservation!"
    return "Keep learning! Every small action helps protect our rivers!"
  }

  const getRiverLevel = () => {
    const maxScore = answeredQuestions.length || 1
    const percentage = (score / maxScore) * 100
    return percentage
  }

  const getRiverStatus = () => {
    const level = getRiverLevel()
    if (level >= 80) return "River is thriving!"
    if (level >= 60) return "River is healthy"
    if (level >= 40) return "River needs care"
    if (level >= 20) return "River is drying"
    return "River is in danger"
  }

  const getRiverColor = () => {
    const level = getRiverLevel()
    if (level >= 80) return "from-blue-400 to-blue-600"
    if (level >= 60) return "from-blue-300 to-blue-500"
    if (level >= 40) return "from-yellow-300 to-blue-400"
    if (level >= 20) return "from-orange-300 to-yellow-400"
    return "from-red-300 to-orange-400"
  }

  if (quizCompleted) {
    const progressImage = score === 0 ? "/progress_0_6.png" : `/progress${score}_6.png`

    return (
      <main className="min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <img src="/earth-water.jpg" alt="Ocean background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85 dark:bg-background/90" />
        </div>

        <div className="relative z-10">
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

          <section className="pt-32 pb-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h1 className="font-oswald text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white -mt-8 uppercase">
                QUIZ COMPLETE!
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Results Card */}
                <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
                  <div className="mb-8 flex justify-center">
                    <div
                      className="relative w-64 h-64 bg-contain bg-center bg-no-repeat flex items-center justify-center"
                      style={{ backgroundImage: `url(${progressImage})` }}
                    >
                      <p className="text-6xl font-bold text-white drop-shadow-lg">
                        {score}/{quizQuestions.length}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{getScoreMessage()}</p>
                  </div>
                </Card>

                {/* What You Learned - Transparent Box */}
                <div className="p-8 md:p-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-white/20 text-left">
                  <h3 className="font-oswald text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white -mt-8 uppercase">
                    WHAT YOU LEARNED!
                  </h3>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">1.</span>
                      <span className="text-foreground text-lg">
                        Plastic bottles take 450+ years to decompose in water
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">2.</span>
                      <span className="text-foreground text-lg">
                        Planting trees along riverbanks protects ecosystems
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold text-xl">3.</span>
                      <span className="text-foreground text-lg">
                        Every action counts in protecting our water resources
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestartQuiz}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  Retake Quiz
                </button>
                <Link
                  href="/"
                  className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors shadow-lg hover:shadow-xl text-center"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <main className="min-h-screen relative pb-32">
      <div className="fixed inset-0 z-0">
        <img src="/ocean-background.jpg" alt="Ocean background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/30 dark:bg-background/50" />
      </div>

      <div className="relative z-10">
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

        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-8">
              <h1 className="font-oswald text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg uppercase">
                Ready to Protect Our Rivers
              </h1>

              <div className="w-full space-y-6">
                <div className="text-center mb-4">
                  <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white text-center drop-shadow-md uppercase">
                    Question {currentQuestion + 1}/{quizQuestions.length}
                  </h2>
                </div>

                {/* Question and Video Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Question Text */}
                  <div className="flex items-center justify-center">
                    <h2 className="font-oswald text-xl md:text-2xl font-semibold text-white text-center drop-shadow-lg uppercase">
                      {question.question}
                    </h2>
                  </div>

                  {/* Video Box */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                      <video
                        ref={videoRef}
                        key={score}
                        src={waterLevelVideos[score]}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          isTransitioning ? "opacity-0" : "opacity-100"
                        }`}
                        muted
                        playsInline
                        autoPlay
                        preload="auto"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                        <p className="text-2xl font-bold text-primary">
                          {score}/{quizQuestions.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answer Options - Full Width */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrect = index === question.correctAnswer
                    const showCorrect = showExplanation && isCorrect
                    const showIncorrect = showExplanation && isSelected && !isCorrect

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`p-4 rounded-xl text-left transition-all duration-100 backdrop-blur-md ${
                          showCorrect
                            ? "bg-green-500/40 border-2 border-green-400"
                            : showIncorrect
                              ? "bg-red-500/40 border-2 border-red-400"
                              : isSelected
                                ? "bg-primary/40 border-2 border-primary"
                                : "bg-white/20 hover:bg-white/30 border-2 border-white/30"
                        } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer hover:scale-102"}`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                              showCorrect
                                ? "bg-green-500 text-white"
                                : showIncorrect
                                  ? "bg-red-500 text-white"
                                  : isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-white/80 text-foreground"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-white font-bold text-sm drop-shadow-lg">{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Explanation Box - Full Width Below */}
                {showExplanation && (
                  <div className="w-full p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
                    {selectedAnswer === question.correctAnswer ? (
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <img
                          src="/true-stamp.jpg"
                          alt="True stamp"
                          className="w-48 h-48 object-contain -rotate-[15deg]"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <img src="/false-stamp.jpg" alt="False stamp" className="w-48 h-48 object-contain -rotate-12" />
                      </div>
                    )}
                    <div className="relative z-10">
                      <h3 className="font-oswald text-lg font-bold mb-3 text-gray-900 dark:text-gray-900 uppercase">
                        {selectedAnswer === question.correctAnswer ? "True Answer!" : "False Answer!"}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-700 text-sm leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-center items-center gap-3">
                  {!showExplanation ? (
                    <button
                      onClick={handleRestartQuiz}
                      className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold text-base hover:bg-orange-600 transition-all shadow-2xl hover:shadow-xl"
                    >
                      Restart
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleRestartQuiz}
                        className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold text-base hover:bg-orange-600 transition-all shadow-2xl hover:shadow-xl"
                      >
                        Restart
                      </button>
                      {currentQuestion < quizQuestions.length - 1 && (
                        <button
                          onClick={handleNextQuestion}
                          className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-bold text-base hover:bg-accent/90 transition-all shadow-2xl hover:shadow-xl"
                        >
                          Next
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
