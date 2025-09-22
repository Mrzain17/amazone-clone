import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold text-balance mb-6">Find Everything You Need</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Discover millions of products at unbeatable prices. Fast shipping, easy returns, and exceptional customer
            service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="sm" className="text-lg px-8">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="sm" variant="outline" className="text-lg px-8 bg-transparent">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
