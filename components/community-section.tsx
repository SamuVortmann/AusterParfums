import Link from "next/link"
import { Star, MessageCircle, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { forumPosts, reviews } from "@/lib/data"
import { formatCompactNumber, siteStats } from "@/lib/site-stats"

const recentReviews = [...reviews].slice(0, 3).map((r) => ({
  user: { name: r.userName, avatar: r.userAvatar, initials: r.userName.split(" ").slice(0, 2).map((x) => x[0]).join("") },
  perfume: r.perfumeName,
  brand: r.perfumeBrand,
  rating: r.rating,
  excerpt: r.content,
  timeAgo: r.date,
}))

const forumTopics = [...forumPosts].slice(0, 3).map((p) => ({
  title: p.title,
  replies: p.replies,
  views: p.views,
}))

export function CommunitySection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-semibold text-foreground">Participe da comunidade</h2>
          <p className="mt-3 text-muted-foreground">
            Converse com pessoas que também amam perfumes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Reviews */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-amber-500" />
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Avaliações recentes ({formatCompactNumber(siteStats.reviews)})
              </h3>
            </div>
            <div className="space-y-6">
              {recentReviews.map((review) => (
                <div key={review.perfume} className="flex gap-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={review.user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {review.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-foreground">{review.user.name}</span>
                      <span className="text-muted-foreground text-sm">avaliou</span>
                      <span className="font-medium text-sm text-primary">{review.perfume}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{review.brand}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{review.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-2">{review.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/community" className="mt-6 block w-full py-2.5 text-sm font-medium text-primary hover:underline text-center">
              Ver mais →
            </Link>
          </div>

          {/* Forum Topics */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Tópicos em alta ({formatCompactNumber(siteStats.forumPosts)})
              </h3>
            </div>
            <div className="space-y-4">
              {forumTopics.map((topic) => (
                <button
                  key={topic.title}
                  className="w-full text-left p-4 rounded-xl bg-secondary hover:bg-muted transition-colors"
                >
                  <p className="font-medium text-foreground">{topic.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {topic.replies} respostas
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {topic.views.toLocaleString()} visualizações
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <Link href="/community" className="mt-6 block w-full py-2.5 text-sm font-medium text-primary hover:underline text-center">
              Ir para a comunidade →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
