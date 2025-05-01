import { useEffect, useState } from 'react'
import { getRecipeById } from '@/firebase/recipeService'
import { Recipe } from '@/types/recipe'

export const useRecipe = (id?: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id)
        setRecipe(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  return { recipe, loading, error }
}
