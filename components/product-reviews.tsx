"use client"

import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ProductReviewsProps {
  productId: string
  rating: number
  reviewCount: number
}

// Mock review data
const reviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Excellent sound quality!",
    content:
      "These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is exactly as advertised. Perfect for my daily commute.",
    date: "2024-01-15",
    verified: true,
    helpful: 23,
    unhelpful: 2,
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    title: "Great value for money",
    content:
      "Really impressed with the build quality and comfort. Only minor complaint is that they can get a bit warm during long listening sessions.",
    date: "2024-01-12",
    verified: true,
    helpful: 18,
    unhelpful: 1,
  },
  {
    id: "3",
    author: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Perfect for work calls",
    content:
      "The microphone quality is crystal clear. My colleagues can hear me perfectly even in noisy environments. Highly recommend for remote work.",
    date: "2024-01-10",
    verified: true,
    helpful: 15,
    unhelpful: 0,
  },
  {
    id: "4",
    author: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    title: "Good but not great",
    content:
      "Decent headphones for the price. The noise cancellation works well but I expected better bass response. Still a solid choice overall.",
    date: "2024-01-08",
    verified: false,
    helpful: 8,
    unhelpful: 3,
  },
]

const ratingDistribution = [
  { stars: 5, count: 620, percentage: 50 },
  { stars: 4, count: 370, percentage: 30 },
  { stars: 3, count: 148, percentage: 12 },
  { stars: 2, count: 62, percentage: 5 },
  { stars: 1, count: 34, percentage: 3 },
]

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold">{rating}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Based on {reviewCount.toLocaleString()} reviews</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <span className="text-sm w-8">{item.stars}★</span>
                <Progress value={item.percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-12">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <Button className="mb-8">Write a Review</Button>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                <AvatarFallback>
                  {review.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{review.author}</span>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsDown className="h-4 w-4 mr-1" />({review.unhelpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
