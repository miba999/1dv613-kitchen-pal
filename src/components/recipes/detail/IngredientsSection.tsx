import { Card } from '@/components/ui/card'
import PortionAdjuster from '@/components/recipes/detail/PortionAdjuster'
import { Ingredient } from '@/types/recipe'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface IngredientsSectionProps {
  ingredients: Ingredient[]
  originalPortions: number
  currentPortions: number
  setCurrentPortions: (val: number) => void
  onAddToShoppingList: () => void
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
  originalPortions,
  currentPortions,
  setCurrentPortions,
  onAddToShoppingList,
}) => {
  const scale = currentPortions / originalPortions

  const formatQuantity = (quantity: number): string => {
    const rounded = parseFloat(quantity.toFixed(2))

    return Number.isInteger(rounded) ? rounded.toString() : rounded.toString().replace('.', ',')
  }

  return (
    <Card className="p-4 gap-2">
      <section aria-labelledby="ingredients-heading">
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <h2 className="text-xl font-semibold">Ingredienser</h2>

          <div className="flex items-center gap-2">
            <PortionAdjuster value={currentPortions} onChange={setCurrentPortions} />

            <Button
              size="sm"
              variant="outline"
              onClick={onAddToShoppingList}
              className="flex items-center gap-1"
              aria-label="Lägg till ingredienser i inköpslistan"
              disabled={!ingredients.length}
            >
              <ShoppingCart className="w-4 h-4" />
              Lägg till
            </Button>
          </div>
        </div>

        <ul className="list-disc list-inside space-y-1">
          {ingredients.map((ing, index) => {
            const hasQuantity = typeof ing.quantity === 'number' && !isNaN(ing.quantity)
            const adjustedQty = hasQuantity
              ? formatQuantity((ing.quantity as number) * scale)
              : null

            return (
              <li key={index}>
                {adjustedQty && (
                  <strong>
                    {adjustedQty} {ing.unit}{' '}
                  </strong>
                )}
                {ing.name}
                {ing.note && <span className="text-muted-foreground"> ({ing.note})</span>}
              </li>
            )
          })}
        </ul>
      </section>
    </Card>
  )
}

export default IngredientsSection
