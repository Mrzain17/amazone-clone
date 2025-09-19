import { Header } from "@/components/header"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { notFound } from "next/navigation"

// Mock product data - in a real app this would come from a database
const products = {
  "1": {
    id: "1",
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 1234,
    images: [
      "/wireless-headphones.png",
      "/placeholder.svg?height=400&width=400&text=Headphones+Side",
      "/placeholder.svg?height=400&width=400&text=Headphones+Case",
      "/placeholder.svg?height=400&width=400&text=Headphones+Details",
    ],
    badge: "Best Seller",
    description:
      "Experience premium sound quality with these wireless Bluetooth headphones featuring advanced noise cancellation technology. Perfect for music lovers, commuters, and professionals who demand crystal-clear audio.",
    features: [
      "Active Noise Cancellation (ANC) technology",
      "30-hour battery life with quick charge",
      "Premium drivers for exceptional sound quality",
      "Comfortable over-ear design with memory foam",
      "Built-in microphone for hands-free calls",
      "Foldable design for easy portability",
      "Compatible with all Bluetooth devices",
      "Touch controls for easy operation",
    ],
    specifications: {
      Brand: "AudioTech",
      Model: "AT-WH1000",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      "Battery Life": "30 hours (ANC on), 40 hours (ANC off)",
      "Charging Time": "3 hours (full charge), 10 minutes (3 hours playback)",
      Weight: "250g",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      "Driver Size": "40mm",
      Warranty: "2 years",
    },
    inStock: true,
    stockCount: 47,
    seller: "AudioTech Official Store",
    shippingInfo: "FREE delivery by tomorrow if you order within 4 hrs 23 mins",
    returnPolicy: "30-day return policy",
  },
  "2": {
    id: "2",
    title: "Smart Fitness Watch with Heart Rate Monitor",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.3,
    reviewCount: 856,
    images: [
      "/fitness-smartwatch.png",
      "/placeholder.svg?height=400&width=400&text=Watch+Side",
      "/placeholder.svg?height=400&width=400&text=Watch+Apps",
      "/placeholder.svg?height=400&width=400&text=Watch+Bands",
    ],
    description:
      "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS tracking, and comprehensive health insights.",
    features: [
      "24/7 heart rate monitoring",
      "Built-in GPS for accurate tracking",
      "50+ workout modes",
      "Sleep quality analysis",
      "Water resistant up to 50m",
      "7-day battery life",
      "Smart notifications",
      "Music control",
    ],
    specifications: {
      Brand: "FitTech",
      Model: "FT-SW200",
      Display: '1.4" AMOLED touchscreen',
      "Battery Life": "7 days typical use",
      "Water Resistance": "5ATM (50 meters)",
      Connectivity: "Bluetooth 5.0, Wi-Fi",
      Sensors: "Heart rate, GPS, accelerometer, gyroscope",
      Compatibility: "iOS 12+, Android 6.0+",
      Weight: "45g",
      Warranty: "1 year",
    },
    inStock: true,
    stockCount: 23,
    seller: "FitTech Store",
    shippingInfo: "FREE delivery by Dec 28",
    returnPolicy: "30-day return policy",
  },
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products[params.id as keyof typeof products]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>

        <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />

        <RelatedProducts currentProductId={product.id} />
      </main>
    </div>
  )
}
