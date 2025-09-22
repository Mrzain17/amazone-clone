"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { SearchFilters } from "@/components/search-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"

// Mock products database
const allProducts = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 1234,
    image: "/wireless-headphones.png",
    badge: "Best Seller",
    category: "Electronics",
    brand: "AudioTech",
    tags: ["wireless", "bluetooth", "headphones", "noise cancellation", "audio"],
  },
  {
    id: "2",
    title: "Smart Fitness Watch with Heart Rate Monitor",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.3,
    reviewCount: 856,
    image: "/fitness-smartwatch.png",
    category: "Electronics",
    brand: "FitTech",
    tags: ["smartwatch", "fitness", "heart rate", "health", "wearable"],
  },
  {
    id: "3",
    title: "Premium Coffee Maker with Built-in Grinder",
    price: 149.99,
    rating: 4.7,
    reviewCount: 432,
    image: "/coffee-maker-machine.jpg",
    badge: "New",
    category: "Home",
    brand: "BrewMaster",
    tags: ["coffee", "maker", "grinder", "kitchen", "appliance"],
  },
  {
    id: "4",
    title: "Ergonomic Office Chair with Lumbar Support",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.4,
    reviewCount: 678,
    image: "/office-chair-ergonomic.jpg",
    category: "Home",
    brand: "ComfortSeating",
    tags: ["office", "chair", "ergonomic", "lumbar", "furniture"],
  },
  {
    id: "5",
    title: "Portable Bluetooth Speaker - Waterproof",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviewCount: 923,
    image: "/bluetooth-speaker-portable.jpg",
    category: "Electronics",
    brand: "SoundWave",
    tags: ["bluetooth", "speaker", "portable", "waterproof", "audio"],
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
    category: "Electronics",
    brand: "VisionTech",
    tags: ["tv", "smart tv", "4k", "ultra hd", "television"],
  },
  {
    id: "7",
    title: "Wireless Gaming Mouse with RGB Lighting",
    price: 59.99,
    rating: 4.5,
    reviewCount: 789,
    image: "/gaming-mouse-wireless-rgb.jpg",
    category: "Electronics",
    brand: "GamePro",
    tags: ["gaming", "mouse", "wireless", "rgb", "computer"],
  },
  {
    id: "8",
    title: "Stainless Steel Water Bottle 32oz",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 1456,
    image: "/stainless-steel-bottle.png",
    category: "Sports",
    brand: "HydroFlow",
    tags: ["water bottle", "stainless steel", "hydration", "sports", "eco-friendly"],
  },
]

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(allProducts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    rating: 0,
    brand: "",
  })

  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""

  useEffect(() => {
    let filtered = allProducts

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          product.brand.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Filter by category
    if (category || filters.category) {
      const categoryFilter = category || filters.category
      filtered = filtered.filter((product) => product.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand.toLowerCase() === filters.brand.toLowerCase())
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        // Keep original order for relevance
        break
    }

    setProducts(filtered)
  }, [query, category, filters, sortBy])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {query ? `Search results for "${query}"` : category ? `${category} Products` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {products.length} result{products.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <SearchFilters filters={filters} onFiltersChange={handleFilterChange} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Display */}
            {products.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">No products found</h2>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
