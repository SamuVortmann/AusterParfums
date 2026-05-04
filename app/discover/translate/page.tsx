"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  Star, 
  Heart, 
  Dna, 
  Search,
  Wind,
  Zap
} from "lucide-react"
import { perfumes } from "@/lib/data"

const scentMappings = {
  keywords: {
    "floresta": { notes: ["musgo", "cedro", "verde"], moods: ["natural", "fresco"], accords: ["amadeirado"] },
    "chuva": { notes: ["petrichor", "ozônio", "fresco"], moods: ["refrescante", "limpo"], accords: ["aquático"] },
    "praia": { notes: ["sal", "coco", "melão"], moods: ["tropical", "descontraído"], accords: ["frutado"] },
    "carro": { notes: ["couro", "metal", "borracha"], moods: ["moderno", "sofisticado"], accords: ["aromático"] },
    "lareira": { notes: ["madeira", "fumaça", "âmbar"], moods: ["aconchegante", "quente"], accords: ["amadeirado"] },
    "livro": { notes: ["papel", "café", "baunilha"], moods: ["intelectual", "nostálgico"], accords: ["baunilhado"] },
    "jazz": { notes: ["tabaco", "couro", "especiarias"], moods: ["sofisticado", "sensual"], accords: ["aromático"] },
    "paris": { notes: ["rosa", "bergamota", "jasmim"], moods: ["romântico", "elegante"], accords: ["floral"] },
    "café": { notes: ["café", "caramelo", "chocolate"], moods: ["estimulante", "confortável"], accords: ["oriental"] },
  }
}

function interpretDescription(description: string) {
  const lowerDesc = description.toLowerCase()
  let notes: string[] = []
  let moods: string[] = []
  let accords: string[] = []

  Object.entries(scentMappings.keywords).forEach(([keyword, mapping]) => {
    if (lowerDesc.includes(keyword)) {
      notes = [...notes, ...mapping.notes]
      moods = [...moods, ...mapping.moods]
      accords = [...accords, ...mapping.accords]
    }
  })

  if (notes.length === 0) {
    notes = ["bergamota", "jasmim", "almíscaro"]
    moods = ["sofisticado", "elegante"]
    accords = ["floral", "oriental"]
  }

  return {
    notes: [...new Set(notes)].slice(0, 5),
    moods: [...new Set(moods)].slice(0, 3),
    accords: [...new Set(accords)].slice(0, 3),
  }
}

