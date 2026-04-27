"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Sparkles, ArrowRight, Lightbulb, Star, Heart } from "lucide-react"
import { perfumes } from "@/lib/data"

// Keyword to note/accord mapping
const scentMappings: Record<string, { notes: string[], accords: string[], mood: string }> = {
  // Materials & Objects
  "leather": { notes: ["Leather", "Suede", "Birch"], accords: ["Leather", "Smoky"], mood: "sophisticated" },
  "car": { notes: ["Leather", "Vanilla", "Musk"], accords: ["Leather", "Warm Spicy"], mood: "luxurious" },
  "new car": { notes: ["Leather", "Vanilla", "Benzoin"], accords: ["Leather", "Sweet"], mood: "luxurious" },
  "wood": { notes: ["Sandalwood", "Cedar", "Oud"], accords: ["Woody", "Earthy"], mood: "grounded" },
  "fireplace": { notes: ["Birch", "Oud", "Incense"], accords: ["Smoky", "Woody"], mood: "cozy" },
  "bonfire": { notes: ["Birch", "Smoke", "Cedar"], accords: ["Smoky", "Woody"], mood: "adventurous" },
  "library": { notes: ["Paper", "Leather", "Vanilla"], accords: ["Woody", "Amber"], mood: "intellectual" },
  "bookstore": { notes: ["Paper", "Vanilla", "Sandalwood"], accords: ["Woody", "Sweet"], mood: "nostalgic" },
  "silk": { notes: ["Musk", "Iris", "Violet"], accords: ["Powdery", "Floral"], mood: "elegant" },
  "velvet": { notes: ["Rose", "Oud", "Amber"], accords: ["Floral", "Oriental"], mood: "luxurious" },
  "cashmere": { notes: ["Musk", "Sandalwood", "Vanilla"], accords: ["Soft", "Warm"], mood: "cozy" },
  
  // Nature & Places
  "forest": { notes: ["Pine", "Cedar", "Moss"], accords: ["Green", "Woody", "Aromatic"], mood: "refreshing" },
  "woods": { notes: ["Cedar", "Vetiver", "Moss"], accords: ["Woody", "Green"], mood: "natural" },
  "ocean": { notes: ["Sea Notes", "Salt", "Bergamot"], accords: ["Fresh", "Aquatic"], mood: "free" },
  "sea": { notes: ["Sea Notes", "Seaweed", "Driftwood"], accords: ["Marine", "Fresh"], mood: "calming" },
  "beach": { notes: ["Coconut", "Sea Notes", "Vanilla"], accords: ["Aquatic", "Sweet"], mood: "relaxed" },
  "rain": { notes: ["Petrichor", "Green Notes", "Musk"], accords: ["Fresh", "Earthy"], mood: "peaceful" },
  "petrichor": { notes: ["Rain", "Earth", "Ozone"], accords: ["Fresh", "Earthy"], mood: "nostalgic" },
  "garden": { notes: ["Rose", "Grass", "Green Notes"], accords: ["Floral", "Green"], mood: "romantic" },
  "meadow": { notes: ["Grass", "Wildflowers", "Hay"], accords: ["Green", "Fresh"], mood: "carefree" },
  "mountain": { notes: ["Pine", "Snow", "Air"], accords: ["Fresh", "Aromatic"], mood: "invigorating" },
  "desert": { notes: ["Saffron", "Oud", "Sand"], accords: ["Oriental", "Dry"], mood: "mysterious" },
  "jungle": { notes: ["Ylang-Ylang", "Tuberose", "Green Notes"], accords: ["Tropical", "Exotic"], mood: "adventurous" },
  "tropical": { notes: ["Coconut", "Tiare", "Mango"], accords: ["Sweet", "Fruity"], mood: "exotic" },
  
  // Seasons & Weather
  "summer": { notes: ["Citrus", "Coconut", "Sea Notes"], accords: ["Fresh", "Aquatic"], mood: "vibrant" },
  "winter": { notes: ["Cinnamon", "Vanilla", "Amber"], accords: ["Warm Spicy", "Sweet"], mood: "cozy" },
  "autumn": { notes: ["Apple", "Cinnamon", "Dried Leaves"], accords: ["Spicy", "Woody"], mood: "nostalgic" },
  "fall": { notes: ["Apple", "Nutmeg", "Wood"], accords: ["Spicy", "Warm"], mood: "comforting" },
  "spring": { notes: ["Lily of the Valley", "Green Notes", "Peony"], accords: ["Floral", "Fresh"], mood: "hopeful" },
  "snow": { notes: ["Mint", "Iris", "Musk"], accords: ["Fresh", "Clean"], mood: "pure" },
  "sunshine": { notes: ["Neroli", "Orange", "Jasmine"], accords: ["Citrus", "Warm"], mood: "joyful" },
  "storm": { notes: ["Ozone", "Vetiver", "Incense"], accords: ["Fresh", "Dark"], mood: "powerful" },
  
  // Times & Occasions
  "evening": { notes: ["Oud", "Amber", "Musk"], accords: ["Oriental", "Sensual"], mood: "seductive" },
  "night": { notes: ["Jasmine", "Oud", "Vanilla"], accords: ["Floral", "Oriental"], mood: "mysterious" },
  "morning": { notes: ["Bergamot", "Green Tea", "Mint"], accords: ["Fresh", "Citrus"], mood: "energizing" },
  "date": { notes: ["Rose", "Oud", "Musk"], accords: ["Romantic", "Sensual"], mood: "alluring" },
  "wedding": { notes: ["Orange Blossom", "Jasmine", "Musk"], accords: ["White Floral", "Romantic"], mood: "elegant" },
  "office": { notes: ["Bergamot", "Cedar", "Musk"], accords: ["Fresh", "Woody"], mood: "professional" },
  "party": { notes: ["Pink Pepper", "Rose", "Oud"], accords: ["Spicy", "Festive"], mood: "exciting" },
  
  // Foods & Drinks
  "coffee": { notes: ["Coffee", "Vanilla", "Chocolate"], accords: ["Gourmand", "Warm"], mood: "comforting" },
  "espresso": { notes: ["Coffee", "Leather", "Tonka"], accords: ["Gourmand", "Bitter"], mood: "intense" },
  "chocolate": { notes: ["Chocolate", "Vanilla", "Tonka Bean"], accords: ["Gourmand", "Sweet"], mood: "indulgent" },
  "vanilla": { notes: ["Vanilla", "Tonka Bean", "Musk"], accords: ["Sweet", "Warm"], mood: "comforting" },
  "honey": { notes: ["Honey", "Orange Blossom", "Beeswax"], accords: ["Sweet", "Floral"], mood: "warm" },
  "wine": { notes: ["Grape", "Rose", "Oak"], accords: ["Fruity", "Woody"], mood: "sophisticated" },
  "champagne": { notes: ["Aldehydes", "Peach", "Rose"], accords: ["Sparkling", "Fresh"], mood: "celebratory" },
  "tea": { notes: ["Green Tea", "Bergamot", "Jasmine"], accords: ["Fresh", "Aromatic"], mood: "serene" },
  "whiskey": { notes: ["Tobacco", "Leather", "Amber"], accords: ["Boozy", "Warm"], mood: "sophisticated" },
  "bourbon": { notes: ["Vanilla", "Oak", "Caramel"], accords: ["Boozy", "Sweet"], mood: "warm" },
  
  // Emotions & Concepts
  "sexy": { notes: ["Musk", "Oud", "Amber"], accords: ["Sensual", "Oriental"], mood: "seductive" },
  "seductive": { notes: ["Jasmine", "Vanilla", "Sandalwood"], accords: ["Floral", "Oriental"], mood: "alluring" },
  "mysterious": { notes: ["Incense", "Oud", "Myrrh"], accords: ["Smoky", "Oriental"], mood: "enigmatic" },
  "confident": { notes: ["Bergamot", "Leather", "Amber"], accords: ["Fresh", "Powerful"], mood: "bold" },
  "powerful": { notes: ["Oud", "Saffron", "Leather"], accords: ["Oriental", "Intense"], mood: "commanding" },
  "elegant": { notes: ["Iris", "Rose", "Musk"], accords: ["Powdery", "Floral"], mood: "refined" },
  "sophisticated": { notes: ["Vetiver", "Leather", "Bergamot"], accords: ["Woody", "Fresh"], mood: "polished" },
  "romantic": { notes: ["Rose", "Peony", "Musk"], accords: ["Floral", "Romantic"], mood: "dreamy" },
  "fresh": { notes: ["Citrus", "Green Notes", "Mint"], accords: ["Fresh", "Clean"], mood: "invigorating" },
  "clean": { notes: ["Aldehydes", "Musk", "Cotton"], accords: ["Clean", "Fresh"], mood: "pure" },
  "cozy": { notes: ["Vanilla", "Amber", "Sandalwood"], accords: ["Warm", "Sweet"], mood: "comforting" },
  "warm": { notes: ["Amber", "Vanilla", "Benzoin"], accords: ["Oriental", "Sweet"], mood: "inviting" },
  "cool": { notes: ["Mint", "Eucalyptus", "Sea Notes"], accords: ["Fresh", "Aromatic"], mood: "refreshing" },
  "relaxed": { notes: ["Lavender", "Sandalwood", "Vanilla"], accords: ["Aromatic", "Calm"], mood: "peaceful" },
  "energetic": { notes: ["Grapefruit", "Ginger", "Pepper"], accords: ["Citrus", "Spicy"], mood: "dynamic" },
  "playful": { notes: ["Peach", "Raspberry", "Vanilla"], accords: ["Fruity", "Sweet"], mood: "fun" },
  "dark": { notes: ["Oud", "Incense", "Black Pepper"], accords: ["Dark", "Oriental"], mood: "intense" },
  "light": { notes: ["Neroli", "White Tea", "Musk"], accords: ["Fresh", "Airy"], mood: "ethereal" },
  
  // People & Characters
  "gentleman": { notes: ["Tobacco", "Leather", "Vetiver"], accords: ["Woody", "Aromatic"], mood: "classic" },
  "lady": { notes: ["Rose", "Jasmine", "Musk"], accords: ["Floral", "Elegant"], mood: "feminine" },
  "boss": { notes: ["Oud", "Leather", "Amber"], accords: ["Powerful", "Woody"], mood: "commanding" },
  "artist": { notes: ["Incense", "Paint", "Sandalwood"], accords: ["Creative", "Bohemian"], mood: "expressive" },
  "rebel": { notes: ["Leather", "Smoke", "Pepper"], accords: ["Edgy", "Dark"], mood: "bold" },
  "prince": { notes: ["Rose", "Oud", "Saffron"], accords: ["Royal", "Oriental"], mood: "regal" },
  "princess": { notes: ["Peony", "Pink Pepper", "Musk"], accords: ["Floral", "Sweet"], mood: "graceful" },
  
  // Textures & Feelings
  "soft": { notes: ["Musk", "Iris", "Cashmere"], accords: ["Powdery", "Soft"], mood: "gentle" },
  "sharp": { notes: ["Grapefruit", "Ginger", "Vetiver"], accords: ["Citrus", "Green"], mood: "crisp" },
  "smooth": { notes: ["Sandalwood", "Vanilla", "Amber"], accords: ["Creamy", "Warm"], mood: "suave" },
  "rich": { notes: ["Oud", "Amber", "Vanilla"], accords: ["Oriental", "Opulent"], mood: "luxurious" },
  "light": { notes: ["Bergamot", "Lily", "Musk"], accords: ["Fresh", "Sheer"], mood: "airy" },
  "heavy": { notes: ["Oud", "Patchouli", "Amber"], accords: ["Oriental", "Heavy"], mood: "intense" },
}

