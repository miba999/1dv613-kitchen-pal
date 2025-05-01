import { collection, getDocs } from 'firebase/firestore'
// addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp
import { db } from './firebaseConfig'
import { Recipe } from '@/types/recipe' // optional if you’re using types

const recipesRef = collection(db, 'recipes')

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const snapshot = await getDocs(recipesRef)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Recipe[]
}

// ... (add, update, delete, etc.)
