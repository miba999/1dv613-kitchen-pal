import { Label } from '@/components/ui/label'
import PortionAdjuster from '@/components/recipes/detail/PortionAdjuster'

interface PortionsInputProps {
  value: number
  onChange: (value: number) => void
}

const PortionsInput: React.FC<PortionsInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="portions" className="block text-base font-semibold pb-1">
        Antal portioner
      </Label>
      <PortionAdjuster value={value} onChange={onChange} />
    </div>
  )
}

export default PortionsInput


