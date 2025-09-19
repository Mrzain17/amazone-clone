import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
