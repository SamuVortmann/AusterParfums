"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, Sparkles, Star, ArrowRight, RefreshCw, Target, DollarSign, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { perfumes, type Perfume } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"

interface SimilarityResult {
  perfume: Perfume
  similarityScore: number
  sharedNotes: string[]
  sharedAccords: string[]
  reason: string
}

function calculateSimilarity(source: Perfume, target: Perfume): SimilarityResult {
  const sourceNotes = [...source.topNotes, ...source.middleNotes, ...source.baseNotes].map(n => n.toLowerCase())
  const targetNotes = [...target.topNotes, ...target.middleNotes, ...target.baseNotes].map(n => n.toLowerCase())
  
  const sourceAccords = source.accords.map(a => a.toLowerCase())
  const targetAccords = target.accords.map(a => a.toLowerCase())

  // Find shared notes
  const sharedNotes = source.topNotes.concat(source.middleNotes, source.baseNotes)
    .filter(note => targetNotes.some(tn => tn.includes(note.toLowerCase()) || note.toLowerCase().includes(tn)))

  // Find shared accords
  const sharedAccords = source.accords
    .filter(accord => targetAccords.some(ta => ta.includes(accord.toLowerCase()) || accord.toLowerCase().includes(ta)))

  // Calculate base similarity score
  let score = 0
  
  // Note matching (max 50 points)
  const noteMatchRatio = sharedNotes.length / Math.max(sourceNotes.length, targetNotes.length)
  score += noteMatchRatio * 50

  // Accord matching (max 30 points)
  const accordMatchRatio = sharedAccords.length / Math.max(sourceAccords.length, targetAccords.length)
  score += accordMatchRatio * 30

  // Gender matching (max 10 points)
  if (source.gender === target.gender) score += 10
  else if (source.gender === "unisex" || target.gender === "unisex") score += 5

  // Performance similarity (max 10 points)
  const longevityDiff = Math.abs(source.longevity - target.longevity)
  const sillageDiff = Math.abs(source.sillage - target.sillage)
  score += Math.max(0, 10 - longevityDiff - sillageDiff)

  // Determine primary reason for similarity
  let reason = "Similar scent profile"
  if (sharedAccords.length >= 2) {
    reason = `Both are ${sharedAccords.slice(0, 2).join(" and ")}`
  } else if (sharedNotes.length >= 3) {
    reason = `Share ${sharedNotes.slice(0, 3).join(", ")} notes`
  }

  return {
    perfume: target,
    similarityScore: Math.round(Math.min(score, 100)),
    sharedNotes,
    sharedAccords,
    reason
  }
}

