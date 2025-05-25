import { it, describe, expect } from 'vitest'
import { generateShoppingList } from '@/lib/shoppingUtils'

describe('generateShoppingList', () => {
  it('merges same ingredient and unit', () => {
    const result = generateShoppingList(
      [{ name: 'mjolk', quantity: 2, unit: 'dl' }],
      [{ name: 'mjolk', quantity: 3, unit: 'dl' }]
    )

    expect(result).toEqual([{ name: 'mjolk', quantity: 5, unit: 'dl' }])
  })

  it('converts and merges ingredients to base units', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'olja', quantity: 2, unit: 'msk' },
        { name: 'olja', quantity: 1, unit: 'tsk' },
      ]
    )

    expect(result).toEqual([{ name: 'olja', quantity: 3.5, unit: 'cl' }])
  })

  it('handles unknown units by preserving them', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'vitlök', quantity: 2, unit: 'klyfta' },
        { name: 'vitlök', quantity: 1, unit: 'klyfta' },
      ]
    )

    expect(result).toEqual([{ name: 'vitlök', quantity: 3, unit: 'klyfta' }])
  })

  it('formats small liquid units as ml or cl', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'vaniljextrakt', quantity: 2, unit: 'tsk' }, // 0.01 l
      ]
    )

    expect(result).toEqual([{ name: 'vaniljextrakt', quantity: 1, unit: 'cl' }])
  })

  it('formats weight correctly into grams and kg', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'socker', quantity: 700, unit: 'g' },
        { name: 'socker', quantity: 0.5, unit: 'kg' },
      ]
    )

    expect(result).toEqual([{ name: 'socker', quantity: 1.2, unit: 'kg' }])
  })

  it('handles ingredients without quantity', () => {
    const result = generateShoppingList([], [{ name: 'salt' }, { name: 'salt' }])

    expect(result).toEqual([{ name: 'salt', quantity: 0, unit: undefined }])
  })

  it('merges different volume units into dl', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'mjolk', quantity: 100, unit: 'ml' }, // 0.1 l
        { name: 'mjolk', quantity: 1, unit: 'dl' }, // 0.1 l
      ]
    )

    expect(result).toEqual([{ name: 'mjolk', quantity: 2, unit: 'dl' }])
  })

  it('prefers cl over ml for small values', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'olja', quantity: 7, unit: 'ml' },
        { name: 'olja', quantity: 1, unit: 'tsk' }, // 5 ml
      ]
    )

    // Total = 12 ml = 1.2 cl
    expect(result).toEqual([{ name: 'olja', quantity: 1.2, unit: 'cl' }])
  })

  it('displays dl for larger volumes under 1 liter', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'vatten', quantity: 3, unit: 'dl' }, // 0.3 l
        { name: 'vatten', quantity: 2, unit: 'msk' }, // 0.03 l
      ]
    )

    // 0.33 l = 3.3 dl
    expect(result).toEqual([{ name: 'vatten', quantity: 3.3, unit: 'dl' }])
  })

  it('shows full liters in dl for consistency', () => {
    const result = generateShoppingList([], [{ name: 'juice', quantity: 0.5, unit: 'l' }])

    expect(result).toEqual([{ name: 'juice', quantity: 5, unit: 'dl' }])
  })

  it('merges kg and g correctly', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'mjol', quantity: 500, unit: 'g' },
        { name: 'mjol', quantity: 1, unit: 'kg' },
      ]
    )

    // 500 g + 1000 g = 1.5 kg
    expect(result).toEqual([{ name: 'mjol', quantity: 1.5, unit: 'kg' }])
  })

  it('merges weights using hg correctly', () => {
    const result = generateShoppingList(
      [],
      [
        { name: 'ost', quantity: 2, unit: 'hg' },
        { name: 'ost', quantity: 300, unit: 'g' },
      ]
    )

    // 200g + 300g = 0.5 kg
    expect(result).toEqual([{ name: 'ost', quantity: 500, unit: 'g' }])
  })
})
