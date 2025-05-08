import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Ingredient } from '@/types/recipe'
import { NewRecipe } from '@/types/newRecipe'
import { IngredientsSection } from '@/components/recipes/form/IngredientsSection'
import DietCheckboxGroup from '@/components/recipes/form/DietCheckboxGroup'
import TitleInput from '@/components/recipes/form/TitleInput'
import DescriptionInput from '@/components/recipes/form/DescriptionInput'
import CookTimeInput from '@/components/recipes/form/CookTimeInput'
import PortionsInput from '@/components/recipes/form/PortionsInput'
import TagsInput from '@/components/recipes/form/TagsInput'
import ImageUpload from '@/components/recipes/form/ImageUpload'

interface RecipeFormProps {
  onSubmit: (data: NewRecipe, imageFile?: File) => void
}

const defaultIngredient: Ingredient = {
  name: '',
  quantity: 0,
  unit: '',
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [portions, setPortions] = useState(4)
  const [cookTime, setCookTime] = useState(30)
  const [diets, setDiets] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [steps, setSteps] = useState([''])
  const [ingredients, setIngredients] = useState<Ingredient[]>([defaultIngredient])
  const [imageFile, setImageFile] = useState<File | undefined>()

  const handleAddStep = () => setSteps([...steps, ''])
  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps]
    updated[index] = value
    setSteps(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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

      {/* Ingredients */}
      <IngredientsSection ingredients={ingredients} setIngredients={setIngredients} />

      <div className="flex gap-4 mt-8">
        <Button variant="outline">Lägg till recept</Button>
        <Button variant="secondary">Ändra recept</Button>
      </div>

      {/* Steps */}
      <div>
        <Label>Gör så här</Label>
        {steps.map((step, i) => (
          <Textarea
            key={i}
            placeholder={`Steg ${i + 1}`}
            value={step}
            onChange={(e) => handleStepChange(i, e.target.value)}
            className="mb-2"
          />
        ))}
        <Button type="button" onClick={handleAddStep}>
          Lägg till steg
        </Button>
      </div>

      <Button type="submit">Spara recept</Button>
    </form>
  )
}

export default RecipeForm
