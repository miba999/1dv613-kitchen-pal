import * as React from 'react'
import { useParams } from 'react-router-dom'
import RecipeEdit from '@/components/recipes/RecipeEdit'
import BackButton from '@/components/recipes/form/BackButton'

const RecipeEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen bg-muted py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card shadow-md p-6 relative">
          <BackButton to={`/recipes/${id}`} label="Tillbaka till receptet" />
          <RecipeEdit />
        </div>
      </div>
    </div>
  )
}

export default RecipeEditPage
