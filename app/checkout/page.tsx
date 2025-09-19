"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { CheckoutSteps } from "@/components/checkout-steps"
import { ShippingForm } from "@/components/shipping-form"
import { PaymentForm } from "@/components/payment-form"
import { OrderReview } from "@/components/order-review"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  billingAddress: ShippingAddress
  sameAsShipping: boolean
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  })
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    },
    sameAsShipping: true,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin?redirect=/checkout")
      return
    }

    if (items.length === 0) {
      router.push("/cart")
      return
    }
  }, [isAuthenticated, items.length, router])

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (payment: PaymentInfo) => {
    setPaymentInfo(payment)
    setCurrentStep(3)
  }

  const handlePlaceOrder = async () => {
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  if (!isAuthenticated || items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <CheckoutSteps currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              {currentStep === 1 && <ShippingForm initialData={shippingAddress} onSubmit={handleShippingSubmit} />}

              {currentStep === 2 && (
                <PaymentForm
                  initialData={paymentInfo}
                  shippingAddress={shippingAddress}
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && (
                <OrderReview
                  shippingAddress={shippingAddress}
                  paymentInfo={paymentInfo}
                  onPlaceOrder={handlePlaceOrder}
                  onBack={() => setCurrentStep(2)}
                />
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{getTotalPrice() > 50 ? "FREE" : "$9.99"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(getTotalPrice() + (getTotalPrice() > 50 ? 0 : 9.99) + getTotalPrice() * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
