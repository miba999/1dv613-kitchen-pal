import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PortionAdjusterProps {
  value: number
  onChange: (val: number) => void
}

const PortionAdjuster: React.FC<PortionAdjusterProps> = ({ value, onChange }) => {
  const decrease = () => value > 2 && onChange(value - 2)
  const increase = () => onChange(value + 2)
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)

    if (!isNaN(val) && val >= 1) {
      onChange(val)
    }
  }

  return (
    <div className="inline-flex items-center rounded-md border overflow-hidden shadow-sm">
      <Button
        type="button"
        variant="ghost"
        className="rounded-none px-4 border-r"
        tabIndex={-1}
        onClick={decrease}
      >
        –
      </Button>
      <div className="px-2 min-w-[80px] flex items-center justify-center">
        <Input
          type="number"
          value={value}
          onChange={handleManualChange}
          min={1}
          className="w-12 text-center border-none focus-visible:ring-0 focus-visible:ring-offset-0 no-spinner"
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        className="rounded-none px-4 border-l"
        tabIndex={-1}
        onClick={increase}
      >
        +
      </Button>
    </div>
  )
}

export default PortionAdjuster
