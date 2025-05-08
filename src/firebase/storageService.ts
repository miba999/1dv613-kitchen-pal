import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
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