function PerfumeSearch({ 
  onSelect,
  selectedPerfume 
}: { 
  onSelect: (perfume: Perfume | null) => void
  selectedPerfume: Perfume | null
}) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return []
    return perfumes.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6)
  }, [query])

  if (selectedPerfume) {
    return (
      <div className="relative">
        <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary bg-primary/5">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={getPerfumeImage(selectedPerfume)} alt={selectedPerfume.name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{selectedPerfume.brand}</p>
            <p className="font-serif text-lg font-semibold text-foreground">{selectedPerfume.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm">{selectedPerfume.rating}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onSelect(null)}>
            Change
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for a perfume you love..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-12 h-14 text-lg rounded-xl"
        />
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
          {suggestions.map(perfume => (
            <button
              key={perfume.id}
              onClick={() => { onSelect(perfume); setQuery("") }}
              className="w-full flex items-center gap-4 p-3 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={getPerfumeImage(perfume)} alt={perfume.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                <p className="font-medium text-foreground">{perfume.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Popular Options */}
      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">Popular choices:</p>
        <div className="flex flex-wrap gap-2">
          {perfumes.slice(0, 5).map(perfume => (
            <button
              key={perfume.id}
              onClick={() => onSelect(perfume)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm"
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image src={getPerfumeImage(perfume)} alt={perfume.name} fill className="object-cover" />
              </div>
              {perfume.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SimilarScentPage() {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null)
  const [minSimilarity, setMinSimilarity] = useState([60])
  const [sameGender, setSameGender] = useState(false)
  const [betterPerformance, setBetterPerformance] = useState(false)
  const [lesserKnown, setLesserKnown] = useState(false)

  const similarPerfumes = useMemo(() => {
    if (!selectedPerfume) return []

    let results = perfumes
      .filter(p => p.id !== selectedPerfume.id)
      .map(p => calculateSimilarity(selectedPerfume, p))
      .filter(r => r.similarityScore >= minSimilarity[0])

    // Apply filters
    if (sameGender) {
      results = results.filter(r => 
        r.perfume.gender === selectedPerfume.gender || 
        r.perfume.gender === "unisex" || 
        selectedPerfume.gender === "unisex"
      )
    }

    if (betterPerformance) {
      results = results.filter(r => 
        r.perfume.longevity >= selectedPerfume.longevity && 
        r.perfume.sillage >= selectedPerfume.sillage
      )
    }

    if (lesserKnown) {
      results = results.filter(r => r.perfume.reviewCount < 20000)
    }

    return results.sort((a, b) => b.similarityScore - a.similarityScore)
  }, [selectedPerfume, minSimilarity, sameGender, betterPerformance, lesserKnown])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Find Similar Scents
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Love a fragrance? Discover alternatives with similar DNA, including hidden gems and affordable dupes.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-serif text-lg font-semibold mb-4">Select Your Reference Fragrance</h2>
            <PerfumeSearch 
              selectedPerfume={selectedPerfume}
              onSelect={setSelectedPerfume}
            />
          </CardContent>
        </Card>

        {selectedPerfume && (
          <>
            {/* Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="font-serif text-lg font-semibold mb-6">Refine Results</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Similarity Threshold */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Minimum Similarity: {minSimilarity[0]}%
                    </Label>
                    <Slider
                      value={minSimilarity}
                      onValueChange={setMinSimilarity}
                      min={30}
                      max={90}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Broader</span>
                      <span>Closer Match</span>
                    </div>
                  </div>

                  {/* Toggle Filters */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sameGender" className="text-sm cursor-pointer">
                        Same gender only
                      </Label>
                      <Switch id="sameGender" checked={sameGender} onCheckedChange={setSameGender} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="betterPerf" className="text-sm cursor-pointer flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Better performance
                      </Label>
                      <Switch id="betterPerf" checked={betterPerformance} onCheckedChange={setBetterPerformance} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lesserKnown" className="text-sm cursor-pointer flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Hidden gems only
                      </Label>
                      <Switch id="lesserKnown" checked={lesserKnown} onCheckedChange={setLesserKnown} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">
                {similarPerfumes.length} Similar Fragrances Found
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPerfume(null)} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Start Over
              </Button>
            </div>

            {similarPerfumes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No matches found with current filters. Try lowering the similarity threshold.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {similarPerfumes.map(({ perfume, similarityScore, sharedNotes, sharedAccords, reason }) => (
                  <Card key={perfume.id} className="group hover:shadow-lg transition-all">
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Image */}
                        <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden rounded-l-lg">
                          <Image 
                            src={getPerfumeImage(perfume)} 
                            alt={perfume.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold ${
                            similarityScore >= 80 ? "bg-green-500 text-white" :
                            similarityScore >= 60 ? "bg-yellow-500 text-white" :
                            "bg-gray-500 text-white"
                          }`}>
                            {similarityScore}%
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                          <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                          <h3 className="font-serif font-semibold text-lg text-foreground mb-1">{perfume.name}</h3>
                          
                          <div className="flex items-center gap-3 mb-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span>{perfume.rating}</span>
                            </div>
                            <span className="text-muted-foreground">|</span>
                            <span className="text-muted-foreground capitalize">{perfume.gender}</span>
                          </div>

                          {/* Reason */}
                          <p className="text-sm text-primary mb-3">{reason}</p>

                          {/* Shared elements */}
                          <div className="flex flex-wrap gap-1">
                            {sharedNotes.slice(0, 4).map(note => (
                              <Badge key={note} variant="outline" className="text-xs">
                                {note}
                              </Badge>
                            ))}
                            {sharedNotes.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{sharedNotes.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Longevity: {perfume.longevity}h</span>
                          <span>Sillage: {perfume.sillage}/10</span>
                        </div>
                        <Link href={`/perfumes/${perfume.id}`}>
                          <Button size="sm" variant="ghost" className="gap-1">
                            View <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        {!selectedPerfume && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Not sure what you&apos;re looking for?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/discover/quiz">
                <Button variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Take the Quiz
                </Button>
              </Link>
              <Link href="/discover/build">
                <Button variant="outline" className="gap-2">
                  Build by Notes
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
