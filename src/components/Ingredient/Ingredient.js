import React from 'react'

const Ingredient = ({ amount, unit, name }) => {
  return (
    <li>{amount} {unit} {name}</li>
  )
}

export default Ingredient