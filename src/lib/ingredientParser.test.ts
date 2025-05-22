import { describe, it, expect } from 'vitest'
import { parseIngredient, formatIngredient, formatIngredientParts } from './ingredientParser'

describe('parseIngredient', () => {
  it('parses quantity + unit + name', () => {
    expect(parseIngredient('2 dl mjölk')).toEqual({
      quantity: 2,
      unit: 'dl',
      name: 'mjölk',
    })

    expect(parseIngredient('1,5 tsk socker')).toEqual({
      quantity: 1.5,
      unit: 'tsk',
      name: 'socker',
    })
  })

  it('parses quantity without unit', () => {
    expect(parseIngredient('3 vatten')).toEqual({
      quantity: 3,
      unit: '',
      name: 'vatten',
    })
  })

  it('handles no quantity or unit', () => {
    expect(parseIngredient('smör till stekning')).toEqual({
      name: 'smör till stekning',
    })
  })
})

describe('formatIngredient', () => {
  it('formats full ingredient with qty and unit', () => {
    expect(formatIngredient({ quantity: 2, unit: 'dl', name: 'mjölk' })).toBe('2 dl mjölk')
  })

  it('formats ingredient with only name', () => {
    expect(formatIngredient({ name: 'salt' })).toBe('salt')
  })
})

describe('formatIngredientParts', () => {
  it('returns separated parts', () => {
    expect(formatIngredientParts({ quantity: 1.5, unit: 'msk', name: 'olja' })).toEqual({
      qty: '1.5',
      unit: 'msk',
      name: 'olja',
    })
  })

  it('handles missing quantity and unit', () => {
    expect(formatIngredientParts({ name: 'vitlök' })).toEqual({ qty: '', unit: '', name: 'vitlök' })
  })
})
