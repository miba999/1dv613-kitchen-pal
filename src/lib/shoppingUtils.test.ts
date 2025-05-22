import { it, expect } from 'vitest'
import { generateShoppingList } from '@/lib/shoppingUtils'
// import type { Ingredient } from '@/types/recipe'

// describe('generateShoppingList', () => {
//   it('merges and converts volume units to liters', () => {
//     const existing: Ingredient[] = [
//       { name: 'mjölk', quantity: 2, unit: 'dl' }, // 0.2 l
//     ]
//     const additions: Ingredient[] = [
//       { name: 'mjölk', quantity: 300, unit: 'ml' }, // 0.3 l
//     ]

//     const result = generateShoppingList(existing, additions)

//     expect(result).toEqual([{ name: 'mjölk', quantity: 0.5, unit: 'l' }])
//   })

//   it('merges and converts weight units to kilograms', () => {
//     const result = generateShoppingList(
//       [{ name: 'socker', quantity: 500, unit: 'g' }],
//       [{ name: 'socker', quantity: 0.25, unit: 'kg' }]
//     )

//     expect(result).toEqual([{ name: 'socker', quantity: 0.75, unit: 'kg' }])
//   })

//   it('converts and merges tsk + msk + krm into l', () => {
//     const result = generateShoppingList(
//       [],
//       [
//         { name: 'olja', quantity: 3, unit: 'msk' }, // 0.045 l
//         { name: 'olja', quantity: 6, unit: 'tsk' }, // 0.03 l
//         { name: 'olja', quantity: 10, unit: 'krm' }, // 0.01 l
//       ]
//     )
//     expect(result).toEqual([{ name: 'olja', quantity: 0.09, unit: 'l' }])
//   })

//   it('converts hg to kg correctly', () => {
//     const result = generateShoppingList([], [
//       { name: 'ost', quantity: 2, unit: 'hg' },   // 0.2 kg
//       { name: 'ost', quantity: 300, unit: 'g' },  // 0.3 kg
//     ])
//     expect(result).toEqual([{ name: 'ost', quantity: 0.5, unit: 'kg' }])
//   })

  it('handles unknown units like "st" by summing only', () => {
    const result = generateShoppingList(
      [{ name: 'ägg', quantity: 2, unit: 'st' }],
      [{ name: 'ägg', quantity: 1, unit: 'st' }]
    )

    expect(result).toEqual([{ name: 'ägg', quantity: 3, unit: 'st' }])
  })

//   it('rounds to two decimal places', () => {
//     const result = generateShoppingList(
//       [],
//       [{ name: 'olja', quantity: 333, unit: 'ml' }] // 0.333 l
//     )

//     expect(result).toEqual([{ name: 'olja', quantity: 0.33, unit: 'l' }])
//   })

//   it('preserves ingredients with no quantity', () => {
//     const result = generateShoppingList([], [{ name: 'salt' }])

//     expect(result).toEqual([{ name: 'salt', quantity: 0, unit: undefined }])
//   })

//   it('ignores casing and whitespace in unit and name', () => {
//     const result = generateShoppingList(
//       [],
//       [
//         { name: '  MjOlK ', quantity: 2, unit: 'DL ' },
//         { name: 'mjolk', quantity: 300, unit: 'ml' },
//       ]
//     )
//     expect(result).toEqual([{ name: 'mjolk', quantity: 0.5, unit: 'l' }])
//   })
// })
