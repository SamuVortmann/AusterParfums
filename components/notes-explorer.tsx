"use client"

import { useState } from "react"

const noteCategories = [
  {
    name: "Floral",
    color: "bg-rose-100 text-rose-700 hover:bg-rose-200",
    notes: ["Rose", "Jasmine", "Lily", "Peony", "Violet", "Iris"],
  },
  {
    name: "Woody",
    color: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    notes: ["Sandalwood", "Cedar", "Oud", "Vetiver", "Patchouli", "Birch"],
  },
  {
    name: "Citrus",
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    notes: ["Bergamot", "Lemon", "Orange", "Grapefruit", "Lime", "Mandarin"],
  },
  {
    name: "Oriental",
    color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    notes: ["Vanilla", "Amber", "Musk", "Incense", "Benzoin", "Labdanum"],
  },
  {
    name: "Fresh",
    color: "bg-cyan-100 text-cyan-700 hover:bg-cyan-200",
    notes: ["Aquatic", "Green", "Ozonic", "Mint", "Cucumber", "Tea"],
  },
  {
    name: "Spicy",
    color: "bg-red-100 text-red-700 hover:bg-red-200",
    notes: ["Cinnamon", "Cardamom", "Pepper", "Saffron", "Nutmeg", "Clove"],
  },
]

export function NotesExplorer() {
  const [activeCategory, setActiveCategory] = useState(noteCategories[0])

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-semibold text-foreground">Explore by Notes</h2>
          <p className="mt-3 text-muted-foreground">
            Discover perfumes based on the fragrance notes you love most
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {noteCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory.name === category.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:border-primary/30"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {activeCategory.notes.map((note) => (
            <button
              key={note}
              className={`p-6 rounded-xl text-center transition-all hover:scale-105 ${activeCategory.color}`}
            >
              <span className="font-medium">{note}</span>
              <p className="text-xs mt-1 opacity-70">View perfumes</p>
            </button>
          ))}
        </div>

        {/* Discover More */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Not sure what you&apos;re looking for?{" "}
            <button className="text-primary hover:underline font-medium">
              Try our Perfume Finder
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
