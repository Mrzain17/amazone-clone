import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  id: string
  title: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  badge?: string
}

export function ProductCard({ id, title, price, originalPrice, rating, reviewCount, image, badge }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="relative">
          <Link href={`/product/${id}`}>
            <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {badge && <Badge className="absolute top-2 left-2 bg-destructive">{badge}</Badge>}
              {discount > 0 && <Badge className="absolute top-2 right-2 bg-green-600">-{discount}%</Badge>}
            </div>
          </Link>

          <div className="space-y-2">
            <Link href={`/product/${id}`}>
              <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">{title}</h3>
            </Link>

            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
              )}
            </div>

            <Button className="w-full" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
