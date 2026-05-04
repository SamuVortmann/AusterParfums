import { PerfumeCard } from "@/components/perfume-card"
import { Button } from "@/components/ui/button"
import { perfumes } from "@/lib/data"
import { ArrowRight } from "lucide-react"

const featuredPerfumes = [...perfumes]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4)
  .map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    image: p.image,
    rating: p.rating,
    topNotes: p.topNotes,
    year: p.year,
  }))

export function FeaturedSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground">Em alta</h2>
            <p className="mt-2 text-muted-foreground">Os perfumes mais amados do mês</p>
          </div>
          <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80">
            Ver tudo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPerfumes.map((perfume) => (
            <PerfumeCard reviewCount={0} key={perfume.id} {...perfume} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="w-full">
            Ver tudo que está em alta
          </Button>
        </div>
      </div>
    </section>
  )
}
