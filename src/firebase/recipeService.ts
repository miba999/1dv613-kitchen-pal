import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { Recipe } from '@/types/recipe'

const recipesRef = collection(db, 'recipes')

// GET all recipes
export const getAllRecipes = async (): Promise<Recipe[]> => {
  const snapshot = await getDocs(recipesRef)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Recipe, 'id'>),
  }))
}

// GET a recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const docSnap = await getDoc(doc(recipesRef, id))

  if (!docSnap.exists()) return null

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<Recipe, 'id'>),
  }
}

// ... (add, update, delete, etc.)