// Example prompts for inspiration
const examplePrompts = [
  "I want to smell like a new car interior",
  "Walking through a forest after rain",
  "Cozy evening by the fireplace with a book",
  "Fresh morning at the beach",
  "A sophisticated gentleman at a jazz bar",
  "Mysterious night in an exotic bazaar",
  "Clean linen drying in the summer sun",
  "An old library full of leather-bound books",
]

interface InterpretedScent {
  notes: string[]
  accords: string[]
  moods: string[]
  matchedKeywords: string[]
}

function interpretDescription(description: string): InterpretedScent {
  const lowerDesc = description.toLowerCase()
  const notes = new Set<string>()
  const accords = new Set<string>()
  const moods = new Set<string>()
  const matchedKeywords: string[] = []
  
  // Sort mappings by key length (longer first) to match more specific terms first
  const sortedMappings = Object.entries(scentMappings).sort((a, b) => b[0].length - a[0].length)
  
  for (const [keyword, mapping] of sortedMappings) {
    if (lowerDesc.includes(keyword)) {
      matchedKeywords.push(keyword)
      mapping.notes.forEach(n => notes.add(n))
      mapping.accords.forEach(a => accords.add(a))
      moods.add(mapping.mood)
    }
  }
  
  return {
    notes: Array.from(notes).slice(0, 8),
    accords: Array.from(accords).slice(0, 5),
    moods: Array.from(moods).slice(0, 3),
    matchedKeywords
  }
}

