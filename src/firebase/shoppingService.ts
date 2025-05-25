import { db } from './firebaseConfig'
import { ShoppingListItem } from '@/types/shoppingList'
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'

// getShoppingList
// updateShoppingList
// deleteShoppingList

/**
 * Saves the shopping list to Firestore for the given user ID.
 *
 * @param uid - Firebase user ID (used as document ID).
 * @param items - The list of items to save.
 * @returns Promise<void> - Resolves when saved, or throws an error.
 * @throws Error if the user ID is not provided or if there is an error saving the list.
 */
export const saveShoppingList = async (uid: string, items: ShoppingListItem[]): Promise<void> => {
  if (!uid) {
    throw new Error('User ID is required to save the shopping list.')
  }

  // Clean the items to remove undefined properties
  const cleanItems = items.map((item) => {
    const { name, quantity, unit, note, checked } = item

    return {
      ...(name && { name }),
      ...(quantity !== undefined && { quantity }),
      ...(unit !== undefined && { unit }),
      ...(note !== undefined && { note }),
      ...(checked !== undefined && { checked }),
    }
  })

  try {
    const docRef = doc(db, 'shoppingLists', uid)

    await setDoc(docRef, {
      createdBy: uid,
      updatedAt: serverTimestamp(),
      items: cleanItems,
    })
  } catch (error) {
    console.error('Error saving shopping list:', error)
    throw new Error('Failed to save shopping list. Please try again.')
  }
}

/**
 * Retrieves the shopping list for the given user ID from Firestore.
 *
 * @param uid - Firebase user ID (used as document ID).
 * @returns Promise<ShoppingListItem[]> - The shopping list items, or an empty array if not found.
 * @throws Error if the user ID is not provided or if there is an error fetching the list.
 */
export const getShoppingList = async (uid: string): Promise<ShoppingListItem[]> => {
  if (!uid) throw new Error('User ID is required to get the shopping list.')

  try {
    const docRef = doc(db, 'shoppingLists', uid)

    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) return []

    return snapshot.data().items || []
  } catch (error) {
    console.error('Error loading shopping list:', error)
    throw new Error('Failed to load shopping list.')
  }
}

/**
 * Subscribes to live updates of the shopping list for the given user ID.
 *
 * @param uid - Firebase user ID (used as document ID).
 * @param onUpdate - Callback function to handle updates to the shopping list.
 * @returns Unsubscribe function to stop listening for updates.
 */
export const subscribeToShoppingList = (
  uid: string,
  onUpdate: (items: ShoppingListItem[]) => void
) => {
  const docRef = doc(db, 'shoppingLists', uid)

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (!snapshot.exists()) return onUpdate([])

      const data = snapshot.data()
      onUpdate(data.items || [])
    },
    (error) => {
      console.error('Live update error:', error)
    }
  )
}
