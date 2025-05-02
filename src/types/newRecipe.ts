import { Recipe } from '@/types/recipe'

export type NewRecipe = Omit<Recipe, 'id' | 'createdAt' | 'createdBy'>
