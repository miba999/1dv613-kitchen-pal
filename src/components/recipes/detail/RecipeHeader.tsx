import { Badge } from '@/components/ui/badge'

interface RecipeHeaderProps {
  title: string
  description: string
  tags?: string[]
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ title, description, tags }) => {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags?.map((tag) => (
          <Badge key={tag} variant="outline" className="text-sm">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default RecipeHeader
