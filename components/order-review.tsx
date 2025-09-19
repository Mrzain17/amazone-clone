"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Loader2, MapPin, CreditCard } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import type { PaymentInfo, ShippingAddress } from "@/app/checkout/page"

interface OrderReviewProps {
  shippingAddress: ShippingAddress
  paymentInfo: PaymentInfo
  onPlaceOrder: () => Promise<void>
  onBack: () => void
}

export function OrderReview({ shippingAddress, paymentInfo, onPlaceOrder, onBack }: OrderReviewProps) {
  const { items, getTotalPrice } = useCartStore()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)
    try {
      await onPlaceOrder()
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "")
    return `**** **** **** ${cleaned.slice(-4)}`
  }

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p className="font-medium">
              {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            <p>{shippingAddress.address}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
            </p>
            <p>{shippingAddress.country}</p>
            <p className="mt-2">Phone: {shippingAddress.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p className="font-medium">{maskCardNumber(paymentInfo.cardNumber)}</p>
            <p>Expires: {paymentInfo.expiryDate}</p>
            <p>Cardholder: {paymentInfo.cardholderName}</p>
          </div>
        </CardContent>
      </Card>

      {/* Order Total */}
      <Card>
        <CardHeader>
          <CardTitle>Order Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isPlacingOrder}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Payment
        </Button>
        <Button className="flex-1" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
          {isPlacingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  )
}
