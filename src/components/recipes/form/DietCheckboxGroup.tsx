import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface DietCheckboxGroupProps {
  selected: string[]
  onChange: (selected: string[]) => void
}

const dietOptions = [
  { label: 'Vegansk', value: 'vegan', emoji: '🌱' },
  { label: 'Vegetarisk', value: 'vegetarian', emoji: '🥦' },
  { label: 'Glutenfri', value: 'gluten-free', emoji: '🚫🌾' },
  { label: 'Laktosfri', value: 'lactose-free', emoji: '🥛❌' },
  { label: 'Keto', value: 'keto', emoji: '🥩' },
  { label: 'Paleo', value: 'paleo', emoji: '🍖' },
  { label: 'Pescetarian', value: 'pescatarian', emoji: '🐟' },
]

const DietCheckboxGroup: React.FC<DietCheckboxGroupProps> = ({ selected, onChange }) => {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="space-y-2">
      <Label className="text-lg font-semibold pb-1">Kosthållning (valfritt)</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {dietOptions.map(({ label, value, emoji }) => (
          <label
            key={value}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={selected.includes(value)}
              onCheckedChange={() => toggle(value)}
              id={`diet-${value}`}
            />
            <span>{emoji} {label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default DietCheckboxGroup
