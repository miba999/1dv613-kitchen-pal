import { create } from 'zustand'
import { ShoppingListItem } from '@/types/shoppingList'
import { getShoppingList, saveShoppingList } from '@/firebase/shoppingService'
import { generateShoppingList } from '@/lib/shoppingUtils'

interface ShoppingListState {
  items: ShoppingListItem[]
  load: (uid: string) => Promise<void>
  addItems: (newItems: ShoppingListItem[], uid: string) => Promise<void>
  toggleChecked: (index: number) => void
  removeItem: (index: number, uid: string) => Promise<void>
  clear: (uid: string) => Promise<void>
}

export const useShoppingListStore = create<ShoppingListState>((set, get) => ({
  items: [],

  load: async (uid) => {
    const items = await getShoppingList(uid)
    set({ items })
  },

  addItems: async (newItems, uid) => {
    const current = get().items
    const merged = generateShoppingList(current, newItems)
    set({ items: merged })
    await saveShoppingList(uid, merged)
  },

  toggleChecked: (index) => {
    const updated = [...get().items]
    updated[index].checked = !updated[index].checked
    set({ items: updated })
  },

  removeItem: async (index, uid) => {
    const updated = [...get().items]
    updated.splice(index, 1)
    set({ items: updated })
    await saveShoppingList(uid, updated)
  },

  clear: async (uid) => {
    set({ items: [] })
    await saveShoppingList(uid, [])
  },
}))
