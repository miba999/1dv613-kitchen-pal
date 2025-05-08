import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils' // If you have a utility for classNames

interface ImageUploadProps {
  imageFile?: File
  setImageFile: (file?: File) => void
  maxSizeMB?: number
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageFile, setImageFile, maxSizeMB = 3 }) => {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (!file) return

      if (!file.type.startsWith('image/')) {
        setError('Endast bildfiler tillåts.')

        return
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Bilden får max vara ${maxSizeMB} MB.`)

        return
      }

      setError(null)
      setImageFile(file)
    },
    [maxSizeMB, setImageFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold pb-1 block">Bild (valfritt)</Label>

      <div
        {...getRootProps()}
        className={cn(
          'border border-dashed border-muted rounded-md p-4 text-center cursor-pointer transition-all',
          isDragActive && 'bg-muted/50'
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? 'Släpp bilden här...'
            : 'Dra och släpp en bild här eller klicka för att ladda upp'}
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="Förhandsvisning"
          className="mt-2 w-full max-w-xs rounded-md shadow"
        />
      )}

      {imageFile && (
        <button
          type="button"
          className="mt-2 text-sm text-red-500 hover:underline"
          onClick={() => {
            setImageFile(undefined)
            setError(null)
          }}
        >
          Ta bort bild
        </button>
      )}
    </div>
  )
}

export default ImageUpload
