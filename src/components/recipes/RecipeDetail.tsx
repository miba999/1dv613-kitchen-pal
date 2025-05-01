import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipe } from '@/hooks/useRecipe'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import LoadingSpinner from '@/components/ui/loading-spinner'

const RecipeDetail: React.FC = () => {
  const { id } = useParams()
  const { recipe, loading } = useRecipe(id)
  const [portions, setPortions] = useState(recipe?.portions || 4)

  const fallbackImage = '/images/recipe-fallback.png'

  if (loading || !recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  const formatQuantity = (quantity: number): string => {
    const rounded = parseFloat(quantity.toFixed(2))

    return Number.isInteger(rounded) ? rounded.toString() : rounded.toString().replace('.', ',')
  }

  const scale = portions / recipe.portions

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Title and image in a responsive layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Textual info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="text-muted-foreground mt-1">{recipe.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {recipe.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-64 flex-shrink-0">
          <img
            src={recipe.imageUrl || fallbackImage}
            alt={recipe.title}
            className="rounded-lg object-cover w-full aspect-[4/3]"
          />
        </div>
      </div>

      {/* Portion adjustment */}
      <div className="flex items-center gap-4">
        <span className="font-medium">Antal portioner:</span>
        <input
          type="number"
          min={1}
          value={portions}
          onChange={(e) => setPortions(Number(e.target.value))}
          className="w-16 border rounded px-2 py-1"
        />
      </div>

      {/* Ingredients */}
      <Card className="p-4 gap-4">
        <h2 className="text-xl font-semibold mb-0">Ingredienser</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>
              {formatQuantity(ing.quantity * scale)} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>
      </Card>

      {/* Instructions */}
      <Card className="p-4 gap-4">
        <h2 className="text-xl font-semibold">Gör så här</h2>
        <ol className="list-decimal list-inside space-y-2">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </Card>
    </div>
  )
}

export default RecipeDetail
