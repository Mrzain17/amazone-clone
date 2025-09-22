"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

interface SearchFiltersProps {
  filters: {
    category: string
    priceRange: number[]
    rating: number
    brand: string
  }
  onFiltersChange: (filters: any) => void
}

const categories = ["Electronics", "Home", "Sports", "Books", "Clothing", "Beauty"]

const brands = [
  "AudioTech",
  "FitTech",
  "BrewMaster",
  "ComfortSeating",
  "SoundWave",
  "VisionTech",
  "GamePro",
  "HydroFlow",
]

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      priceRange: [0, 1000],
      rating: 0,
      brand: "",
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={localFilters.category === category}
                  onCheckedChange={(checked) => handleFilterChange("category", checked ? category : "")}
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-3">
            <Slider
              value={localFilters.priceRange}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${localFilters.priceRange[0]}</span>
              <span>${localFilters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div>
          <h3 className="font-medium mb-3">Customer Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={localFilters.rating === rating}
                  onCheckedChange={(checked) => handleFilterChange("rating", checked ? rating : 0)}
                />
                <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span>& Up</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Brand Filter */}
        <div>
          <h3 className="font-medium mb-3">Brand</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={localFilters.brand === brand}
                  onCheckedChange={(checked) => handleFilterChange("brand", checked ? brand : "")}
                />
                <Label htmlFor={brand} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
