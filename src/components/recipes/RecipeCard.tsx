import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, List, ShoppingCart } from 'lucide-react'
import { Recipe } from '@/types/recipe'
import { AddToShoppingModal } from '@/components/shopping/AddToShoppingModal'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const fallbackImage = '/images/recipe-fallback.png'
  const imageUrl = recipe.imageUrl || fallbackImage
  const ingredientCount = recipe.ingredients?.length ?? 0

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Prevent opening the modal if there are no ingredients
    if (ingredientCount > 0) {
      setModalOpen(true)
    }
  }

  return (
    <>
      <Link to={`/recipes/${recipe.id}`} className="block w-full max-w-xs">
        <Card className="hover:shadow-md transition-shadow overflow-hidden relative group cursor-pointer gap-3">
          <div className="px-6 pb-0 pt-0">
            <img
              src={imageUrl}
              alt={recipe.title}
              className="object-cover rounded-md w-full h-50"
            />
          </div>

          <CardHeader>
            <CardTitle className="text-lg">{recipe.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookTime} min</span>
              </div>

              <div className="flex items-center gap-1">
                <List className="w-4 h-4" />
                <span>{ingredientCount} ingredienser</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center pt-1">
            <div className="flex gap-2 flex-wrap">
              {recipe.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded transition z-10 hover:bg-muted hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={openModal}
                  aria-label="Add ingredients to shopping list"
                  disabled={ingredientCount === 0}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Lägg till ingredienser i inköpslista</TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>
      </Link>

      {recipe.ingredients && (
        <AddToShoppingModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          ingredients={recipe.ingredients}
          portions={recipe.portions}
        />
      )}
    </>
  )
}

export default RecipeCard
