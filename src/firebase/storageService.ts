
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebaseConfig'

/**
 * Upload an image to Firebase Storage and return the download URL.
 * @param file The image file to upload
 * @param userId The UID of the current user (used for folder pathing)
 * @returns The public URL of the uploaded image
 */
export const uploadRecipeImage = async (file: File, userId: string): Promise<string> => {
  if (!file) throw new Error('No file provided')

  const timestamp = Date.now()
  const filePath = `recipes/${userId}/${timestamp}_${file.name}`
  const fileRef = ref(storage, filePath)

  await uploadBytes(fileRef, file)
  const downloadURL = await getDownloadURL(fileRef)

  return downloadURL
}
