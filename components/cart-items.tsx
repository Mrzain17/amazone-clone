"use client"

import { useCartStore } from "@/lib/cart-store"
import { CartItemCard } from "@/components/cart-item-card"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export function CartItems() {
  const { items, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Cart Items ({items.length} {items.length === 1 ? "item" : "items"})
        </h2>
        <Button variant="outline" onClick={clearCart} size="sm">
          Clear Cart
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
