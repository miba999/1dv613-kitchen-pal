import { useParams, Navigate, Link } from 'react-router-dom'
import { useRecipe } from '@/hooks/useRecipe'
import { useAuthUser } from '@/hooks/useAuthUser'
import LoadingSpinner from '@/components/ui/loading-spinner'
import RecipeHeader from '@/components/recipes/detail/RecipeHeader'
import RecipeImage from '@/components/recipes/detail/RecipeImage'
import IngredientsSection from '@/components/recipes/detail/IngredientsSection'
import InstructionsSection from '@/components/recipes/detail/InstructionsSection'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

const RecipeDetail: React.FC = () => {
  const { id } = useParams()
  const { user } = useAuthUser()
  const { recipe, loading } = useRecipe(id)
  const [portions, setPortions] = useState(recipe?.portions || 4)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted-foreground">Receptet hittades inte.</p>
      </div>
    )
  }

  if (user?.uid !== recipe.createdBy) {
    return <Navigate to="/not-found" />
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8 space-y-6">
      <div className="flex justify-end">
        <Link to={`/recipes/${recipe.id}/edit`}>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Pencil className="w-4 h-4" />
            Redigera
          </Button>
        </Link>
      </div>
      {/* Title and image in a responsive layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
        <div className="flex-1 space-y-2">
          <RecipeHeader
            title={recipe.title}
            description={recipe.description}
            cookTime={recipe.cookTime}
            diets={recipe.diets}
            tags={recipe.tags}
          />
        </div>

        <RecipeImage src={recipe.imageUrl} alt={recipe.title} />
      </div>

      <IngredientsSection
        ingredients={recipe.ingredients}
        originalPortions={recipe.portions}
        currentPortions={portions}
        setCurrentPortions={setPortions}
      />

      <InstructionsSection steps={recipe.steps} />

      {recipe.notes && (
        <div className="bg-muted p-4 rounded-md border space-y-2">
          <h2 className="text-xl font-semibold">Kommentar</h2>
          <p className="text-muted-foreground whitespace-pre-line">{recipe.notes}</p>
        </div>
      )}
    </div>
  )
}

export default RecipeDetail
