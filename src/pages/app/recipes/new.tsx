import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addRecipe } from '@/firebase/recipeService'
import RecipeForm from '@/components/recipes/form/RecipeForm'
import { NewRecipe } from '@/types/newRecipe'
import { toast } from 'sonner'

const RecipeNew: React.FC = () => {
  const navigate = useNavigate()

  const handleCreate = async (data: NewRecipe) => {
    try {
      const id = await addRecipe(data)
      toast.success('Receptet har sparats!')
      navigate(`/recipes/${id}`)
    } catch (error) {
      console.error('Fel vid sparande av recept:', error)
      toast.error('Något gick fel. Försök igen.')
    }
  }

  return (
    <div className="min-h-screen bg-muted py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Skapa nytt recept</h1>

        <div className="rounded-lg border bg-card shadow-md p-6">
          <RecipeForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  )
}

export default RecipeNew
