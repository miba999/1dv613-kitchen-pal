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
  initialData?: NewRecipe
  mode?: 'create' | 'edit'
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, initialData, mode = 'create' }) => {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [portions, setPortions] = useState(initialData?.portions ?? 4)
  const [cookTime, setCookTime] = useState(initialData?.cookTime ?? 30)
  const [diets, setDiets] = useState<string[]>(initialData?.diets ?? [])
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? [])
  const [steps, setSteps] = useState<string[]>(initialData?.steps ?? [''])
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialData?.ingredients ?? [])
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)

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

      onSubmit(recipe, imageFile)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto pt-8 px-4">
      <h1 className="text-2xl font-bold">
        {mode === 'edit' ? 'Redigera recept' : 'Skapa nytt recept'}
      </h1>

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
            <LoadingSpinner size={16} />
            {mode === 'edit' ? 'Sparar ändringar...' : 'Sparar...'}
          </div>
        ) : mode === 'edit' ? (
          'Spara ändringar'
        ) : (
          'Spara recept'
        )}
      </Button>
    </form>
  )
}

export default RecipeForm
