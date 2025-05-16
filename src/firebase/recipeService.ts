import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
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

    if (!imageUrl) {
      throw new Error('Failed to upload image')
    }
  }

  const recipeToSave = {
    ...data,
    imageUrl,
    createdAt: serverTimestamp(),
    createdBy: user.uid,
  }

  // Remove undefined properties
  const cleanedData = Object.fromEntries(
    Object.entries(recipeToSave).filter(([, value]) => value !== undefined)
  )

  const docRef = await addDoc(recipesRef, cleanedData)

  return docRef.id
}

// UPDATE a recipe
export const updateRecipe = async (
  id: string,
  updatedData: NewRecipe,
  newImageFile?: File
): Promise<void> => {
  const user = auth.currentUser

  if (!user) throw new Error('User not authenticated')

  let imageUrl = updatedData.imageUrl // Keep old image unless a new one is provided

  if (newImageFile) {
    imageUrl = await uploadRecipeImage(newImageFile, user.uid)

    if (!imageUrl) {
      throw new Error('Failed to upload image')
    }
  }

  const updatedRecipe = {
    ...updatedData,
    imageUrl,
    updatedAt: serverTimestamp(),
  }

  // Remove undefined properties
  const cleanedData = Object.fromEntries(
    Object.entries(updatedRecipe).filter(([, value]) => value !== undefined)
  )

  await updateDoc(doc(recipesRef, id), cleanedData)
}

// ... (delete, etc.)