function findMatchingPerfumes(interpretation: any) {
  return perfumes
    .map((perfume) => {
      let score = 0
      const perfumeTags = `${perfume.name} ${perfume.brand}`.toLowerCase()
      
      interpretation.notes.forEach((note: string) => {
        if (perfumeTags.includes(note.toLowerCase())) score += 0.3
      })
      
      interpretation.moods.forEach((mood: string) => {
        if (perfumeTags.includes(mood.toLowerCase())) score += 0.25
      })
      
      interpretation.accords.forEach((accord: string) => {
        if (perfumeTags.includes(accord.toLowerCase())) score += 0.2
      })
      
      return { perfume, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
}

const examplePrompts = [
  "Quero cheirar como o interior de um carro novo",
  "Caminhando por uma floresta depois da chuva",
  "Noite aconchegante perto da lareira com um livro",
  "Manhã fresca na praia",
  "Um cavalheiro sofisticado em um bar de jazz",
]

export default function ScentTranslatorPage() {
  const [description, setDescription] = useState("")
  const [interpretation, setInterpretation] = useState<any | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [hasTranslated, setHasTranslated] = useState(false)

  const handleTranslate = () => {
    if (!description.trim()) return
    setIsTranslating(true)
    setTimeout(() => {
      const result = interpretDescription(description)
      setInterpretation(result)
      setIsTranslating(false)
      setHasTranslated(true)
    }, 800)
  }

  const matchingPerfumes = interpretation ? findMatchingPerfumes(interpretation) : []

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero com Coloração Premium (Âmbar/Dourado) */}
        <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
          <div className="absolute inset-0 bg-[url('/gold-dust.png')] opacity-20" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/20 blur-[120px] rounded-full" />
          
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <Badge className="mb-6 bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30 px-4 py-1">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              AI Scent Engine v2.0
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-light mb-6 tracking-tight">
              Traduza seus <span className="text-amber-500">Sentimentos</span> em Aroma
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light italic">
              "A linguagem é limitada, mas o olfato é infinito. Descreva uma memória ou desejo, e nós encontraremos sua assinatura."
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 -mt-12 mb-20">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Painel de Input Esquerda */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-amber-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-medium text-slate-800">O que você está imaginando?</h2>
                </div>

                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Uma tarde de sol em Paris, tomando café e sentindo o cheiro de livros antigos..."
                  className="min-h-[180px] bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-amber-500/50 text-lg p-6 rounded-2xl"
                />

                <div className="mt-6 flex flex-wrap gap-2">
                   {examplePrompts.map((ex, i) => (
                     <button 
                       key={i}
                       onClick={() => setDescription(ex)}
                       className="text-xs bg-slate-100 hover:bg-amber-100 text-slate-600 px-3 py-1.5 rounded-full transition-colors"
                     >
                       {ex}
                     </button>
                   ))}
                </div>

                <Button 
                  onClick={handleTranslate}
                  disabled={!description.trim() || isTranslating}
                  className="w-full mt-8 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-lg font-medium shadow-lg shadow-amber-900/10"
                >
                  {isTranslating ? "Analisando DNA Olfativo..." : "Gerar Recomendação"}
                </Button>
              </div>
            </div>

            {/* Painel de Contexto Direita */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-3xl p-8 text-white shadow-xl">
                <Dna className="h-8 w-8 mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Como ajudamos?</h3>
                <p className="text-amber-50/80 text-sm leading-relaxed">
                  Nossa inteligência mapeia palavras-chave para mais de 500 acordes moleculares, 
                  identificando a base, o corpo e a saída que melhor representam seu texto.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100">
                <h4 className="flex items-center gap-2 font-medium text-slate-800 mb-4">
                  <Zap className="h-4 w-4 text-amber-500" /> 
                  Sugestões Rápidas
                </h4>
                <div className="space-y-3">
                  {["💼 Reunião de Negócios", "🌙 Encontro Romântico", "🏖️ Férias Tropicais"].map((t) => (
                    <div key={t} className="p-3 border border-slate-50 rounded-xl hover:bg-slate-50 cursor-pointer text-sm text-slate-600 transition-all">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resultados - Só aparecem após tradução */}
          {hasTranslated && interpretation && (
            <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-amber-200" />
                <h2 className="font-serif text-3xl text-slate-800">Sua Assinatura Detectada</h2>
                <div className="h-px flex-1 bg-amber-200" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Notas Mapping */}
                <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                   <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-4">Notas de Topo & Coração</p>
                   <div className="flex flex-wrap gap-2">
                     {interpretation.notes.map((n: string) => (
                       <Badge key={n} variant="outline" className="bg-amber-50/50 border-amber-200 text-amber-800">{n}</Badge>
                     ))}
                   </div>
                </div>
                {/* Mood Mapping */}
                <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                   <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-4">Vibe & Projeção</p>
                   <div className="flex flex-wrap gap-2">
                     {interpretation.moods.map((m: string) => (
                       <Badge key={m} className="bg-slate-800 text-white">{m}</Badge>
                     ))}
                   </div>
                </div>
                {/* Accord Mapping */}
                <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                   <p className="text-[10px] uppercase tracking-widest text-amber-600 font-bold mb-4">Família Olfativa</p>
                   <div className="flex flex-wrap gap-2">
                     {interpretation.accords.map((a: string) => (
                       <Badge key={a} variant="secondary" className="bg-slate-100">{a}</Badge>
                     ))}
                   </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchingPerfumes.map(({ perfume, score }: any) => (
                  <Link key={perfume.id} href={`/perfumes/${perfume.id}`} className="group relative bg-white rounded-3xl p-2 border border-transparent hover:border-amber-200 transition-all hover:shadow-2xl">
                    <div className="aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden relative">
                       <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold text-amber-600 border border-amber-100">
                         {Math.min(95, score * 8)}% MATCH
                       </div>
                       <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          {/* Placeholder para imagem do perfume */}
                          <div className="w-20 h-32 bg-gradient-to-b from-amber-200 to-amber-500 rounded-md shadow-lg" />
                       </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter mb-1">{perfume.brand}</p>
                      <h3 className="font-serif text-xl text-slate-800 mb-2">{perfume.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-slate-600">{perfume.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}