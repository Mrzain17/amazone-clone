"use client"

import { useState } from "react"
import { Star, ShoppingCart, Heart, Share2, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"

interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  badge?: string
  description: string
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
  stockCount: number
  seller: string
  shippingInfo: string
  returnPolicy: string
  images: string[]
}

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem, getItemQuantity } = useCartStore()

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const currentQuantityInCart = getItemQuantity(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        inStock: product.inStock,
      })
    }

    toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart!`)
  }

  return (
    <div className="space-y-6">
      {/* Title and Badge */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.badge && <Badge className="bg-primary">{product.badge}</Badge>}
          {discount > 0 && <Badge variant="destructive">-{discount}% OFF</Badge>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-balance">{product.title}</h1>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        {discount > 0 && (
          <p className="text-sm text-green-600 font-medium">
            You save ${(product.originalPrice! - product.price).toFixed(2)} ({discount}%)
          </p>
        )}
      </div>

      <Separator />

      {/* Stock Status */}
      <div className="space-y-2">
        {product.inStock ? (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">In Stock</span>
            <span className="text-sm text-muted-foreground">({product.stockCount} available)</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-medium">Out of Stock</span>
          </div>
        )}

        {currentQuantityInCart > 0 && (
          <p className="text-sm text-muted-foreground">
            {currentQuantityInCart} item{currentQuantityInCart > 1 ? "s" : ""} already in cart
          </p>
        )}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium">Quantity:</label>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
              disabled={quantity >= product.stockCount}
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="flex-1" disabled={!product.inStock} onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={isWishlisted ? "text-red-500 border-red-500" : ""}
          >
            <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </div>

      <Separator />

      {/* Shipping and Return Info */}
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Truck className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-green-600">Free Delivery</p>
            <p className="text-sm text-muted-foreground">{product.shippingInfo}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <RotateCcw className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-600">Easy Returns</p>
            <p className="text-sm text-muted-foreground">{product.returnPolicy}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Seller Info */}
      <div>
        <p className="text-sm text-muted-foreground">
          Sold by <span className="font-medium text-foreground">{product.seller}</span>
        </p>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specs</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4">
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </TabsContent>

        <TabsContent value="features" className="mt-4">
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="specifications" className="mt-4">
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                <span className="font-medium">{key}</span>
                <span className="text-muted-foreground text-right">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
