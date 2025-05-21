import { useState } from 'react'
import { useAuthUser } from '@/hooks/useAuthUser'
import { useShoppingListStore } from '@/store/useShoppingListStore'
import { saveShoppingList } from '@/firebase/shoppingService'
import { ShoppingListItem } from '@/types/shoppingList'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from 'lucide-react'
import { parseIngredient, formatIngredientParts, formatIngredient } from '@/lib/ingredientParser'
import { cn } from '@/lib/utils'

interface Props {
  item: ShoppingListItem
  index: number
}

const ShoppingListItemRow: React.FC<Props> = ({ item, index }) => {
  const { user } = useAuthUser()
  const items = useShoppingListStore((s) => s.items)
  const toggleChecked = useShoppingListStore((s) => s.toggleChecked)
  const removeItem = useShoppingListStore((s) => s.removeItem)

  const [editing, setEditing] = useState(false)

  if (!user?.uid) return null

  const uid = user.uid

  const handleUpdate = (value: string) => {
    const updated = [...items]
    const parsed = parseIngredient(value)

    updated[index] = {
      ...updated[index],
      ...parsed,
    }

    saveShoppingList(uid, updated)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleUpdate((e.target as HTMLInputElement).value)
    }
  }

  return (
    <li
      className={cn(
        'group flex items-center justify-between border rounded-md px-3 py-2 bg-white transition-all duration-200 ease-in-out',
        editing ? 'bg-muted ring-1 ring-ring shadow-sm' : 'hover:bg-muted/30',
        item.checked && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <div className="mr-3 mt-0.5">
        <Checkbox checked={!!item.checked} onCheckedChange={() => toggleChecked(index, uid)} />
      </div>

      {/* Inline editing or static display */}
      {editing && !item.checked ? (
        <input
          autoFocus
          defaultValue={formatIngredient(item)}
          onKeyDown={handleKeyDown}
          onBlur={(e) => handleUpdate(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      ) : (
        <span
          onClick={() => !item.checked && setEditing(true)}
          className={cn(
            'cursor-pointer text-sm flex-1 transition-colors duration-200',
            item.checked && 'text-muted-foreground line-through'
          )}
        >
          {(() => {
            const { qty, unit, name } = formatIngredientParts(item)

            return (
              <>
                {qty && <strong>{qty}</strong>}
                {unit && <strong>{' ' + unit}</strong>}
                {name && ' ' + name}
              </>
            )
          })()}
        </span>
      )}

      {/* Delete button */}
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity"
        type="button"
        onClick={() => removeItem(index, uid)}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </li>
  )
}

export default ShoppingListItemRow
