import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface DescriptionInputProps {
  value: string
  onChange: (value: string) => void
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="description" className="text-xl font-bold pb-1 block">
        Beskrivning
      </Label>
      <Textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder="Beskriv kort vad receptet handlar om"
        className="text-[22px] bg-muted rounded-md min-h-[160px]"
      />
    </div>
  )
}

export default DescriptionInput
