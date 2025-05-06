import { useParams } from 'react-router-dom'
import { useRecipe } from '@/hooks/useRecipe'
import LoadingSpinner from '@/components/ui/loading-spinner'
import RecipeHeader from '@/components/recipes/detail/RecipeHeader'
import RecipeImage from '@/components/recipes/detail/RecipeImage'
import IngredientsSection from '@/components/recipes/detail/IngredientsSection'
import InstructionsSection from '@/components/recipes/detail/InstructionsSection'
import { useState } from 'react'

const RecipeDetail: React.FC = () => {
  const { id } = useParams()
  const { recipe, loading } = useRecipe(id)
  const [portions, setPortions] = useState(recipe?.portions || 4)

  if (loading || !recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <LoadingSpinner size={40} />
  //     </div>
  //   )
  // }
  
  // if (!recipe) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen text-center px-4">
  //       <h2 className="text-2xl font-bold mb-2">Receptet hittades inte</h2>
  //       <p className="text-muted-foreground mb-4">Det verkar som att receptet du försöker nå inte finns eller har tagits bort.</p>
  //       <a href="/recipes" className="text-blue-600 underline">Tillbaka till mina recept</a>
  //     </div>
  //   )
  // }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Title and image in a responsive layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <RecipeHeader title={recipe.title} description={recipe.description} tags={recipe.tags} />
        <RecipeImage src={recipe.imageUrl} alt={recipe.title} />
      </div>

      <IngredientsSection
        ingredients={recipe.ingredients}
        originalPortions={recipe.portions}
        currentPortions={portions}
        setCurrentPortions={setPortions}
      />

      <InstructionsSection steps={recipe.steps} />
    </div>
  )
}

export default RecipeDetail
