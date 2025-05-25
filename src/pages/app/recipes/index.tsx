import RecipeList from '@/components/recipes/RecipeList'

const RecipesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg border bg-card shadow-md p-2 relative">
          <RecipeList />
        </div>
      </div>
    </div>
  )
}

export default RecipesPage
