"use client"

import { use, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { perfumes, getReviewsByPerfume, getSimilarPerfumes, type Review, type Inspiration } from "@/lib/data"
import { Heart, Star, Share2, Clock, Wind, ThumbsUp, ChevronRight, Sparkles, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPerfumeImage } from "@/lib/perfume-images"

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-start gap-4">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-foreground">{review.userName}</h4>
            <span className="text-sm text-muted-foreground">{review.date}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {review.content}
          </p>
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Longevity: {review.longevity}/10</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wind className="h-4 w-4" />
              <span>Sillage: {review.sillage}/10</span>
            </div>
          </div>
          <button className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span>Helpful ({review.likes})</span>
          </button>
        </div>
      </div>
    </article>
  )
}

function InspirationCard({ inspiration }: { inspiration: Inspiration }) {
  const priceColors = {
    budget: "bg-emerald-100 text-emerald-700",
    mid: "bg-amber-100 text-amber-700",
    luxury: "bg-rose-100 text-rose-700"
  }
  
  const priceLabels = {
    budget: "Budget-Friendly",
    mid: "Mid-Range",
    luxury: "Luxury"
  }
  
  return (
    <Link
      href={`/perfumes/${inspiration.perfumeId}`}
      className="group bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            {inspiration.name}
          </h4>
          <p className="text-sm text-muted-foreground">{inspiration.brand}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {inspiration.similarity}% match
        </div>
      </div>
      
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
        {inspiration.description}
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {inspiration.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 text-xs bg-secondary rounded-full text-muted-foreground"
            >
              {note}
            </span>
          ))}
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${priceColors[inspiration.priceRange]}`}>
          {priceLabels[inspiration.priceRange]}
        </span>
      </div>
    </Link>
  )
}

export default function PerfumeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "inspirations">("details")
  
  const perfume = perfumes.find((p) => p.id === id)
  
  if (!perfume) {
    notFound()
  }

  const reviews = getReviewsByPerfume(id)
  const inspirations = getSimilarPerfumes(id)
  const allNotes = [
    ...perfume.topNotes.map((n) => ({ note: n, type: "Top" })),
    ...perfume.middleNotes.map((n) => ({ note: n, type: "Middle" })),
    ...perfume.baseNotes.map((n) => ({ note: n, type: "Base" })),
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/perfumes" className="hover:text-foreground transition-colors">
                Perfumes
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/brands/${perfume.brandSlug}`} className="hover:text-foreground transition-colors">
                {perfume.brand}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{perfume.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-secondary py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image */}
              <div className="aspect-square bg-card rounded-2xl border border-border p-8 lg:p-12 flex items-center justify-center">
                <img
                  src={getPerfumeImage(perfume)}
                  alt={`${perfume.name} by ${perfume.brand}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium text-primary uppercase tracking-wide">
                  {perfume.brand}
                </p>
                <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
                  {perfume.name}
                </h1>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-semibold text-foreground">
                        {perfume.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      ({perfume.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm bg-card border border-border rounded-full text-foreground">
                    {perfume.concentration}
                  </span>
                  <span className="px-3 py-1 text-sm bg-card border border-border rounded-full text-foreground capitalize">
                    {perfume.gender}
                  </span>
                  <span className="px-3 py-1 text-sm bg-card border border-border rounded-full text-foreground">
                    {perfume.year}
                  </span>
                </div>

                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {perfume.description}
                </p>

                {/* Performance */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Longevity</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${perfume.longevity * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {perfume.longevity}/10
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Sillage</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${perfume.sillage * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {perfume.sillage}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex items-center gap-3">
                  <Button
                    size="lg"
                    variant={isLiked ? "default" : "outline"}
                    className="gap-2"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                    {isLiked ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="border-b border-border bg-card sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "details"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Details & Notes
              </button>
              <button
                onClick={() => setActiveTab("inspirations")}
                className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === "inspirations"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Recommended Inspirations
                {inspirations.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                    {inspirations.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {activeTab === "details" && (
        <>
        {/* Notes & Accords */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Notes Pyramid */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Fragrance Notes
                </h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Top Notes
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {perfume.topNotes.map((note) => (
                        <Link
                          key={note}
                          href={`/notes/${note.toLowerCase().replace(/\s+/g, "-")}`}
                          className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                        >
                          {note}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {perfume.middleNotes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Middle Notes
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {perfume.middleNotes.map((note) => (
                          <Link
                            key={note}
                            href={`/notes/${note.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                          >
                            {note}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {perfume.baseNotes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Base Notes
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {perfume.baseNotes.map((note) => (
                          <Link
                            key={note}
                            href={`/notes/${note.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                          >
                            {note}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Accords */}
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Main Accords
                </h2>
                <div className="mt-6 space-y-3">
                  {perfume.accords.map((accord, index) => (
                    <div key={accord} className="flex items-center gap-3">
                      <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/80 rounded-full flex items-center px-4"
                          style={{ width: `${100 - index * 15}%` }}
                        >
                          <span className="text-sm font-medium text-primary-foreground">
                            {accord}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Reviews ({reviews.length.toLocaleString()})
              </h2>
              <Button>Write a Review</Button>
            </div>

            {reviews.length > 0 ? (
              <div className="mt-8 space-y-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center py-12 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">No reviews yet. Be the first to review this fragrance!</p>
                <Button className="mt-4">Write a Review</Button>
              </div>
            )}
          </div>
        </section>
        </>
        )}

        {activeTab === "inspirations" && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Recommended Inspirations
                </h2>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Discover fragrances with similar profiles to {perfume.name}. These recommendations are based on shared notes, accords, and olfactory characteristics.
              </p>

              {inspirations.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inspirations.map((inspiration) => (
                    <InspirationCard key={inspiration.id} inspiration={inspiration} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No similar fragrances found.</p>
                  <p className="text-sm text-muted-foreground mt-2">This fragrance has a unique profile!</p>
                </div>
              )}

              {/* Discovery Tools CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      Looking for more options?
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Use our discovery tools to find your perfect scent match.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                      <Link href="/discover/similar">Find Similar Scents</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/discover/build">Build by Notes</Link>
                    </Button>
                  </div>
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
