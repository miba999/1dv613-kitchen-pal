import * as React from 'react'
import RecipeDetail from '@/components/recipes/RecipeDetail'
import BackButton from '@/components/recipes/form/BackButton'

const RecipeDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card shadow-md px-4 sm:px-6 py-4 relative">
          <BackButton to="/recipes" label="Tillbaka till alla recept" />
          <RecipeDetail />
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailPage
