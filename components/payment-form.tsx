"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, ArrowLeft } from "lucide-react"
import type { PaymentInfo, ShippingAddress } from "@/app/checkout/page"

interface PaymentFormProps {
  initialData: PaymentInfo
  shippingAddress: ShippingAddress
  onSubmit: (payment: PaymentInfo) => void
  onBack: () => void
}

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

export function PaymentForm({ initialData, shippingAddress, onSubmit, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentInfo>(initialData)
  const [errors, setErrors] = useState<Partial<PaymentInfo>>({})

  const handleChange = (field: keyof PaymentInfo, value: string | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // If sameAsShipping is checked, copy shipping address to billing
      if (field === "sameAsShipping" && value === true) {
        updated.billingAddress = { ...shippingAddress }
      }

      return updated
    })

    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleBillingChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({
      ...prev,
      billingAddress: { ...prev.billingAddress, [field]: value },
    }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentInfo> = {}

    if (!formData.cardNumber.replace(/\s/g, "")) newErrors.cardNumber = "Card number is required"
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
    if (!formData.cvv) newErrors.cvv = "CVV is required"
    if (!formData.cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required"

    if (!formData.sameAsShipping) {
      if (!formData.billingAddress.firstName.trim()) newErrors.billingAddress = "Billing address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleChange("cardNumber", formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={errors.cardNumber ? "border-destructive" : ""}
              />
              {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange("expiryDate", formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={errors.expiryDate ? "border-destructive" : ""}
                />
                {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleChange("cvv", e.target.value.replace(/\D/g, ""))}
                  placeholder="123"
                  maxLength={4}
                  className={errors.cvv ? "border-destructive" : ""}
                />
                {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                value={formData.cardholderName}
                onChange={(e) => handleChange("cardholderName", e.target.value)}
                placeholder="John Doe"
                className={errors.cardholderName ? "border-destructive" : ""}
              />
              {errors.cardholderName && <p className="text-sm text-destructive">{errors.cardholderName}</p>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsShipping"
              checked={formData.sameAsShipping}
              onCheckedChange={(checked) => handleChange("sameAsShipping", checked as boolean)}
            />
            <Label htmlFor="sameAsShipping">Same as shipping address</Label>
          </div>

          {!formData.sameAsShipping && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingFirstName">First Name *</Label>
                  <Input
                    id="billingFirstName"
                    value={formData.billingAddress.firstName}
                    onChange={(e) => handleBillingChange("firstName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingLastName">Last Name *</Label>
                  <Input
                    id="billingLastName"
                    value={formData.billingAddress.lastName}
                    onChange={(e) => handleBillingChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingAddress">Address *</Label>
                <Input
                  id="billingAddress"
                  value={formData.billingAddress.address}
                  onChange={(e) => handleBillingChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingCity">City *</Label>
                  <Input
                    id="billingCity"
                    value={formData.billingAddress.city}
                    onChange={(e) => handleBillingChange("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingState">State *</Label>
                  <Select
                    value={formData.billingAddress.state}
                    onValueChange={(value) => handleBillingChange("state", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingZipCode">ZIP Code *</Label>
                  <Input
                    id="billingZipCode"
                    value={formData.billingAddress.zipCode}
                    onChange={(e) => handleBillingChange("zipCode", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shipping
        </Button>
        <Button type="submit" className="flex-1" onClick={handleSubmit}>
          Review Order
        </Button>
      </div>
    </div>
  )
}
