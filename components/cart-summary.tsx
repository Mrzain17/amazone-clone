"use client"

import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck } from "lucide-react"
import Link from "next/link"

export function CartSummary() {
  const { items, getTotalItems, getTotalPrice } = useCartStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const totalItems = getTotalItems()

  if (items.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Items ({totalItems})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="flex items-center">
              <Truck className="h-4 w-4 mr-1" />
              Shipping
            </span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {shipping > 0 && (
            <p className="text-xs text-muted-foreground">Add ${(50 - subtotal).toFixed(2)} more for FREE shipping</p>
          )}

          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>

        <div className="space-y-2">
          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>

          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Free returns within 30 days</p>
          <p>• Secure checkout with SSL encryption</p>
          <p>• Customer support available 24/7</p>
        </div>
      </CardContent>
    </Card>
  )
}
