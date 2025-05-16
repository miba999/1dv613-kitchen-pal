import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { NewRecipe } from '@/types/newRecipe'

import RecipeForm from '@/components/recipes/RecipeForm'
import { toast } from 'sonner'
import { getRecipeById } from '@/firebase/recipeService'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { updateRecipe } from '@/firebase/recipeService'

const RecipeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [recipeData, setRecipeData] = useState<NewRecipe | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch the recipe data when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return

      try {
        const data = await getRecipeById(id)

        if (data) {
          setRecipeData(data)
        } else {
          toast.error('Receptet hittades inte.')
        }
      } catch (error) {
        console.error('Error fetching recipe:', error)
        toast.error('Något gick fel. Försök igen.')
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [id])

  // Handle form submission
  // This function will be called when the form is submitted
  // It receives the updated recipe data and an optional image file
  const handleUpdate = async (updatedData: NewRecipe, imageFile?: File) => {
    if (!id) {
      console.error('Missing recipe ID')

      return
    }

    try {
      await updateRecipe(id, updatedData, imageFile)
      navigate(`/recipes/${id}`)
      toast.success('Receptet har uppdaterats!')
    } catch (error) {
      console.error('Error updating recipe:', error)
      // Show error message
      toast.error('Något gick fel. Försök igen.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={40} />
      </div>
    )
  }

  if (!recipeData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted-foreground">Receptet hittades inte.</p>
      </div>
    )
  }

  return <RecipeForm mode="edit" initialData={recipeData} onSubmit={handleUpdate} />
}

export default RecipeEdit
