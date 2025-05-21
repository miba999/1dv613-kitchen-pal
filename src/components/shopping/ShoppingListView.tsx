// src/components/shopping/ShoppingListView.tsx
import { useShoppingListStore } from '@/store/useShoppingListStore'
import { useAuthUser } from '@/hooks/useAuthUser' // assuming auth context
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from 'lucide-react'

export default function ShoppingListView() {
  const { user } = useAuthUser()
  const items = useShoppingListStore((state) => state.items)
  const toggleChecked = useShoppingListStore((state) => state.toggleChecked)
  const removeItem = useShoppingListStore((state) => state.removeItem)

  if (!items.length) {
    return <p className="text-gray-500">Your shopping list is empty.</p>
  }

  if (!user?.uid) {
    return <p className="text-gray-500">Logga in för att hantera din inköpslista.</p>
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-between bg-white shadow rounded-xl px-4 py-2"
        >
          <label className="flex items-center gap-3 flex-1 cursor-pointer">
            <Checkbox
              checked={!!item.checked}
              onCheckedChange={() => toggleChecked(index, user.uid)}
            />
            <span className={item.checked ? 'line-through text-gray-400' : ''}>
              {typeof item.quantity === 'number' && item.quantity > 0
                ? `${item.quantity} ${item.unit ?? ''} `
                : ''}
              {item.name}
            </span>
          </label>
          <Button variant="ghost" size="icon" onClick={() => removeItem(index, user.uid)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </li>
      ))}
    </ul>
  )
}