function findMatchingPerfumes(interpretation: InterpretedScent) {
  if (interpretation.notes.length === 0) return []
  
  return perfumes
    .map(perfume => {
      const allPerfumeNotes = [...perfume.topNotes, ...perfume.middleNotes, ...perfume.baseNotes]
      const noteMatches = interpretation.notes.filter(n => 
        allPerfumeNotes.some(pn => pn.toLowerCase().includes(n.toLowerCase()) || n.toLowerCase().includes(pn.toLowerCase()))
      ).length
      const accordMatches = interpretation.accords.filter(a =>
        perfume.accords.some(pa => pa.toLowerCase().includes(a.toLowerCase()) || a.toLowerCase().includes(pa.toLowerCase()))
      ).length
      
      const score = noteMatches * 2 + accordMatches * 3
      
      return { perfume, score, noteMatches, accordMatches }
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
}

export default function ScentTranslatorPage() {
  const [description, setDescription] = useState("")
  const [interpretation, setInterpretation] = useState<InterpretedScent | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [hasTranslated, setHasTranslated] = useState(false)
  
  const handleTranslate = () => {
    if (!description.trim()) return
    
    setIsTranslating(true)
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = interpretDescription(description)
      setInterpretation(result)
      setIsTranslating(false)
      setHasTranslated(true)
    }, 800)
  }
  
  const matchingPerfumes = interpretation ? findMatchingPerfumes(interpretation) : []
  
  const handleExampleClick = (example: string) => {
    setDescription(example)
    setInterpretation(null)
    setHasTranslated(false)
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageSquare className="h-4 w-4" />
              Tradutor de perfume
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              Descreva sua fragrância ideal
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Conte com suas palavras como você quer cheirar. Vamos traduzir isso em notas e encontrar perfumes compatíveis.
            </p>
          </div>
        </section>

        {/* Input Section */}
        <section className="py-8 lg:py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-sm">
              <label className="block text-sm font-medium text-foreground mb-3">
                Como você quer cheirar?
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex.: quero cheirar como uma noite aconchegante perto da lareira, lendo um livro com um copo de whisky..."
                className="min-h-[120px] text-base resize-none"
              />
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Seja descritivo. Cite lugares, sensações, materiais ou experiências.
                </p>
                <Button 
                  onClick={handleTranslate}
                  disabled={!description.trim() || isTranslating}
                  className="gap-2"
                >
                  {isTranslating ? (
                    <>
                      <span className="animate-spin">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      Traduzindo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Traduzir para perfume
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Example Prompts */}
            {!hasTranslated && (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Lightbulb className="h-4 w-4" />
                  <span>Precisa de inspiração? Tente um destes:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      &ldquo;{example}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        {hasTranslated && interpretation && (
          <section className="py-8 lg:py-12 border-t border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Interpretation */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Interpretamos sua ideia assim...
                </h2>
                
                {interpretation.matchedKeywords.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Notes */}
                    <div className="bg-card rounded-xl border border-border p-5">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Notas olfativas</h3>
                      <div className="flex flex-wrap gap-2">
                        {interpretation.notes.map((note, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Accords */}
                    <div className="bg-card rounded-xl border border-border p-5">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Familias olfativas</h3>
                      <div className="flex flex-wrap gap-2">
                        {interpretation.accords.map((accord, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium"
                          >
                            {accord}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mood */}
                    <div className="bg-card rounded-xl border border-border p-5">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Mood e personalidade</h3>
                      <div className="flex flex-wrap gap-2">
                        {interpretation.moods.map((mood, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium capitalize"
                          >
                            {mood}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card rounded-xl border border-border p-8 text-center">
                    <p className="text-muted-foreground">
                      Não identificamos elementos olfativos específicos no texto. Tente adicionar mais detalhes sobre lugares, materiais e sensações.
                    </p>
                  </div>
                )}
              </div>

              {/* Matching Perfumes */}
              {matchingPerfumes.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                    Perfumes que combinam com sua ideia
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Com base na sua descrição, estas fragrâncias traduzem o que você está buscando.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchingPerfumes.map(({ perfume, score }) => (
                      <Link
                        key={perfume.id}
                        href={`/perfumes/${perfume.id}`}
                        className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-24 mx-auto bg-gradient-to-b from-primary/20 to-primary/40 rounded-sm" />
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                                {perfume.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">{perfume.brand}</p>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              <Sparkles className="h-3 w-3" />
                              {Math.min(95, score * 8)}%
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="text-foreground font-medium">{perfume.rating}</span>
                            <span className="text-muted-foreground">({perfume.reviewCount.toLocaleString()})</span>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            {perfume.accords.slice(0, 3).map((accord) => (
                              <span
                                key={accord}
                                className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground"
                              >
                                {accord}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Try Again */}
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDescription("")
                    setInterpretation(null)
                    setHasTranslated(false)
                  }}
                  className="gap-2"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Tentar outra descrição
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        {!hasTranslated && (
          <section className="py-12 lg:py-16 border-t border-border">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-12">
                Como funciona a tradução olfativa
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">1. Descreva</h3>
                  <p className="text-sm text-muted-foreground">
                    Conte como você quer cheirar usando linguagem simples: lugares, sensações, materiais ou experiências.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">2. Traduza</h3>
                  <p className="text-sm text-muted-foreground">
                    Nosso sistema interpreta sua descrição em notas, acordes e famílias olfativas.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">3. Descubra</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba recomendações personalizadas de perfumes que combinam com sua ideia de fragrância ideal.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
