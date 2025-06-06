import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addRecipe } from '@/firebase/recipeService'
import RecipeForm from '@/components/recipes/RecipeForm'
import { NewRecipe } from '@/types/newRecipe'
import { toast } from 'sonner'
import BackButton from '@/components/recipes/form/BackButton'

const RecipeNew: React.FC = () => {
  const navigate = useNavigate()

  const handleCreate = async (data: NewRecipe, imageFile?: File): Promise<void> => {
    try {
      const id = await addRecipe(data, imageFile)
      toast.success('Receptet har sparats!')
      navigate(`/recipes/${id}`)
    } catch (error) {
      console.error('Fel vid sparande av recept:', error)
      toast.error('Något gick fel. Försök igen.')
    }
  }

  return (
    <div className="min-h-screen bg-muted py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card shadow-md p-6 relative">
          <BackButton label="Avbryt" />
          <RecipeForm onSubmit={handleCreate} mode="create" />
        </div>
      </div>
    </div>
  )
}

export default RecipeNew
