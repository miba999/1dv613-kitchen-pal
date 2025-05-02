import { collection, getDocs, getDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore'
import { query, where } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { Recipe } from '@/types/recipe'
import { auth } from './firebaseConfig'
import { NewRecipe } from '@/types/newRecipe'
import { uploadRecipeImage } from './storageService'

const recipesRef = collection(db, 'recipes')

// GET all recipes
export const getAllRecipes = async (): Promise<Recipe[]> => {
  const user = auth.currentUser

  if (!user) throw new Error('User not authenticated')

  const q = query(recipesRef, where('createdBy', '==', user.uid))
  const snapshot = await getDocs(q)

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

// ADD a new recipe
export const addRecipe = async (data: NewRecipe, imageFile?: File): Promise<string> => {
  const user = auth.currentUser

  if (!user) throw new Error('User not authenticated')

  let imageUrl: string | undefined

  if (imageFile) {
    imageUrl = await uploadRecipeImage(imageFile, user.uid)
  }

  const recipeToSave = {
    ...data,
    imageUrl,
    createdAt: serverTimestamp(),
    createdBy: user.uid,
  }

  const keys = Object.keys(recipeToSave) as Array<keyof typeof recipeToSave>

  keys.forEach((key) => {
    if (recipeToSave[key] === undefined) {
      delete recipeToSave[key]
    }
  })

  const docRef = await addDoc(recipesRef, recipeToSave)

  return docRef.id
}

// ... (update, delete, etc.)
