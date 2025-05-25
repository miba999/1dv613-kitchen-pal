import { Ingredient } from '@/types/recipe'

export interface ShoppingListInput {
  ingredients: Ingredient[]
}

/**
 * Unit conversions for volume-based measurements to liters.
 */
const UNIT_CONVERSIONS_TO_L: Record<string, number> = {
  krm: 0.001,
  tsk: 0.005,
  msk: 0.015,
  ml: 0.001,
  cl: 0.01,
  dl: 0.1,
  l: 1,
}

/**
 * Unit conversions for weight-based measurements to kilograms.
 */
const UNIT_CONVERSIONS_TO_KG: Record<string, number> = {
  g: 0.001,
  hg: 0.1,
  kg: 1,
}

/**
 * Converts a given quantity and unit to a base unit (liters or kilograms).
 *
 * @param quantity - The numeric quantity to convert.
 * @param unit - The unit of the quantity (e.g., 'dl', 'g').
 * @returns An object with the converted quantity and its base unit, or null if the unit is unknown.
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
 * Converts a base unit quantity (liters or kilograms) into a more readable format.
 * Prefers cl and dl for more intuitive grocery display.
 *
 * @param quantity - The amount in base unit.
 * @param baseUnit - The base unit ('l' or 'kg').
 * @returns A quantity/unit pair with a more readable representation.
 */
const formatReadableUnit = (
  quantity: number,
  baseUnit: string
): { quantity: number; unit: string } => {
  if (baseUnit === 'l') {
    if (quantity < 0.01) {
      return { quantity: Number((quantity * 1000).toFixed(0)), unit: 'ml' }
    }

    if (quantity < 0.1) {
      return { quantity: Number((quantity * 100).toFixed(1)), unit: 'cl' }
    }

    if (quantity < 1) {
      return { quantity: Number((quantity * 10).toFixed(1)), unit: 'dl' }
    }

    return { quantity: Number((quantity * 10).toFixed(0)), unit: 'dl' } // prefer dl over l
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

  return { quantity, unit: baseUnit }
}

/**
 * Generates a combined and normalized shopping list by merging existing and new ingredients.
 * It sums up quantities of the same ingredient with matching or convertible units,
 * and returns them in a user-friendly display format.
 *
 * @param existing - Array of already added shopping list ingredients.
 * @param additions - Array of new ingredients to add.
 * @returns A merged and formatted list of ingredients.
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
