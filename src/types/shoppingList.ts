import { Ingredient } from '@/types/recipe'

export interface ShoppingListItem extends Ingredient {
  checked?: boolean
}