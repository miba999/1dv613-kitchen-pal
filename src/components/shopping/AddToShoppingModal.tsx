// src/components/shopping/AddToShoppingModal.tsx
import { useState } from 'react'
import { ShoppingListItem } from '@/types/shoppingList'
import { useShoppingListStore } from '@/store/useShoppingListStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthUser } from '@/hooks/useAuthUser'

interface AddToShoppingModalProps {
  open: boolean
  onClose: () => void
  ingredients: ShoppingListItem[] // from selected recipe
}

export const AddToShoppingModal = ({ open, onClose, ingredients }: AddToShoppingModalProps) => {
  const [selected, setSelected] = useState<boolean[]>(ingredients.map(() => true))
  const { user } = useAuthUser()
  const addItems = useShoppingListStore((state) => state.addItems)

  const handleToggle = (index: number) => {
    const updated = [...selected]
    updated[index] = !updated[index]
    setSelected(updated)
  }

  const handleAdd = async () => {
    const itemsToAdd = ingredients.filter((_, i) => selected[i])

    if (user?.uid) {
      await addItems(itemsToAdd, user.uid)
    }

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Ingredients to Shopping List</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {ingredients.map((item, i) => (
            <label key={i} className="flex items-center space-x-2">
              <Checkbox checked={selected[i]} onCheckedChange={() => handleToggle(i)} />
              <span>
                {item.quantity} {item.unit} {item.name}
              </span>
            </label>
          ))}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Selected</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
