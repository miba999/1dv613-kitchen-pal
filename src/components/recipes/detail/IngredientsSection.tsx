import { Card } from '@/components/ui/card'
import PortionAdjuster from '@/components/recipes/detail/PortionAdjuster'
import { Ingredient } from '@/types/recipe'

interface IngredientsSectionProps {
  ingredients: Ingredient[]
  originalPortions: number
  currentPortions: number
  setCurrentPortions: (val: number) => void
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
  originalPortions,
  currentPortions,
  setCurrentPortions,
}) => {
  const scale = currentPortions / originalPortions

  const formatQuantity = (quantity: number): string => {
    const rounded = parseFloat(quantity.toFixed(2))

    return Number.isInteger(rounded) ? rounded.toString() : rounded.toString().replace('.', ',')
  }

  return (
    <Card className="p-4 gap-2">
      <section aria-labelledby="ingredients-heading">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ingredienser</h2>
          <PortionAdjuster value={currentPortions} onChange={setCurrentPortions} />
        </div>

        <ul className="list-disc list-inside space-y-1">
          {ingredients.map((ing, index) => (
            <li key={index}>
              {formatQuantity(ing.quantity * scale)} {ing.unit} {ing.name}
              {ing.note && <span className="text-muted-foreground"> ({ing.note})</span>}
            </li>
          ))}
        </ul>
      </section>
    </Card>
  )
}

export default IngredientsSection
