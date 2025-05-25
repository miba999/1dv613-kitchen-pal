import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingListItem } from '@/types/shoppingList'
import { useShoppingListStore } from '@/store/useShoppingListStore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthUser } from '@/hooks/useAuthUser'

interface AddToShoppingModalProps {
  open: boolean
  onClose: () => void
  ingredients: ShoppingListItem[] // from selected recipe
  portions: number
}

export const AddToShoppingModal = ({
  open,
  onClose,
  ingredients,
  portions,
}: AddToShoppingModalProps) => {
  const [selected, setSelected] = useState<boolean[]>(ingredients.map(() => true))
  const { user } = useAuthUser()
  const addItems = useShoppingListStore((state) => state.addItems)

  const handleToggle = (index: number) => {
    const updated = [...selected]
    updated[index] = !updated[index]
    setSelected(updated)
  }

  const navigate = useNavigate()

  const handleAdd = async () => {
    const itemsToAdd = ingredients.filter((_, i) => selected[i])

    if (user?.uid && itemsToAdd.length > 0) {
      await addItems(itemsToAdd, user.uid)

      toast.success('Ingredienser tillagda', {
        description: (
          <span className="text-muted-foreground text-sm">
            {itemsToAdd.length} ingrediens{itemsToAdd.length > 1 ? 'er' : ''} har lagts till i din
            inköpslista.
          </span>
        ),
        action: {
          label: 'Visa lista',
          onClick: () => navigate('/shopping-list'),
        },
        duration: 5000,
        icon: '🛒',
      })
    }

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lägg till ingredienser</DialogTitle>
          <DialogDescription>För {portions} portioner.</DialogDescription>
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
            Avbryt
          </Button>
          <Button onClick={handleAdd}>Lägg till valda</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
