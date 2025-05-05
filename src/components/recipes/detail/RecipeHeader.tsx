import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react' // If you're using lucide icons
import React from 'react'

interface RecipeHeaderProps {
  title: string
  description: string
  cookTime: number
  diet?: string
  tags?: string[]
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  description,
  cookTime,
  diet,
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

        {diet && (
          <Badge variant="secondary" className="text-sm">
            {diet}
          </Badge>
        )}
      </div>

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
