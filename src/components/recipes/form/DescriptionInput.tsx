import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface DescriptionInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="description" className="text-lg font-semibold pb-2">
        Beskrivning
      </Label>
      <Textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Beskriv kort vad receptet handlar om"
        className={`text-[22px] bg-muted rounded-md min-h-[160px] mb-1 ${error ? 'border border-destructive' : ''}`}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

export default DescriptionInput
