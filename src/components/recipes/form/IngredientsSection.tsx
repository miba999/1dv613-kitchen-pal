import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Ingredient } from '@/types/recipe'
import { Trash2, Plus } from 'lucide-react'

interface IngredientsSectionProps {
  ingredients: Ingredient[]
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
  setIngredients,
}) => {
  const handleChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients]
    updated[index] = {
      ...updated[index],
      [field]: field === 'quantity' ? Number(value) : value,
    }
    setIngredients(updated)
  }

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0, unit: '', note: '' }])
  }

  const handleRemoveIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index)
    setIngredients(updated)
  }

  return (
    <div className="space-y-4">
      <Label className="text-lg">Ingredienser</Label>

      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-3 items-center"
        >
          <Input
            type="number"
            className="bg-transparent focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Mängd"
            value={ingredient.quantity}
            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
          />
          <Input
            className="bg-transparent border-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Enhet"
            value={ingredient.unit || ''}
            onChange={(e) => handleChange(index, 'unit', e.target.value)}
          />
          <Input
            className="bg-transparent border-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Namn"
            value={ingredient.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Input
              className="bg-transparent border-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="Kommentar"
              value={ingredient.note || ''}
              onChange={(e) => handleChange(index, 'note', e.target.value)}
            />
            {ingredients.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveIngredient(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddIngredient}>
        <Plus className="mr-2 h-4 w-4" />
        Lägg till ingrediens
      </Button>
    </div>
  )
}
