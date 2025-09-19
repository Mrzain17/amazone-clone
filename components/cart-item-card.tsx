"use client"

import { useCartStore, type CartItem } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCartStore()

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Link href={`/product/${item.id}`} className="flex-shrink-0">
            <div className="w-24 h-24 relative rounded-md overflow-hidden">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link href={`/product/${item.id}`}>
              <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors mb-2">
                {item.title}
              </h3>
            </Link>

            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
              {item.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Qty:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm min-w-[2rem] text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!item.inStock && <p className="text-sm text-destructive mt-2">This item is currently out of stock</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
