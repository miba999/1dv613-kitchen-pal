import { useEffect, useState } from 'react'
import { getAllRecipes } from '@/firebase/recipeService'
import RecipeCard from '@/components/recipes/RecipeCard'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { Recipe } from '@/types/recipe'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRecipeListProps {}

const RecipeList: React.FunctionComponent<IRecipeListProps> = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes()
        setRecipes(data)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Mina recept</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default RecipeList
