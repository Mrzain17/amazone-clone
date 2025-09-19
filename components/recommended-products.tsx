import { ProductCard } from "@/components/product-card"

// Mock recommended products
const recommendedProducts = [
  {
    id: "7",
    title: "Wireless Gaming Mouse with RGB Lighting",
    price: 59.99,
    rating: 4.5,
    reviewCount: 789,
    image: "/gaming-mouse-wireless-rgb.jpg",
  },
  {
    id: "8",
    title: "Stainless Steel Water Bottle 32oz",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 1456,
    image: "/stainless-steel-bottle.png",
  },
  {
    id: "3",
    title: "Premium Coffee Maker with Built-in Grinder",
    price: 149.99,
    rating: 4.7,
    reviewCount: 432,
    image: "/coffee-maker-machine.jpg",
    badge: "New",
  },
  {
    id: "5",
    title: "Portable Bluetooth Speaker - Waterproof",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviewCount: 923,
    image: "/bluetooth-speaker-portable.jpg",
  },
]

export function RecommendedProducts() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
