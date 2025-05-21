import { useShoppingListStore } from '@/store/useShoppingListStore'
import { useAuthUser } from '@/hooks/useAuthUser'
import ShoppingListItemRow from '@/components/shopping/ShoppingListItemRow'

export default function ShoppingListView() {
  const { user } = useAuthUser()
  const items = useShoppingListStore((state) => state.items)

  if (!items.length) {
    return <p className="text-gray-500">Din inköpslista är tom</p>
  }

  if (!user?.uid) {
    return <p className="text-gray-500">Logga in för att hantera din inköpslista.</p>
  }

  return (
    <ul className="space-y-3">
      {[...items]
        .sort((a, b) => Number(a.checked) - Number(b.checked))
        .map((item) => {
          const index = items.findIndex((i) => i === item)
          
          return <ShoppingListItemRow key={index} item={item} index={index} />
        })}
    </ul>
  )
}
