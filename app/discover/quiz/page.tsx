"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Sparkles, Sun, Moon, TreePine, Waves, Flame, Flower2, Coffee, Wind } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { perfumes } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"

interface QuizQuestion {
  id: number
  question: string
  subtitle: string
  type: "single" | "multiple" | "slider" | "image"
  options: {
    value: string
    label: string
    description?: string
    icon?: React.ReactNode
    image?: string
    traits: string[]
  }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When do you usually wear fragrance?",
    subtitle: "Select all that apply",
    type: "multiple",
    options: [
      { value: "daily", label: "Daily Wear", description: "Office, casual outings", icon: <Sun className="h-6 w-6" />, traits: ["versatile", "fresh", "subtle"] },
      { value: "evening", label: "Evening Events", description: "Dinners, parties", icon: <Moon className="h-6 w-6" />, traits: ["intense", "seductive", "warm"] },
      { value: "special", label: "Special Occasions", description: "Dates, celebrations", icon: <Sparkles className="h-6 w-6" />, traits: ["unique", "memorable", "luxurious"] },
      { value: "outdoor", label: "Outdoor Activities", description: "Sports, nature", icon: <TreePine className="h-6 w-6" />, traits: ["fresh", "aquatic", "energizing"] },
    ]
  },
  {
    id: 2,
    question: "Which environment appeals to you most?",
    subtitle: "Choose the scene that resonates with you",
    type: "image",
    options: [
      { value: "forest", label: "Misty Forest", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop", traits: ["woody", "green", "earthy"] },
      { value: "beach", label: "Ocean Breeze", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop", traits: ["aquatic", "fresh", "clean"] },
      { value: "garden", label: "Blooming Garden", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop", traits: ["floral", "sweet", "romantic"] },
      { value: "desert", label: "Desert Sunset", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop", traits: ["spicy", "warm", "exotic"] },
    ]
  },
  {
    id: 3,
    question: "What scent families attract you?",
    subtitle: "Select up to 3 favorites",
    type: "multiple",
    options: [
      { value: "floral", label: "Floral", description: "Rose, jasmine, lily", icon: <Flower2 className="h-6 w-6" />, traits: ["romantic", "feminine", "elegant"] },
      { value: "woody", label: "Woody", description: "Sandalwood, cedar, oud", icon: <TreePine className="h-6 w-6" />, traits: ["sophisticated", "grounding", "warm"] },
      { value: "fresh", label: "Fresh", description: "Citrus, green, aquatic", icon: <Wind className="h-6 w-6" />, traits: ["clean", "energizing", "light"] },
      { value: "oriental", label: "Oriental", description: "Vanilla, amber, spices", icon: <Flame className="h-6 w-6" />, traits: ["sensual", "mysterious", "warm"] },
      { value: "gourmand", label: "Gourmand", description: "Coffee, chocolate, caramel", icon: <Coffee className="h-6 w-6" />, traits: ["sweet", "cozy", "indulgent"] },
      { value: "aquatic", label: "Aquatic", description: "Ocean, rain, fresh air", icon: <Waves className="h-6 w-6" />, traits: ["refreshing", "clean", "casual"] },
    ]
  },
  {
    id: 4,
    question: "How long should your fragrance last?",
    subtitle: "Choose your preferred longevity",
    type: "single",
    options: [
      { value: "light", label: "2-4 hours", description: "Light and subtle", traits: ["subtle", "fresh", "casual"] },
      { value: "moderate", label: "4-6 hours", description: "Moderate presence", traits: ["balanced", "versatile", "office-friendly"] },
      { value: "long", label: "6-8 hours", description: "Long-lasting", traits: ["intense", "powerful", "memorable"] },
      { value: "beast", label: "8+ hours", description: "Beast mode!", traits: ["strong", "projecting", "statement"] },
    ]
  },
  {
    id: 5,
    question: "What impression do you want to leave?",
    subtitle: "Select the vibe that fits you",
    type: "single",
    options: [
      { value: "confident", label: "Confident & Bold", description: "Command attention when you enter a room", traits: ["powerful", "intense", "striking"] },
      { value: "mysterious", label: "Mysterious & Intriguing", description: "Leave people wanting to know more", traits: ["unique", "complex", "seductive"] },
      { value: "approachable", label: "Warm & Approachable", description: "Invite people in with your presence", traits: ["cozy", "friendly", "inviting"] },
      { value: "elegant", label: "Refined & Elegant", description: "Exude sophistication and class", traits: ["classy", "polished", "timeless"] },
      { value: "fresh", label: "Clean & Fresh", description: "Radiate freshness and positivity", traits: ["clean", "uplifting", "energetic"] },
    ]
  },
  {
    id: 6,
    question: "What season is your favorite?",
    subtitle: "This helps us match fragrance weight",
    type: "single",
    options: [
      { value: "spring", label: "Spring", description: "Fresh blooms, new beginnings", traits: ["floral", "green", "light"] },
      { value: "summer", label: "Summer", description: "Warm sun, ocean breeze", traits: ["aquatic", "citrus", "fresh"] },
      { value: "fall", label: "Fall", description: "Cozy sweaters, falling leaves", traits: ["spicy", "woody", "warm"] },
      { value: "winter", label: "Winter", description: "Fireside warmth, cold nights", traits: ["oriental", "gourmand", "rich"] },
    ]
  },
]

interface QuizResult {
  profile: {
    name: string
    description: string
    primaryNotes: string[]
    secondaryNotes: string[]
    characteristics: string[]
  }
  recommendations: typeof perfumes
  matches: { perfume: typeof perfumes[0], matchScore: number }[]
}

function calculateResults(answers: Record<number, string[]>): QuizResult {
  // Collect all traits from answers
  const allTraits: string[] = []
  
  Object.entries(answers).forEach(([questionId, selectedValues]) => {
    const question = quizQuestions.find(q => q.id === parseInt(questionId))
    if (question) {
      selectedValues.forEach(value => {
        const option = question.options.find(o => o.value === value)
        if (option) {
          allTraits.push(...option.traits)
        }
      })
    }
  })

  // Count trait frequencies
  const traitCounts: Record<string, number> = {}
  allTraits.forEach(trait => {
    traitCounts[trait] = (traitCounts[trait] || 0) + 1
  })

  // Determine profile based on dominant traits
  const sortedTraits = Object.entries(traitCounts).sort((a, b) => b[1] - a[1])
  const dominantTraits = sortedTraits.slice(0, 5).map(([trait]) => trait)

  // Define profiles
  const profiles: Record<string, QuizResult["profile"]> = {
    sophisticated: {
      name: "The Sophisticate",
      description: "You gravitate towards refined, elegant fragrances that make a subtle but lasting impression. Quality over quantity is your motto.",
      primaryNotes: ["Iris", "Sandalwood", "Amber"],
      secondaryNotes: ["Rose", "Vetiver", "Musk"],
      characteristics: ["Elegant", "Timeless", "Refined"]
    },
    adventurer: {
      name: "The Adventurer",
      description: "Fresh, energizing scents call to you. You prefer fragrances that evoke the outdoors and keep you feeling alive.",
      primaryNotes: ["Bergamot", "Sea Notes", "Cedar"],
      secondaryNotes: ["Grapefruit", "Mint", "Vetiver"],
      characteristics: ["Energetic", "Fresh", "Dynamic"]
    },
    romantic: {
      name: "The Romantic",
      description: "Floral and sweet notes capture your heart. You love fragrances that feel warm, inviting, and undeniably beautiful.",
      primaryNotes: ["Rose", "Jasmine", "Vanilla"],
      secondaryNotes: ["Peony", "Musk", "Tonka Bean"],
      characteristics: ["Romantic", "Warm", "Enchanting"]
    },
    mystic: {
      name: "The Mystic",
      description: "You&apos;re drawn to complex, mysterious fragrances with depth. Oud, incense, and exotic spices speak to your soul.",
      primaryNotes: ["Oud", "Saffron", "Incense"],
      secondaryNotes: ["Amber", "Patchouli", "Leather"],
      characteristics: ["Mysterious", "Complex", "Intriguing"]
    },
    minimalist: {
      name: "The Minimalist",
      description: "Clean, skin-like scents are your signature. You prefer fragrances that enhance rather than overpower.",
      primaryNotes: ["Musk", "Cedar", "Iris"],
      secondaryNotes: ["White Tea", "Cotton", "Skin Accord"],
      characteristics: ["Clean", "Subtle", "Modern"]
    }
  }

  // Determine which profile matches best
  let profileKey = "sophisticated"
  if (dominantTraits.includes("fresh") && dominantTraits.includes("aquatic")) {
    profileKey = "adventurer"
  } else if (dominantTraits.includes("romantic") || dominantTraits.includes("floral")) {
    profileKey = "romantic"
  } else if (dominantTraits.includes("mysterious") || dominantTraits.includes("exotic")) {
    profileKey = "mystic"
  } else if (dominantTraits.includes("clean") && dominantTraits.includes("subtle")) {
    profileKey = "minimalist"
  }

  const profile = profiles[profileKey]

  // Score perfumes based on trait matching
  const scoredPerfumes = perfumes.map(perfume => {
    let score = 0
    const allPerfumeNotes = [...perfume.topNotes, ...perfume.middleNotes, ...perfume.baseNotes].map(n => n.toLowerCase())
    const perfumeAccords = perfume.accords.map(a => a.toLowerCase())

    // Check note matches
    profile.primaryNotes.forEach(note => {
      if (allPerfumeNotes.some(n => n.includes(note.toLowerCase()))) score += 15
    })
    profile.secondaryNotes.forEach(note => {
      if (allPerfumeNotes.some(n => n.includes(note.toLowerCase()))) score += 10
    })

    // Check accord matches based on traits
    if (dominantTraits.includes("woody") && perfumeAccords.some(a => a.includes("woody"))) score += 10
    if (dominantTraits.includes("fresh") && perfumeAccords.some(a => a.includes("fresh"))) score += 10
    if (dominantTraits.includes("warm") && perfumeAccords.some(a => a.includes("warm"))) score += 10
    if (dominantTraits.includes("sweet") && perfumeAccords.some(a => a.includes("sweet"))) score += 10

    // Bonus for high-rated perfumes
    score += perfume.rating * 2

    return { perfume, matchScore: Math.min(score, 100) }
  })

  // Sort by score and take top matches
  const matches = scoredPerfumes.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6)

  return {
    profile,
    recommendations: matches.map(m => m.perfume),
    matches
  }
}

export default function ScentFinderQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<QuizResult | null>(null)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const currentAnswers = answers[question.id] || []

  const handleOptionSelect = (value: string) => {
    if (question.type === "single" || question.type === "image") {
      setAnswers(prev => ({ ...prev, [question.id]: [value] }))
    } else {
      // Multiple selection
      setAnswers(prev => {
        const current = prev[question.id] || []
        if (current.includes(value)) {
          return { ...prev, [question.id]: current.filter(v => v !== value) }
        } else {
          // Limit to 3 for "select up to 3" questions
          if (current.length >= 3 && question.id === 3) return prev
          return { ...prev, [question.id]: [...current, value] }
        }
      })
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Calculate results
      const calculatedResults = calculateResults(answers)
      setResults(calculatedResults)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const canProceed = currentAnswers.length > 0

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Result */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              {results.profile.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {results.profile.description}
            </p>
          </div>

          {/* Fragrance DNA */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="font-serif text-2xl font-semibold mb-6 text-center">Your Fragrance DNA</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Primary Notes</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.profile.primaryNotes.map(note => (
                      <span key={note} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Secondary Notes</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.profile.secondaryNotes.map(note => (
                      <span key={note} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Vibes</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.profile.characteristics.map(char => (
                      <span key={char} className="px-3 py-1.5 bg-accent/50 text-accent-foreground rounded-full text-sm">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6 text-center">Your Perfect Matches</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.matches.map(({ perfume, matchScore }) => (
                <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <Image
                          src={getPerfumeImage(perfume)}
                          alt={perfume.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          {matchScore}% Match
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                        <h3 className="font-serif font-semibold text-foreground">{perfume.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm text-primary font-medium">{perfume.rating}</span>
                          <span className="text-xs text-muted-foreground">({perfume.reviewCount.toLocaleString()} reviews)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button variant="outline" onClick={() => { setShowResults(false); setCurrentQuestion(0); setAnswers({}) }}>
              Retake Quiz
            </Button>
            <Link href="/discover/dna">
              <Button>View Full DNA Profile</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            {question.question}
          </h1>
          <p className="text-muted-foreground">{question.subtitle}</p>
        </div>

        {/* Options */}
        <div className={`grid gap-4 mb-8 ${question.type === "image" ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
          {question.options.map((option) => {
            const isSelected = currentAnswers.includes(option.value)
            
            if (question.type === "image") {
              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={option.image!}
                    alt={option.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-serif font-semibold text-lg">{option.label}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              )
            }

            return (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                {option.icon && (
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {option.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{option.label}</p>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                  )}
                </div>
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-2"
          >
            {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
