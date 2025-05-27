import { useEffect } from 'react'
import { useAuthUser } from '@/hooks/useAuthUser'
import { useShoppingListStore } from '@/store/useShoppingListStore'
import ShoppingList from '@/components/shopping/ShoppingListView'

const ShoppingListPage: React.FC = () => {
  const { user, loading } = useAuthUser()
  const load = useShoppingListStore((state) => state.load)
  const unload = useShoppingListStore((state) => state.unload)

  useEffect(() => {
    if (!loading && user?.uid) {
      load(user.uid)

      return () => {
        unload()
      }
    }
  }, [loading, user?.uid, load, unload])

  if (loading) {
    return <div className="text-center text-muted-foreground">Laddar din inköpslista...</div>
  }

  return (
    <div className="min-h-screen bg-muted py-4 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border bg-card shadow-md p-6 relative">
          <h1 className="text-2xl font-bold mb-4">🛒 Inköpslista</h1>
          <ShoppingList />
        </div>
      </div>
    </div>
  )
}

export default ShoppingListPage
