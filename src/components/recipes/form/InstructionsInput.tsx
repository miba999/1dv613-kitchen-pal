import { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import StepCard from './StepCard'

interface InstructionsInputProps {
  steps: string[]
  setSteps: (steps: string[]) => void
}

const InstructionsInput: React.FC<InstructionsInputProps> = ({ steps, setSteps }) => {
  const lastTextareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps]
    updated[index] = value
    setSteps(updated)
  }

  const handleAddStep = () => {
    setSteps([...steps, ''])
    setTimeout(() => lastTextareaRef.current?.focus(), 0)
  }

  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index)
    setSteps(updated)
  }

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Gör så här</Label>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            index={index}
            value={step}
            onChange={(value) => handleStepChange(index, value)}
            onRemove={() => handleRemoveStep(index)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            isActive={activeIndex === index}
            ref={index === steps.length - 1 ? lastTextareaRef : undefined}
            showRemove={steps.length > 1}
          />
        ))}
      </div>

      <Button type="button" variant="outline" onClick={handleAddStep}>
        Lägg till steg
      </Button>
    </div>
  )
}

export default InstructionsInput
