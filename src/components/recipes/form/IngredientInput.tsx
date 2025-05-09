import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'
import { Ingredient } from '@/types/recipe'

interface IngredientInputProps {
  ingredients: Ingredient[]
  setIngredients: (ings: Ingredient[]) => void
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [draft, setDraft] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  // Regex to extract quantity + unit + name
  const parseIngredient = (raw: string): Ingredient => {
    const pattern = /^(\d+(?:[.,]\d+)?)\s*(\w+)?\s+(.+)$/i
    const match = raw.trim().match(pattern)

    if (!match) return { name: raw.trim() }

    return {
      quantity: parseFloat(match[1].replace(',', '.')),
      unit: match[2] || '',
      name: match[3],
    }
  }

  const handleAdd = () => {
    if (!draft.trim()) return

    const parsed = parseIngredient(draft)

    setIngredients([...ingredients, parsed])
    setDraft('')
  }

  const handleUpdate = (index: number, value: string) => {
    const updated = [...ingredients]
    updated[index] = parseIngredient(value)
    setIngredients(updated)
    setEditingIndex(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index?: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (index !== undefined) {
        handleUpdate(index, (e.target as HTMLInputElement).value)
      } else {
        handleAdd()
      }
    }
  }

  const handleRemove = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index)
    setIngredients(updated)
  }

  const formatIngredient = (ing: Ingredient) => {
    const qty = ing.quantity ? `${ing.quantity}${ing.unit ? ' ' + ing.unit : ''}` : ''

    return (
      <>
        {qty && <strong>{qty}</strong>}
        {qty && ' '}
        {ing.name}
      </>
    )
  }

  return (
    <div className="space-y-2">
      <Label className="text-lg">Ingredienser</Label>

      {ingredients.length > 0 && (
        <div className="space-y-1">
          {ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b py-1 px-1 hover:bg-muted/40 transition-colors"
            >
              {editingIndex === index ? (
                <Input
                  defaultValue={`${ing.quantity ?? ''} ${ing.unit ?? ''} ${ing.name}`.trim()}
                  autoFocus
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onBlur={(e) => handleUpdate(index, e.target.value)}
                />
              ) : (
                <div
                  onClick={() => setEditingIndex(index)}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {formatIngredient(ing)}
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                type="button"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div>
        <Input
          placeholder="Skriv ingrediens, t.ex. 2 dl mjölk"
          className="bg-muted"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p className="text-sm text-muted-foreground mt-1">
          Exempel: <i>2 dl mjölk</i>, <i>smör till stekning</i>. Tryck Enter för att lägga till.
        </p>
      </div>
    </div>
  )
}

export default IngredientInput
