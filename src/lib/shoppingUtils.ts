import { Ingredient } from '@/types/recipe'

export interface ShoppingListInput {
  ingredients: Ingredient[]
}

const UNIT_CONVERSIONS_TO_L: Record<string, number> = {
  krm: 0.001,
  tsk: 0.005,
  msk: 0.015,
  ml: 0.001,
  cl: 0.01,
  dl: 0.1,
  l: 1,
}

const UNIT_CONVERSIONS_TO_KG: Record<string, number> = {
  g: 0.001,
  hg: 0.1,
  kg: 1,
}

/**
 * Converts units to base unit (l or kg), or null if unknown
 */
const convertToBaseUnit = (
  quantity: number,
  unit: string
): { quantity: number; unit: 'l' | 'kg' } | null => {
  const u = unit.trim().toLowerCase()

  if (u in UNIT_CONVERSIONS_TO_L) {
    return { quantity: quantity * UNIT_CONVERSIONS_TO_L[u], unit: 'l' }
  }

  if (u in UNIT_CONVERSIONS_TO_KG) {
    return { quantity: quantity * UNIT_CONVERSIONS_TO_KG[u], unit: 'kg' }
  }

  return null
}

/**
 * Converts from base unit (l/kg) to a readable display unit
 */
const formatReadableUnit = (
  quantity: number,
  baseUnit: string
): { quantity: number; unit: string } => {
  if (baseUnit === 'l') {
    if (quantity < 0.015) {
      return { quantity: Number((quantity * 1000).toFixed(0)), unit: 'ml' }
    }

    if (quantity < 0.1) {
      return { quantity: Number((quantity * 100).toFixed(0)), unit: 'cl' }
    }

    if (quantity < 1) {
      return { quantity: Number((quantity * 10).toFixed(1)), unit: 'dl' }
    }

    return { quantity: Number(quantity.toFixed(2)), unit: 'l' }
  }

  if (baseUnit === 'kg') {
    const grams = quantity * 1000

    if (grams < 1000) {
      return {
        quantity: Number(grams.toFixed(0)),
        unit: 'g',
      }
    } else {
      return {
        quantity: Number(quantity.toFixed(2)),
        unit: 'kg',
      }
    }
  }

console.log(quantity, baseUnit)

  return { quantity, unit: baseUnit }
}

/**
 * Merges and normalizes ingredients to base units, then formats them nicely
 */
export const generateShoppingList = (
  existing: Ingredient[],
  additions: Ingredient[]
): Ingredient[] => {
  const map = new Map<string, Ingredient>()

  const addToMap = (ingredient: Ingredient) => {
    const name = ingredient.name.trim().toLowerCase()
    const unit = ingredient.unit?.trim().toLowerCase() || ''
    const key = `${name}|${unit}`

    const baseQuantity = ingredient.quantity ?? 0
    const converted = convertToBaseUnit(baseQuantity, unit)
    const normalizedKey = converted ? `${name}|${converted.unit}` : key
    const prev = map.get(normalizedKey)

    const newQuantity = prev?.quantity ?? 0
    map.set(normalizedKey, {
      name,
      quantity: (converted?.quantity ?? baseQuantity) + newQuantity,
      unit: converted?.unit || unit || undefined,
    })
  }

  existing.forEach(addToMap)
  additions.forEach(addToMap)

  return Array.from(map.values()).map(({ name, quantity, unit }) => {
    const rawQty = quantity ?? 0

    const { quantity: displayQty, unit: displayUnit } =
      unit === 'l' || unit === 'kg'
        ? formatReadableUnit(rawQty, unit)
        : { quantity: Number(rawQty.toFixed(2)), unit }

    return {
      name,
      quantity: displayQty,
      unit: displayUnit,
    }
  })
}
