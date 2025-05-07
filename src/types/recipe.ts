export interface Ingredient {
  name: string
  quantity: number
  unit?: string
  note?: string
}

export interface Recipe {
  id?: string // Firestore ID (optional when creating)
  title: string
  description: string
  portions: number
  cookTime: number // in minutes
  diets?: string[] // e.g. "vegetarisk", "vegan"
  ingredients: Ingredient[]
  steps: string[]
  tags?: string[]
  imageUrl?: string
  createdBy: string
  createdAt: Date
  notes?: string
}
