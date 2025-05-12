import { useState, useRef } from 'react'
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

  const inputRef = useRef<HTMLInputElement>(null)

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

    // Auto-focus the input again
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
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
    <div className="space-y-3">
      <div>
        <Label className="text-lg">Ingredienser</Label>
        {ingredients.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            ✏️ Klicka för att redigera eller ta bort ingredienser.
          </p>
        )}
      </div>

      <ul className="space-y-2">
        {ingredients.map((ing, index) => (
          <li
            key={index}
            className="group flex items-center justify-between border rounded-md px-3 py-1 hover:bg-muted/30 transition"
          >
            {editingIndex === index ? (
              <Input
                defaultValue={`${ing.quantity ?? ''} ${ing.unit ?? ''} ${ing.name}`.trim()}
                autoFocus
                onKeyDown={(e) => handleKeyDown(e, index)}
                onBlur={(e) => handleUpdate(index, e.target.value)}
                className="flex-1 border-none shadow-none p-0 focus-visible:ring-0 text-sm"
              />
            ) : (
              <span
                onClick={() => setEditingIndex(index)}
                className="cursor-pointer text-sm flex-1"
              >
                {formatIngredient(ing)}
              </span>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity"
              type="button"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </li>
        ))}
      </ul>

      <div>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Skriv ingrediens, t.ex. 2 dl mjölk"
            className="bg-muted flex-1"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" variant="outline" onClick={handleAdd}>
            Lägg till
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-1">
          Exempel: <i>2 dl mjölk</i>, <i>smör till stekning</i>. Tryck Enter för att lägga till.
        </p>
      </div>
    </div>
  )
}

export default IngredientInput
