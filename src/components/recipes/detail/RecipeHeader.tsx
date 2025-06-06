import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import React from 'react'

interface RecipeHeaderProps {
  title: string
  description: string
  cookTime: number
  diets?: string[]
  tags?: string[]
}

const dietOptions = [
  { label: 'vegansk', value: 'vegan', emoji: '🌱' },
  { label: 'vegetarisk', value: 'vegetarian', emoji: '🥦' },
  { label: 'glutenfri', value: 'gluten-free', emoji: '🚫🌾' },
  { label: 'laktosfri', value: 'lactose-free', emoji: '🥛❌' },
  { label: 'keto', value: 'keto', emoji: '🥩' },
  { label: 'paleo', value: 'paleo', emoji: '🍖' },
  { label: 'pescetarian', value: 'pescatarian', emoji: '🐟' },
]

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  description,
  cookTime,
  diets,
  tags,
}) => {
  return (
    <div className="flex-1 space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>

      <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{cookTime} min</span>
        </div>

        {/* Diets */}
        {diets && diets.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {diets.map((diet) => {
              const match = dietOptions.find((d) => d.value === diet)

              return (
                <Badge key={diet} variant="secondary" className="text-sm">
                  {match ? `${match.emoji} ${match.label}` : diet}
                </Badge>
              )
            })}
          </div>
        )}
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipeHeader
