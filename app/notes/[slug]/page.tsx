"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PerfumeCard } from "@/components/perfume-card"
import { notes, perfumes } from "@/lib/data"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPerfumeImage } from "@/lib/perfume-images"

const categoryColors: { [key: string]: string } = {
  floral: "bg-pink-100 text-pink-800",
  woody: "bg-amber-100 text-amber-800",
  citrus: "bg-yellow-100 text-yellow-800",
  oriental: "bg-orange-100 text-orange-800",
  fresh: "bg-cyan-100 text-cyan-800",
  spicy: "bg-red-100 text-red-800",
  fruity: "bg-rose-100 text-rose-800",
  green: "bg-emerald-100 text-emerald-800",
  aquatic: "bg-blue-100 text-blue-800",
  gourmand: "bg-amber-100 text-amber-800",
}

export default function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  
  const note = notes.find((n) => n.slug === slug)
  
  if (!note) {
    notFound()
  }

  // Find perfumes that contain this note
  const relatedPerfumes = perfumes.filter(
    (p) =>
      p.topNotes.some((n) => n.toLowerCase().includes(note.name.toLowerCase())) ||
      p.middleNotes.some((n) => n.toLowerCase().includes(note.name.toLowerCase())) ||
      p.baseNotes.some((n) => n.toLowerCase().includes(note.name.toLowerCase()))
  )

  // Find related notes in the same category
  const relatedNotes = notes.filter(
    (n) => n.category === note.category && n.id !== note.id
  ).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/notes" className="hover:text-foreground transition-colors">
                Notes
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href={`/notes?category=${note.category}`}
                className="hover:text-foreground transition-colors capitalize"
              >
                {note.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{note.name}</span>
            </nav>
          </div>
        </div>

        {/* Note Header */}
        <section className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  categoryColors[note.category] || "bg-muted text-muted-foreground"
                }`}
              >
                {note.category}
              </span>
              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
                {note.name}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {note.description}
              </p>
              <p className="mt-4 text-foreground font-medium">
                Found in {note.perfumeCount.toLocaleString()} perfumes
              </p>
            </div>
          </div>
        </section>

        {/* Perfumes with this note */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Perfumes with {note.name}
            </h2>

            {relatedPerfumes.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedPerfumes.map((perfume) => (
                  <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                    <PerfumeCard
                      name={perfume.name}
                      brand={perfume.brand}
                      image={getPerfumeImage(perfume)}
                      rating={perfume.rating}
                      reviewCount={perfume.reviewCount}
                      topNotes={perfume.topNotes}
                      year={perfume.year}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center py-16 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground">No perfumes found with this note in our database yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Related Notes */}
        {relatedNotes.length > 0 && (
          <section className="py-12 lg:py-16 bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Related {note.category} Notes
              </h2>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedNotes.map((relatedNote) => (
                  <Link
                    key={relatedNote.id}
                    href={`/notes/${relatedNote.slug}`}
                    className="group bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {relatedNote.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {relatedNote.description}
                    </p>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {relatedNote.perfumeCount.toLocaleString()} perfumes
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
