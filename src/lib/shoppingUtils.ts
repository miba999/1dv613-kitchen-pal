// generateShoppingList()

// mergeIngredients()

// scaleIngredientsByPortions()

import { Ingredient } from '@/types/recipe'

export interface ShoppingListInput {
  ingredients: Ingredient[]
}

const UNIT_CONVERSIONS_TO_L: Record<string, number> = {
  krm: 0.001, // 1 krm = 1 ml = 0.001 l
  tsk: 0.005, // 5 ml
  msk: 0.015, // 15 ml
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
 * Try to convert a unit to base (liter or kg). If not convertible, return null.
 */
const convertToBaseUnit = (
  quantity: number,
  unit: string
): { quantity: number; unit: string } | null => {
  const u = unit.trim().toLowerCase()

  if (u in UNIT_CONVERSIONS_TO_L) {
    return { quantity: quantity * UNIT_CONVERSIONS_TO_L[u], unit: 'l' }
  }

  if (u in UNIT_CONVERSIONS_TO_KG) {
    return { quantity: quantity * UNIT_CONVERSIONS_TO_KG[u], unit: 'kg' }
  }

  return null // Unhandled unit
}

/**
 * Merges and converts all known units to base units (liter, kg).
 * Unknown units (like 'st', 'pkt') are preserved as-is.
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

    const baseQuantity = ingredient.quantity || 0
    const converted = convertToBaseUnit(baseQuantity, unit)
    const normalizedKey = converted ? `${name}|${converted.unit}` : key
    const prev = map.get(normalizedKey)

    const newQuantity = prev?.quantity || 0
    map.set(normalizedKey, {
      name,
      quantity: (converted?.quantity ?? baseQuantity) + newQuantity,
      unit: converted?.unit || unit || undefined,
    })
  }

  existing.forEach(addToMap)
  additions.forEach(addToMap)

  return Array.from(map.values()).map(({ name, quantity, unit }) => ({
    name,
    quantity: Math.round((quantity ?? 0) * 100) / 100,
    unit,
  }))
}
