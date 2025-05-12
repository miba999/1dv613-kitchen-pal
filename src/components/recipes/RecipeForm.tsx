import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Ingredient } from '@/types/recipe'
import { NewRecipe } from '@/types/newRecipe'
import IngredientInput from '@/components/recipes/form/IngredientInput'
import DietCheckboxGroup from '@/components/recipes/form/DietCheckboxGroup'
import TitleInput from '@/components/recipes/form/TitleInput'
import DescriptionInput from '@/components/recipes/form/DescriptionInput'
import CookTimeInput from '@/components/recipes/form/CookTimeInput'
import PortionsInput from '@/components/recipes/form/PortionsInput'
import TagsInput from '@/components/recipes/form/TagsInput'
import ImageUpload from '@/components/recipes/form/ImageUpload'
import LoadingSpinner from '@/components/ui/loading-spinner'
import InstructionsInput from '@/components/recipes/form/InstructionsInput'

interface RecipeFormProps {
  onSubmit: (data: NewRecipe, imageFile?: File) => void
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [portions, setPortions] = useState(4)
  const [cookTime, setCookTime] = useState(30)
  const [diets, setDiets] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [steps, setSteps] = useState([''])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [imageFile, setImageFile] = useState<File | undefined>()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const recipe: NewRecipe = {
        title,
        description,
        portions,
        cookTime,
        diets: diets.length > 0 ? diets : undefined,
        tags: tags.length > 0 ? tags : undefined,
        ingredients,
        steps,
      }

      await onSubmit(recipe, imageFile)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto pt-8 px-4">
      <h1 className="text-2xl font-bold">Skapa nytt recept</h1>

      <TitleInput value={title} onChange={setTitle} />

      <DescriptionInput value={description} onChange={setDescription} />

      <div className="grid gap-4 md:grid-cols-2">
        <PortionsInput value={portions} onChange={setPortions} />
        <CookTimeInput value={cookTime} onChange={setCookTime} />
      </div>

      <DietCheckboxGroup selected={diets} onChange={setDiets} />

      <TagsInput tags={tags} setTags={setTags} />

      <ImageUpload imageFile={imageFile} setImageFile={setImageFile} />

      <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />

      <InstructionsInput steps={steps} setSteps={setSteps} />

      <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size={16} /> Sparar...
          </div>
        ) : (
          'Spara recept'
        )}
      </Button>
    </form>
  )
}

export default RecipeForm
