import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface CookTimeInputProps {
  value: number
  onChange: (value: number) => void
}

const CookTimeInput: React.FC<CookTimeInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="cookTime" className="block text-base font-semibold pb-1">
        Tillagningstid (min)
      </Label>
      <Input
        id="cookTime"
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        required
        min={1}
        className="w-32"
      />
    </div>
  )
}

export default CookTimeInput
