"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { reviews, forumPosts } from "@/lib/data"
import { Star, MessageSquare, Eye, ThumbsUp, Users, TrendingUp, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatCompactNumber, siteStats } from "@/lib/site-stats"

const tabs = [
  { id: "forum", label: "Forum", icon: MessageSquare },
  { id: "reviews", label: "Recent Reviews", icon: Star },
  { id: "collections", label: "Collections", icon: BookOpen },
]

const forumCategories = [
  { name: "Recommendations", count: 1234, color: "bg-blue-100 text-blue-800" },
  { name: "Discussion", count: 987, color: "bg-green-100 text-green-800" },
  { name: "Collections", count: 654, color: "bg-purple-100 text-purple-800" },
  { name: "Education", count: 432, color: "bg-amber-100 text-amber-800" },
  { name: "News", count: 321, color: "bg-pink-100 text-pink-800" },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forum")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              Community
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-pretty">
              Connect with fellow fragrance enthusiasts. Share reviews, discuss your favorites, 
              and discover new scents through our passionate community.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{formatCompactNumber(siteStats.forumPosts)}</p>
                  <p className="text-sm text-muted-foreground">Tópicos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{formatCompactNumber(siteStats.reviews)}</p>
                  <p className="text-sm text-muted-foreground">Avaliações</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{formatCompactNumber(siteStats.perfumes)}</p>
                  <p className="text-sm text-muted-foreground">Perfumes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border bg-card sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {activeTab === "forum" && (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Forum Posts */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    Hot Topics
                  </h2>
                  <Button>Start Discussion</Button>
                </div>

                <div className="space-y-4">
                  {forumPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                                {post.title}
                              </h3>
                              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                <span>by {post.author}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  post.category === "Recommendations" ? "bg-blue-100 text-blue-800" :
                                  post.category === "Discussion" ? "bg-green-100 text-green-800" :
                                  post.category === "Collections" ? "bg-purple-100 text-purple-800" :
                                  post.category === "Education" ? "bg-amber-100 text-amber-800" :
                                  "bg-muted text-muted-foreground"
                                }`}>
                                  {post.category}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {post.lastActivity}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <MessageSquare className="h-4 w-4" />
                              {post.replies} replies
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Eye className="h-4 w-4" />
                              {post.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="outline">Load More Topics</Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-medium text-foreground mb-4">Categories</h3>
                  <div className="space-y-3">
                    {forumCategories.map((category) => (
                      <button
                        key={category.name}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                          {category.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <h3 className="font-medium text-foreground mb-4">Community Guidelines</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Be respectful and constructive</li>
                    <li>Share honest reviews</li>
                    <li>No spam or self-promotion</li>
                    <li>Keep discussions on-topic</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Recent Reviews
                </h2>
                <Button>Write a Review</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="bg-card rounded-xl border border-border p-6"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-foreground">{review.userName}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <Link
                          href={`/perfumes/${review.perfumeId}`}
                          className="mt-1 text-sm text-primary hover:underline"
                        >
                          {review.perfumeName} by {review.perfumeBrand}
                        </Link>
                        <div className="flex items-center gap-1 mt-2">
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
                        <p className="mt-3 text-muted-foreground text-sm line-clamp-3">
                          {review.content}
                        </p>
                        <button className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Helpful ({review.likes})</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          )}

          {activeTab === "collections" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  Featured Collections
                </h2>
                <Button>Create Collection</Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Best Office Fragrances 2026",
                    author: "FragranceExpert",
                    count: 24,
                    likes: 456,
                    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop",
                  },
                  {
                    title: "Summer Date Night Picks",
                    author: "ScentLover",
                    count: 18,
                    likes: 312,
                    image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=400&h=300&fit=crop",
                  },
                  {
                    title: "Under $50 Hidden Gems",
                    author: "BudgetScenter",
                    count: 32,
                    likes: 567,
                    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=300&fit=crop",
                  },
                  {
                    title: "Niche House Essentials",
                    author: "NicheCollector",
                    count: 15,
                    likes: 234,
                    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
                  },
                  {
                    title: "Cozy Fall Scents",
                    author: "SeasonalScenter",
                    count: 21,
                    likes: 189,
                    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
                  },
                  {
                    title: "Oud For Beginners",
                    author: "OudExplorer",
                    count: 12,
                    likes: 298,
                    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
                  },
                ].map((collection, index) => (
                  <article
                    key={index}
                    className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {collection.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        by {collection.author}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{collection.count} perfumes</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          {collection.likes}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline">Browse All Collections</Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
