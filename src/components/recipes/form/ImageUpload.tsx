import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils' // If you have a utility for classNames
import { Camera } from 'lucide-react'
import { X } from 'lucide-react'

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
      <Label className="text-lg font-semibold block">Bild (valfritt)</Label>

      {!imageFile && (
        <div
          {...getRootProps()}
          className={cn(
            'border border-dashed rounded-md px-4 py-10 text-center cursor-pointer transition-all',
            'bg-muted/70 text-muted-foreground',
            'hover:bg-muted',
            isDragActive && 'bg-muted border-primary'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <Camera className="w-6 h-6 text-muted-foreground" />
            <p className="text-sm">
              {isDragActive
                ? 'Släpp bilden här...'
                : 'Dra och släpp eller klicka för att ladda upp en bild'}
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {imageFile && (
        <div className="relative w-full max-w-xs">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Förhandsvisning"
            className="rounded-md shadow-md border border-muted"
          />
          <button
            type="button"
            onClick={() => {
              setImageFile(undefined)
              setError(null)
            }}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 rounded-full p-1 shadow-sm cursor-pointer"
            aria-label="Ta bort bild"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
