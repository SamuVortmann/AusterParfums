"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Search, Sparkles, Plus, FlaskConical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { perfumes, notes } from "@/lib/data"
import { getPerfumeImage } from "@/lib/perfume-images"

const noteCategories = [
  { id: "floral", label: "Floral", color: "bg-pink-100 text-pink-800 border-pink-200" },
  { id: "woody", label: "Woody", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { id: "citrus", label: "Citrus", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { id: "oriental", label: "Oriental", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { id: "fresh", label: "Fresh", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  { id: "spicy", label: "Spicy", color: "bg-red-100 text-red-800 border-red-200" },
  { id: "fruity", label: "Fruity", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "green", label: "Green", color: "bg-green-100 text-green-800 border-green-200" },
  { id: "aquatic", label: "Aquatic", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "gourmand", label: "Gourmand", color: "bg-rose-100 text-rose-800 border-rose-200" },
]

// Extended notes for the builder
const allNotes = [
  // Floral
  { name: "Rose", category: "floral" },
  { name: "Jasmine", category: "floral" },
  { name: "Iris", category: "floral" },
  { name: "Tuberose", category: "floral" },
  { name: "Orange Blossom", category: "floral" },
  { name: "Violet", category: "floral" },
  { name: "Lily", category: "floral" },
  { name: "Peony", category: "floral" },
  { name: "Magnolia", category: "floral" },
  { name: "Ylang-Ylang", category: "floral" },
  // Woody
  { name: "Sandalwood", category: "woody" },
  { name: "Cedar", category: "woody" },
  { name: "Oud", category: "woody" },
  { name: "Vetiver", category: "woody" },
  { name: "Patchouli", category: "woody" },
  { name: "Birch", category: "woody" },
  { name: "Rosewood", category: "woody" },
  { name: "Guaiac Wood", category: "woody" },
  // Citrus
  { name: "Bergamot", category: "citrus" },
  { name: "Lemon", category: "citrus" },
  { name: "Grapefruit", category: "citrus" },
  { name: "Orange", category: "citrus" },
  { name: "Lime", category: "citrus" },
  { name: "Mandarin", category: "citrus" },
  { name: "Yuzu", category: "citrus" },
  // Oriental
  { name: "Vanilla", category: "oriental" },
  { name: "Amber", category: "oriental" },
  { name: "Musk", category: "oriental" },
  { name: "Tonka Bean", category: "oriental" },
  { name: "Benzoin", category: "oriental" },
  { name: "Incense", category: "oriental" },
  { name: "Labdanum", category: "oriental" },
  // Fresh
  { name: "Sea Notes", category: "fresh" },
  { name: "Mint", category: "fresh" },
  { name: "Lavender", category: "fresh" },
  { name: "Eucalyptus", category: "fresh" },
  { name: "Cucumber", category: "fresh" },
  // Spicy
  { name: "Cardamom", category: "spicy" },
  { name: "Pepper", category: "spicy" },
  { name: "Cinnamon", category: "spicy" },
  { name: "Saffron", category: "spicy" },
  { name: "Ginger", category: "spicy" },
  { name: "Nutmeg", category: "spicy" },
  { name: "Clove", category: "spicy" },
  { name: "Pink Pepper", category: "spicy" },
  // Fruity
  { name: "Apple", category: "fruity" },
  { name: "Pear", category: "fruity" },
  { name: "Peach", category: "fruity" },
  { name: "Blackcurrant", category: "fruity" },
  { name: "Raspberry", category: "fruity" },
  { name: "Pineapple", category: "fruity" },
  { name: "Coconut", category: "fruity" },
  // Green
  { name: "Basil", category: "green" },
  { name: "Fig Leaf", category: "green" },
  { name: "Galbanum", category: "green" },
  { name: "Green Tea", category: "green" },
  { name: "Bamboo", category: "green" },
  // Aquatic
  { name: "Aquatic Notes", category: "aquatic" },
  { name: "Rain", category: "aquatic" },
  { name: "Seaweed", category: "aquatic" },
  { name: "Ozonic Notes", category: "aquatic" },
  // Gourmand
  { name: "Coffee", category: "gourmand" },
  { name: "Chocolate", category: "gourmand" },
  { name: "Caramel", category: "gourmand" },
  { name: "Praline", category: "gourmand" },
  { name: "Honey", category: "gourmand" },
  { name: "Almond", category: "gourmand" },
]

export default function BuildScentPage() {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [noteLiked, setNoteLiked] = useState<string[]>([])
  const [noteDisliked, setNoteDisliked] = useState<string[]>([])

  const filteredNotes = useMemo(() => {
    return allNotes.filter(note => {
      const matchesSearch = note.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "all" || note.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  const addNote = (noteName: string) => {
    if (!selectedNotes.includes(noteName) && selectedNotes.length < 8) {
      setSelectedNotes(prev => [...prev, noteName])
    }
  }

  const removeNote = (noteName: string) => {
    setSelectedNotes(prev => prev.filter(n => n !== noteName))
  }

  const toggleLike = (noteName: string) => {
    if (noteLiked.includes(noteName)) {
      setNoteLiked(prev => prev.filter(n => n !== noteName))
    } else {
      setNoteLiked(prev => [...prev, noteName])
      setNoteDisliked(prev => prev.filter(n => n !== noteName))
    }
  }

  const toggleDislike = (noteName: string) => {
    if (noteDisliked.includes(noteName)) {
      setNoteDisliked(prev => prev.filter(n => n !== noteName))
    } else {
      setNoteDisliked(prev => [...prev, noteName])
      setNoteLiked(prev => prev.filter(n => n !== noteName))
    }
  }

  // Find matching perfumes based on selected notes
  const matchingPerfumes = useMemo(() => {
    if (selectedNotes.length === 0) return []

    const scored = perfumes.map(perfume => {
      const allPerfumeNotes = [
        ...perfume.topNotes,
        ...perfume.middleNotes,
        ...perfume.baseNotes
      ].map(n => n.toLowerCase())

      let matchCount = 0
      let totalWeight = 0

      selectedNotes.forEach(note => {
        const noteLower = note.toLowerCase()
        if (allPerfumeNotes.some(pn => pn.includes(noteLower) || noteLower.includes(pn))) {
          matchCount++
        }
      })

      // Check for disliked notes (negative scoring)
      let penalty = 0
      noteDisliked.forEach(note => {
        const noteLower = note.toLowerCase()
        if (allPerfumeNotes.some(pn => pn.includes(noteLower))) {
          penalty += 20
        }
      })

      // Check for liked notes (bonus scoring)
      let bonus = 0
      noteLiked.forEach(note => {
        const noteLower = note.toLowerCase()
        if (allPerfumeNotes.some(pn => pn.includes(noteLower))) {
          bonus += 10
        }
      })

      const baseScore = (matchCount / selectedNotes.length) * 100
      const finalScore = Math.max(0, Math.min(100, baseScore + bonus - penalty))

      return { perfume, matchCount, score: Math.round(finalScore) }
    })

    return scored
      .filter(s => s.matchCount > 0)
      .sort((a, b) => b.score - a.score || b.matchCount - a.matchCount)
      .slice(0, 8)
  }, [selectedNotes, noteLiked, noteDisliked])

  const getCategoryColor = (category: string) => {
    return noteCategories.find(c => c.id === category)?.color || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FlaskConical className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Build Your Dream Scent
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the notes you love, mark the ones you dislike, and we&apos;ll find perfumes that match your unique taste.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Note Selection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Notes */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-semibold">Your Selection</h2>
                  <span className="text-sm text-muted-foreground">{selectedNotes.length}/8 notes</span>
                </div>
                {selectedNotes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Click on notes below to add them to your selection</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedNotes.map(note => {
                      const noteData = allNotes.find(n => n.name === note)
                      return (
                        <Badge
                          key={note}
                          variant="outline"
                          className={`${getCategoryColor(noteData?.category || "")} px-3 py-1.5 text-sm gap-2`}
                        >
                          {note}
                          <button onClick={() => removeNote(note)} className="hover:opacity-70">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                )}

                {/* Like/Dislike Section */}
                {(noteLiked.length > 0 || noteDisliked.length > 0) && (
                  <div className="mt-6 pt-6 border-t border-border grid sm:grid-cols-2 gap-4">
                    {noteLiked.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-green-700 mb-2">Must Have</p>
                        <div className="flex flex-wrap gap-1">
                          {noteLiked.map(note => (
                            <Badge key={note} className="bg-green-100 text-green-800 text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {noteDisliked.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-red-700 mb-2">Avoid</p>
                        <div className="flex flex-wrap gap-1">
                          {noteDisliked.map(note => (
                            <Badge key={note} className="bg-red-100 text-red-800 text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Note Browser */}
            <Card>
              <CardContent className="p-6">
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Category Tabs */}
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-transparent">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    {noteCategories.map(cat => (
                      <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                        {cat.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value={activeCategory} className="mt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {filteredNotes.map(note => {
                        const isSelected = selectedNotes.includes(note.name)
                        const isLiked = noteLiked.includes(note.name)
                        const isDisliked = noteDisliked.includes(note.name)
                        
                        return (
                          <div
                            key={note.name}
                            className={`group relative p-3 rounded-lg border transition-all cursor-pointer ${
                              isSelected 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <button
                              onClick={() => isSelected ? removeNote(note.name) : addNote(note.name)}
                              className="w-full text-left"
                            >
                              <p className="font-medium text-sm text-foreground">{note.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{note.category}</p>
                            </button>
                            
                            {/* Like/Dislike buttons */}
                            <div className="absolute right-1 top-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleLike(note.name) }}
                                className={`p-1 rounded ${isLiked ? "text-green-600 bg-green-50" : "text-muted-foreground hover:text-green-600"}`}
                              >
                                <svg className="h-3 w-3" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleDislike(note.name) }}
                                className={`p-1 rounded ${isDisliked ? "text-red-600 bg-red-50" : "text-muted-foreground hover:text-red-600"}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold">Matching Perfumes</h2>
                </div>

                {selectedNotes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-sm">Select notes to see matching perfumes</p>
                  </div>
                ) : matchingPerfumes.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="text-sm">No exact matches found. Try different notes!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matchingPerfumes.map(({ perfume, score, matchCount }) => (
                      <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={getPerfumeImage(perfume)}
                              alt={perfume.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{perfume.brand}</p>
                            <p className="font-medium text-sm text-foreground truncate">{perfume.name}</p>
                            <p className="text-xs text-muted-foreground">{matchCount} matching notes</p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              score >= 70 ? "bg-green-100 text-green-800" :
                              score >= 40 ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {score}%
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {selectedNotes.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button variant="outline" className="w-full" onClick={() => setSelectedNotes([])}>
                      Clear Selection
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
