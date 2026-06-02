export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  category: string
  description: string
  image: string
  price: number
  currency: string
  releaseDate: string
  specs: Record<string, string>
  scores: {
    overall: number
    gaming: number
    camera: number
    battery: number
    display: number
    value: number
  }
  pros: string[]
  cons: string[]
  affiliateUrl?: string
  stockStatus?: string
}

export type Category =
  | "smartphones"
  | "foldable-smartphones"
