import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Ingredient } from '@/types/recipe'
import { NewRecipe } from '@/types/newRecipe'
import { IngredientsSection } from './form/IngredientsSection'
import TitleInput from './form/TitleInput'
import DescriptionInput from './form/DescriptionInput'

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
  const [diet, setDiet] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [steps, setSteps] = useState([''])
  const [ingredients, setIngredients] = useState<Ingredient[]>([defaultIngredient])
  const [imageFile, setImageFile] = useState<File | undefined>()

  const handleAddStep = () => setSteps([...steps, ''])
  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps]
    updated[index] = value
    setSteps(updated)
  }

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const recipe: NewRecipe = {
      title,
      description,
      portions,
      cookTime,
      diet: diet || undefined,
      tags: tags.length > 0 ? tags : undefined,
      ingredients,
      steps,
    }

    onSubmit(recipe, imageFile)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto pl-4 pr-4">
      <h1 className="text-2xl font-bold">Skapa nytt recept</h1>

      <TitleInput value={title} onChange={setTitle} />

      <DescriptionInput value={description} onChange={setDescription} />


      <div className="flex gap-4 mt-8">
        <Button variant="outline">Lägg till recept</Button>
        <Button variant="secondary">Ändra recept</Button>
      </div>

      <div className="flex gap-4">
        <div>
          <Label>Portioner</Label>
          <Input
            type="number"
            value={portions}
            onChange={(e) => setPortions(+e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Tillagningstid (min)</Label>
          <Input
            type="number"
            value={cookTime}
            onChange={(e) => setCookTime(+e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label>Kosthållning (valfritt)</Label>
        <Input value={diet} onChange={(e) => setDiet(e.target.value)} />
      </div>

      {/* Tags */}
      <div>
        <Label>Taggar</Label>
        <div className="flex gap-2">
          <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
          <Button type="button" onClick={handleAddTag}>
            Lägg till
          </Button>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-200 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Image */}
      <div>
        <Label>Bild</Label>
        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0])} />
      </div>

      {/* Ingredients */}
      <IngredientsSection ingredients={ingredients} setIngredients={setIngredients} />

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
