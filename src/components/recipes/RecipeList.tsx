import RecipeCard from '@/components/recipes/RecipeCard'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { useRecipes } from '@/hooks/useRecipes'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IRecipeListProps {}

const RecipeList: React.FunctionComponent<IRecipeListProps> = () => {
  const { recipes, loading, error } = useRecipes()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">Något gick fel: {error.message}</div>
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-xl font-semibold mb-2">Du har inga sparade recept ännu</h2>
        <p className="text-muted-foreground">Skapa ett nytt recept för att komma igång!</p>
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
