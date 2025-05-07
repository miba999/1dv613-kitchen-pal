import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface TitleInputProps {
  value: string
  onChange: (value: string) => void
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="title" className="text-base font-semibold pb-1">
        Titel
      </Label>
      <Input
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder="Ge ditt recept ett namn"
        className="text-lg bg-muted rounded-md mb-4"
      />
    </div>
  )
}

export default TitleInput
