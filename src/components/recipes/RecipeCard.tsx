import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { List } from 'lucide-react'
import { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const ingredientCount = recipe.ingredients?.length ?? 0
  const fallbackImage = '/images/recipe-fallback.png'
  const imageUrl = recipe.imageUrl || fallbackImage

  return (
    <Card className="w-full max-w-xs hover:shadow-md transition-shadow overflow-hidden">
      <Link to={`/recipes/${recipe.id}`}>
        <div className="p-4 pt-0">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="object-cover rounded-md w-full h-40"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-lg">{recipe.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {recipe.description && (
            <p
              className="text-sm text-muted-foreground line-clamp-3"
              title={recipe.description}
            >
              {recipe.description}
            </p>
          )}

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

        {recipe.tags && recipe.tags.length > 0 && (
          <CardFooter className="flex gap-2 flex-wrap pt-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Link>
    </Card>
  )
}

export default RecipeCard
