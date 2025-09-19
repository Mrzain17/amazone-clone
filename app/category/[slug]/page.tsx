import { redirect } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Redirect to search page with category filter
  const categoryName = params.slug.replace("-", " & ")
  redirect(`/search?category=${encodeURIComponent(categoryName)}`)
}
