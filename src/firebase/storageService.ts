import { deleteObject, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebaseConfig'

/**
 * Upload an image to Firebase Storage and return the download URL.
 * @param file The image file to upload
 * @param userId The UID of the current user (used for folder pathing)
 * @returns The public URL of the uploaded image
 */
export const uploadRecipeImage = async (file: File, userId: string): Promise<string> => {
  if (!file) {
    console.error('uploadRecipeImage error: No file provided')
    throw new Error('No file provided')
  }

  if (!userId) {
    console.error('uploadRecipeImage error: No user ID provided')
    throw new Error('User ID is required for storage pathing')
  }

  try {
    // Sanitize filename
    const safeName = file.name.replace(/\s+/g, '_')
    const timestamp = Date.now()
    const filePath = `recipes/${userId}/${timestamp}_${safeName}`

    const fileRef = ref(storage, filePath)

    // Upload file
    await uploadBytes(fileRef, file)

    // Get public URL
    const downloadURL = await getDownloadURL(fileRef)

    return downloadURL
  } catch (error) {
    console.error('uploadRecipeImage failed:', error)
    throw new Error('Failed to upload image. Try again later.')
  }
}

/**
 * Helper to extract storage path from a Firebase public download URL.
 * @param url The public download URL
 * @returns The decoded storage path (e.g., recipes/userId/image.jpg)
 */
const getStoragePathFromUrl = (url: string): string => {
  const match = url.match(/\/o\/(.*?)\?/)

  if (!match || !match[1]) throw new Error('Could not extract storage path from URL')

  return decodeURIComponent(match[1])
}

/**
 * Delete an image from Firebase Storage based on its download URL.
 * @param imageUrl The public URL of the image to delete
 */
export const deleteRecipeImage = async (imageUrl: string, userId: string): Promise<void> => {
  if (!imageUrl || !userId) throw new Error('Missing image URL or user ID')

  try {
    const storagePath = getStoragePathFromUrl(imageUrl)

    if (!storagePath.startsWith(`recipes/${userId}/`)) {
      throw new Error('Image path does not match current user')
    }

    const imageRef = ref(storage, storagePath)
    await deleteObject(imageRef)
  } catch (error) {
    console.error('deleteRecipeImage failed:', error)
    throw new Error('Failed to delete image. Try again later.')
  }
}

