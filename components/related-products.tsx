import { ProductCard } from "@/components/product-card"

interface RelatedProductsProps {
  currentProductId: string
}

// Mock related products data
const relatedProducts = [
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
    id: "4",
    title: "Ergonomic Office Chair with Lumbar Support",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.4,
    reviewCount: 678,
    image: "/office-chair-ergonomic.jpg",
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
  {
    id: "6",
    title: "4K Ultra HD Smart TV 55 inch",
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.2,
    reviewCount: 567,
    image: "/4k-smart-tv-television.jpg",
    badge: "Deal",
  },
]

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Filter out the current product
  const filteredProducts = relatedProducts.filter((product) => product.id !== currentProductId)

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
