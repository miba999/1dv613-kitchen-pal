import { Button } from '@/components/ui/button'

interface PortionAdjusterProps {
  value: number
  onChange: (val: number) => void
}

const PortionAdjuster: React.FC<PortionAdjusterProps> = ({ value, onChange }) => {
  const decrease = () => value > 2 && onChange(value - 2)
  const increase = () => onChange(value + 2)

  return (
    <div className="inline-flex rounded-md border overflow-hidden">
      <Button
        type="button"
        variant="ghost"
        className="rounded-none px-4 border-r"
        onClick={decrease}
      >
        –
      </Button>
      <div className="flex items-center px-4 text-sm font-medium min-w-[110px] justify-center">
        {value} portioner
      </div>
      <Button
        type="button"
        variant="ghost"
        className="rounded-none px-4 border-l"
        onClick={increase}
      >
        +
      </Button>
    </div>
  )
}

export default PortionAdjuster
