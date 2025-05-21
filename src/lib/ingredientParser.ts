import { Ingredient } from '@/types/recipe'

/**
 * Parses a raw ingredient string into an `Ingredient` object.
 *
 * Supports strings like:
 * - "2 dl mjölk"
 * - "1.5 tsk socker"
 * - "smör till stekning"
 *
 * If no quantity/unit match is found, the full string is used as the ingredient name.
 *
 * @param raw - A raw input string, typically entered by a user (e.g., "2 dl mjölk").
 * @returns An `Ingredient` object with parsed `quantity`, `unit`, and `name`.
 */
export const parseIngredient = (raw: string): Ingredient => {
  // Regex to match quantity, unit, and name
  // Example matches:
  // - "2 dl mjölk" => { quantity: 2, unit: 'dl', name: 'mjölk' }
  // - "1.5 tsk socker" => { quantity: 1.5, unit: 'tsk', name: 'socker' }
  // - "smör till stekning" => { name: 'smör till stekning' }
  const pattern = /^(\d+(?:[.,]\d+)?)\s*(\w+)?\s+(.+)$/i

  const match = raw.trim().match(pattern)

  if (!match) return { name: raw.trim() }

  // If a match is found, extract the parts
  // match[1] = quantity, e.g., "2" or "1.5"
  // match[2] = unit, e.g., "dl" or "tsk"
  // match[3] = name, e.g., "mjölk" or "socker"
  return {
    quantity: parseFloat(match[1].replace(',', '.')),
    unit: match[2] || '',
    name: match[3],
  }
}

/**
 * Formats an `Ingredient` into a human-readable string.
 *
 * Combines quantity, unit, and name into a single line, like:
 * - "2 dl mjölk"
 * - "smör"
 *
 * @param ing - The ingredient to format.
 * @returns A single string representing the ingredient.
 */
export const formatIngredient = (ing: Ingredient): string => {
  const qty = ing.quantity != null ? `${ing.quantity}${ing.unit ? ' ' + ing.unit : ''}` : ''

  return [qty, ing.name].filter(Boolean).join(' ')
}

/**
 * Breaks an `Ingredient` into separate formatted parts.
 *
 * This is useful for custom rendering, like bolding the quantity or styling each part differently.
 *
 * @param ing - The ingredient to split.
 * @returns An object with string parts: `qty`, `unit`, and `name`.
 */
export const formatIngredientParts = (ing: Ingredient) => {
  const qty = ing.quantity != null ? `${ing.quantity}` : ''
  const unit = ing.unit ?? ''
  const name = ing.name

  return { qty, unit, name }
}
