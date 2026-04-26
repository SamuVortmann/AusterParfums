"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notes } from "@/lib/data"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  { value: "all", label: "Todas as notas", color: "bg-muted" },
  { value: "floral", label: "Floral", color: "bg-pink-100 dark:bg-pink-950" },
  { value: "woody", label: "Amadeirado", color: "bg-amber-100 dark:bg-amber-950" },
  { value: "citrus", label: "Cítrico", color: "bg-yellow-100 dark:bg-yellow-950" },
  { value: "oriental", label: "Oriental", color: "bg-orange-100 dark:bg-orange-950" },
  { value: "fresh", label: "Fresco", color: "bg-cyan-100 dark:bg-cyan-950" },
  { value: "spicy", label: "Especiado", color: "bg-red-100 dark:bg-red-950" },
  { value: "fruity", label: "Frutado", color: "bg-rose-100 dark:bg-rose-950" },
  { value: "green", label: "Verde", color: "bg-emerald-100 dark:bg-emerald-950" },
  { value: "aquatic", label: "Aquático", color: "bg-blue-100 dark:bg-blue-950" },
  { value: "gourmand", label: "Gourmand", color: "bg-amber-100 dark:bg-amber-950" },
]

const categoryColors: { [key: string]: string } = {
  floral: "bg-pink-50 border-pink-200 hover:bg-pink-100",
  woody: "bg-amber-50 border-amber-200 hover:bg-amber-100",
  citrus: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
  oriental: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  fresh: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
  spicy: "bg-red-50 border-red-200 hover:bg-red-100",
  fruity: "bg-rose-50 border-rose-200 hover:bg-rose-100",
  green: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
  aquatic: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  gourmand: "bg-amber-50 border-amber-200 hover:bg-amber-100",
}

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredNotes = useMemo(() => {
    let result = [...notes]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (n) =>
          n.name.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((n) => n.category === selectedCategory)
    }

    // Sort by perfume count
    result.sort((a, b) => b.perfumeCount - a.perfumeCount)

    return result
  }, [searchQuery, selectedCategory])

  // Group notes by category
  const groupedNotes = useMemo(() => {
    if (selectedCategory !== "all") {
      return { [selectedCategory]: filteredNotes }
    }

    const groups: { [key: string]: typeof notes } = {}
    filteredNotes.forEach((note) => {
      if (!groups[note.category]) {
        groups[note.category] = []
      }
      groups[note.category].push(note)
    })
    return groups
  }, [filteredNotes, selectedCategory])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              Notas olfativas
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Explore os “blocos de construção” da perfumaria. Das florais delicadas aos orientais intensos,
              descubra as notas por trás dos seus perfumes favoritos.
            </p>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="border-b border-border bg-card sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar notas..."
                className="pl-10 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : `${category.color} text-foreground hover:opacity-80`
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="mt-4 text-sm text-muted-foreground">
              Mostrando {filteredNotes.length} notas
            </p>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {Object.keys(groupedNotes).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedNotes).map(([category, categoryNotes]) => (
                <div key={category}>
                  {selectedCategory === "all" && (
                    <h2 className="font-serif text-2xl font-semibold text-foreground mb-6 capitalize">
                      {category}
                    </h2>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryNotes.map((note) => (
                      <Link
                        key={note.id}
                        href={`/notes/${note.slug}`}
                        className={`group rounded-xl border p-5 transition-all duration-300 ${
                          categoryColors[note.category] || "bg-card border-border hover:bg-secondary"
                        }`}
                      >
                        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                          {note.name}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {note.description}
                        </p>
                        <p className="mt-3 text-sm font-medium text-foreground">
                          {note.perfumeCount.toLocaleString()} perfumes
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Nenhuma nota encontrada com esses filtros.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
