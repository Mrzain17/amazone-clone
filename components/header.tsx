"use client"

import type React from "react"

import { useState } from "react"
import { Search, ShoppingCart, User, Menu, LogOut, Package, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import { useAuthStore } from "@/lib/auth-store"

export function Header() {
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, signOut } = useAuthStore()
  const totalItems = getTotalItems()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/search?category=${encodeURIComponent(category)}`)
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">AmazonClone</div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-0 top-0 h-10 px-4 bg-primary hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:flex">
                  <Menu className="h-4 w-4 mr-2" />
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4">
                <div className="space-y-4">
                  {/* Browse All Categories Link */}
                  <div className="pb-2 border-b border-border">
                    <Link href="/categories" className="block">
                      <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors">
                        <span className="font-semibold text-primary">Browse All Categories</span>
                        <span className="text-xs text-muted-foreground">→</span>
                      </div>
                    </Link>
                  </div>

                  {/* Popular Categories Section */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2 px-2">Popular Categories</h4>
                    <div className="grid grid-cols-2 gap-1">
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Electronics")}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Electronics</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Fashion")}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
                      >
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>Fashion</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Home & Garden")}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Home & Garden</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Sports")}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Sports</span>
                      </DropdownMenuItem>
                    </div>
                  </div>

                  {/* More Categories Section */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2 px-2">More Categories</h4>
                    <div className="space-y-1">
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Books")}
                        className="p-2 rounded-md hover:bg-muted"
                      >
                        Books & Media
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Beauty")}
                        className="p-2 rounded-md hover:bg-muted"
                      >
                        Beauty & Personal Care
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Automotive")}
                        className="p-2 rounded-md hover:bg-muted"
                      >
                        Automotive
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCategoryClick("Health")}
                        className="p-2 rounded-md hover:bg-muted"
                      >
                        Health & Wellness
                      </DropdownMenuItem>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Account */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-semibold">
                    Hello, {user.name.split(" ")[0]}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Your Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => router.push("/profile?tab=orders")}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Your Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => router.push("/profile?tab=wishlist")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Your Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => router.push("/profile?tab=addresses")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Your Addresses
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-muted/50 transition-colors">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    Welcome to AmazonClone
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => router.push("/auth/signin")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => router.push("/auth/signup")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Create Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    Demo Account: demo@example.com / password123
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
