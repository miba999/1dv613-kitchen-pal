import { useEffect, useState } from 'react'
import { getAllRecipes } from '@/firebase/recipeService'
import { Recipe } from '@/types/recipe'

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes()
        setRecipes(data)
      } catch (err) {
        console.error('Error fetching recipes:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return { recipes, loading, error }
}
