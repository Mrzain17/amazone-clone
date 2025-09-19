"use client"

import type React from "react"

import { useState } from "react"
import { Search, ShoppingCart, User, Menu, LogOut } from "lucide-react"
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
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleCategoryClick("Electronics")}>Electronics</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick("Home & Garden")}>Home & Garden</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick("Sports")}>Sports</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick("Books")}>Books</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick("Clothing")}>Clothing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryClick("Beauty")}>Beauty</DropdownMenuItem>
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
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex items-center w-full">
                      <User className="h-4 w-4 mr-2" />
                      Your Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="flex items-center w-full">
                      Your Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/auth/signin">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/auth/signup">Sign Up</Link>
                  </DropdownMenuItem>
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
