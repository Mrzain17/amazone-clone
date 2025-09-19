import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed and is being processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="text-primary font-mono">{orderNumber}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>{estimatedDelivery}</span>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-4">
                <div className="text-center">
                  <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Processing</p>
                  <p className="text-xs text-muted-foreground">Order confirmed</p>
                </div>
                <div className="text-center opacity-50">
                  <Truck className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Shipping</p>
                  <p className="text-xs text-muted-foreground">In transit</p>
                </div>
                <div className="text-center opacity-50">
                  <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Delivered</p>
                  <p className="text-xs text-muted-foreground">At your door</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/profile">View Order History</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
