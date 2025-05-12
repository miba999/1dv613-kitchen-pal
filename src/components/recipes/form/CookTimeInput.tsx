import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface CookTimeInputProps {
  value: number
  onChange: (value: number) => void
}

const CookTimeInput: React.FC<CookTimeInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="cookTime" className="block text-lg font-semibold pb-2">
        Tillagningstid (min)
      </Label>
      <Input
        id="cookTime"
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        required
        min={1}
        className="w-32 focus-visible:ring-offset-0 no-spinner"
      />
    </div>
  )
}

export default CookTimeInput
