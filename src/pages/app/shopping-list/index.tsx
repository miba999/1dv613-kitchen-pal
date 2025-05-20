import { useEffect } from 'react'
import { useAuthUser } from '@/hooks/useAuthUser'
import { useShoppingListStore } from '@/store/useShoppingListStore'
import ShoppingListView from '@/components/shopping/ShoppingListView'

const ShoppingListPage: React.FC = () => {
  const { user, loading } = useAuthUser()
  const load = useShoppingListStore((state) => state.load)

  useEffect(() => {
    if (!loading && user?.uid) {
      load(user.uid)
    }
  }, [loading, user])

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading your shopping list...</div>
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Shopping List</h1>
      <ShoppingListView />
    </div>
  )
}

export default ShoppingListPage
