import { create } from 'zustand'
import { ShoppingListItem } from '@/types/shoppingList'
import {
  getShoppingList,
  saveShoppingList,
  subscribeToShoppingList,
} from '@/firebase/shoppingService'
import { generateShoppingList } from '@/lib/shoppingUtils'

interface ShoppingListState {
  items: ShoppingListItem[]
  load: (uid: string) => Promise<void>
  unload: () => void
  addItems: (newItems: ShoppingListItem[], uid: string) => Promise<void>
  toggleChecked: (index: number, uid: string) => Promise<void>
  removeItem: (index: number, uid: string) => Promise<void>
  clear: (uid: string) => Promise<void>
}

export const useShoppingListStore = create<
  ShoppingListState & { unsubscribe: (() => void) | null }
>((set, get) => ({
  items: [],
  unsubscribe: null,

  load: async (uid) => {
    // Fetch initial data (optional fallback)
    const initial = await getShoppingList(uid)
    set({ items: initial })

    // Subscribe to live updates
    const unsub = subscribeToShoppingList(uid, (newItems) => {
      set({ items: newItems })
    })

    set({ unsubscribe: unsub })
  },

  unload: () => {
    const unsub = get().unsubscribe

    if (unsub) unsub()

    set({ items: [], unsubscribe: null })
  },

  addItems: async (newItems, uid) => {
    const current = await getShoppingList(uid) // 🔁 fetch fresh list from Firestore
    const merged = generateShoppingList(current, newItems)
    await saveShoppingList(uid, merged)
    // no need to set() — subscription will update items
  },

  toggleChecked: async (index, uid) => {
    const updated = [...get().items]
    updated[index].checked = !updated[index].checked
    await saveShoppingList(uid, updated)
  },

  removeItem: async (index, uid) => {
    const updated = [...get().items]
    updated.splice(index, 1)
    await saveShoppingList(uid, updated)
  },

  clear: async (uid) => {
    await saveShoppingList(uid, [])
  },
}))
