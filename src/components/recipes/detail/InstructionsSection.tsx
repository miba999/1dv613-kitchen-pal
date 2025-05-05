import { Card } from '@/components/ui/card'

interface InstructionsSectionProps {
  steps: string[]
}

const InstructionsSection: React.FC<InstructionsSectionProps> = ({ steps }) => {
  return (
    <Card className="p-4 gap-4">
      <h2 className="text-xl font-semibold">Instruktioner</h2>
      <ol className="list-decimal list-inside space-y-1">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </Card>
  )
}

export default InstructionsSection
