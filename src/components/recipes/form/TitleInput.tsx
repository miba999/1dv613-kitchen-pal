import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface TitleInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <Label htmlFor="title" className="text-lg font-semibold pb-2">
        Titel
      </Label>
      <Input
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ge ditt recept ett namn"
        className={`text-[22px] bg-muted rounded-md mb-2 ${error ? 'border border-destructive' : ''}`}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

export default TitleInput
