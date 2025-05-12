import { useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Trash2 } from 'lucide-react'

interface InstructionsInputProps {
  steps: string[]
  setSteps: (steps: string[]) => void
}

const InstructionsInput: React.FC<InstructionsInputProps> = ({ steps, setSteps }) => {
  const lastTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps]
    updated[index] = value
    setSteps(updated)
  }

  const handleAddStep = () => {
    setSteps([...steps, ''])
    // Auto-focus new step after slight delay
    setTimeout(() => lastTextareaRef.current?.focus(), 0)
  }

  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index)
    setSteps(updated)
  }

  return (
    <div className="space-y-3">
      <Label className="text-lg">Instruktioner</Label>

      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group relative border rounded-md p-3 bg-muted/20 hover:bg-muted/30 transition"
          >
            <Textarea
              ref={index === steps.length - 1 ? lastTextareaRef : undefined}
              value={step}
              placeholder={`Steg ${index + 1}`}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="resize-none text-sm bg-transparent border-none shadow-none focus-visible:ring-0"
            />
            {steps.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveStep(index)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button type="button" onClick={handleAddStep}>
        Lägg till steg
      </Button>
    </div>
  )
}

export default InstructionsInput
