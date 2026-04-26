import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Users, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import { formatCompactNumber, siteStats } from "@/lib/site-stats"

const stats = [
  { value: formatCompactNumber(siteStats.perfumes), label: "Perfumes" },
  { value: formatCompactNumber(siteStats.brands), label: "Marcas" },
  { value: formatCompactNumber(siteStats.reviews), label: "Avaliações" },
  { value: formatCompactNumber(siteStats.forumPosts), label: "Tópicos" },
]

const values = [
  {
    icon: Search,
    title: "Discovery",
    description: "We believe everyone deserves to find their perfect scent. Our tools make fragrance exploration accessible and enjoyable."
  },
  {
    icon: Users,
    title: "Community",
    description: "Fragrance is personal, but the journey is shared. Our community of enthusiasts helps each other discover new favorites."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We are fragrance lovers ourselves. Every feature we build comes from a genuine love for the art of perfumery."
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "From AI-powered recommendations to DNA profiling, we use technology to enhance your fragrance journey."
  },
]

const team = [
  {
    name: "Alexandra Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    bio: "Former perfumer with 15 years in the fragrance industry."
  },
  {
    name: "Marcus Thompson",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Passionate about making fragrance discovery intuitive."
  },
  {
    name: "Sofia Rodriguez",
    role: "Community Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    bio: "Building bridges between fragrance enthusiasts worldwide."
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    bio: "Engineering the future of fragrance technology."
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground text-balance">
                Helping You Find Your Signature Scent
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                Verdara is the world&apos;s most comprehensive fragrance discovery platform. We combine expert knowledge, community insights, and innovative technology to help you explore the world of perfumery.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl lg:text-4xl font-semibold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                  Our Story
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Verdara was born from a simple frustration: finding the perfect fragrance shouldn&apos;t be so hard. As fragrance enthusiasts ourselves, we spent countless hours researching, sampling, and comparing scents across multiple sources.
                  </p>
                  <p>
                    We founded Verdara in 2024 with a mission to create the ultimate fragrance discovery platform. A place where anyone, from curious beginners to seasoned collectors, could explore, learn, and find their perfect scent.
                  </p>
                  <p>
                    Today, we are proud to serve a global community of fragrance lovers. Our platform combines the largest fragrance database with innovative discovery tools, helping millions of people find scents that truly resonate with them.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop"
                    alt="Collection of luxury perfume bottles"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                  <p className="font-serif text-2xl font-semibold text-primary">Since 2024</p>
                  <p className="text-sm text-muted-foreground">Helping you discover scents</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                What Drives Us
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our core values shape everything we do, from the features we build to how we engage with our community.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                A passionate group of fragrance enthusiasts, technologists, and community builders.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-primary-foreground">
              Ready to Find Your Signature Scent?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join our community of fragrance enthusiasts and start your discovery journey today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/discover/quiz">Take the Quiz</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/perfumes">Explore Perfumes</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
