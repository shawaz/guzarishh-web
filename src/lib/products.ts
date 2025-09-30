export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  images?: string[]
  rating: number
  reviews: number
  category: 'Casual' | 'Festive' | 'Office'
  description?: string
  size?: string
  colors?: string[]
  inStock?: boolean
  stockQuantity?: number
  tags?: string[]
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

export const products: Product[] = []

export const getProductsByCategory = (category: 'Casual' | 'Festive' | 'Office') => {
  return products.filter(product => product.category === category)
}

export const getProductById = (id: number) => {
  return products.find(product => product.id === id)
}