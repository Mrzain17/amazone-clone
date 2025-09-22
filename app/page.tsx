import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

// Mock product data
const featuredProducts = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 1234,
    image: "/wireless-headphones.png",
    badge: "Best Seller",
  },
  {
    id: "2",
    title: "Smart Fitness Watch with Heart Rate Monitor",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.3,
    reviewCount: 856,
    image: "/fitness-smartwatch.png",
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
]

const categories = [
  { name: "Electronics", image: "/electronics-gadgets.png", slug: "electronics" },
  { name: "Fashion", image: "/diverse-fashion-collection.png", slug: "clothing" },
  { name: "Home", image: "/home-garden-decor.jpg", slug: "home" },
  { name: "Sports", image: "/assorted-sports-gear.png", slug: "sports" },
  { name: "Books", image: "/books-library.jpg", slug: "books" },
  { name: "Beauty", image: "/beauty-cosmetics.png", slug: "beauty" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroBanner />

        {/* Categories Section */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/search?category=${encodeURIComponent(category.name)}`}
                  className="group cursor-pointer text-center"
                >
                  <div className="aspect-square relative mb-3 overflow-hidden rounded-full bg-muted">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Today's Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={`deal-${product.id}`} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Press Releases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sell Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Become an Affiliate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Advertise Your Products
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Your Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Your Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Shipping Rates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Report a Problem
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-muted mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 AmazonClone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
