import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Users, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import { AboutStatsStrip } from "@/components/about-stats-strip"

const values = [
  {
    icon: Search,
    title: "Descoberta",
    description: "Acreditamos que toda pessoa merece encontrar sua fragrancia ideal. Nossas ferramentas tornam essa busca simples e prazerosa."
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Fragrancia e pessoal, mas a jornada pode ser coletiva. Nossa comunidade se ajuda a descobrir novos favoritos."
  },
  {
    icon: Heart,
    title: "Paixao",
    description: "Tambem somos apaixonados por perfumaria. Cada recurso nasce de um interesse real pela arte das fragrancias."
  },
  {
    icon: Sparkles,
    title: "Inovacao",
    description: "De recomendacoes inteligentes ao perfil olfativo, usamos tecnologia para melhorar sua experiencia de descoberta."
  },
]

const team = [
  {
    name: "Alexandra Chen",
    role: "Fundadora e CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    bio: "Ex-perfumista com 15 anos de experiencia na industria de fragrancias."
  },
  {
    name: "Marcus Thompson",
    role: "Lider de Produto",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Focado em tornar a descoberta de fragrancias intuitiva."
  },
  {
    name: "Sofia Rodriguez",
    role: "Lider de Comunidade",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    bio: "Conectando entusiastas de fragrancias do mundo inteiro."
  },
  {
    name: "David Kim",
    role: "Desenvolvedor Principal",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    bio: "Construindo o futuro da tecnologia para fragrancias."
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
                Ajudando voce a encontrar seu perfume assinatura
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty">
                A Verdara e uma plataforma completa para descoberta de fragrancias. Combinamos conhecimento especializado, experiencias da comunidade e tecnologia para ajudar voce a explorar o universo da perfumaria.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutStatsStrip />
          </div>
        </section>

        {/* Nossa historia */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                  Nossa historia
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    A Verdara nasceu de uma frustracao simples: encontrar a fragrancia ideal nao deveria ser tao dificil. Como entusiastas, passamos horas pesquisando, testando e comparando perfumes em varias fontes.
                  </p>
                  <p>
                    Fundamos a Verdara em 2024 com a missao de criar uma plataforma de descoberta realmente util. Um lugar em que qualquer pessoa, de iniciante a colecionador experiente, pudesse explorar, aprender e encontrar o perfume certo.
                  </p>
                  <p>
                    Hoje, temos orgulho de atender uma comunidade global de apaixonados por fragrancias. Nossa plataforma combina uma base robusta de perfumes com ferramentas de descoberta para ajudar pessoas a encontrar aromas com os quais se identificam.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop"
                    alt="Colecao de frascos de perfume de luxo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                  <p className="font-serif text-2xl font-semibold text-primary">Desde 2024</p>
                  <p className="text-sm text-muted-foreground">Ajudando voce a descobrir fragrancias</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                O que nos move
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossos valores orientam tudo que fazemos: dos recursos que criamos a forma como nos relacionamos com a comunidade.
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

        {/* Time */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">
                Conheca nosso time
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Um grupo apaixonado por fragrancias, tecnologia e comunidade.
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
              Pronto para encontrar seu perfume assinatura?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Junte-se a comunidade Verdara e comece hoje sua jornada de descoberta.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/discover/quiz">Fazer o quiz</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/perfumes">Explorar perfumes</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
