import React from 'react'

const InstructionList = ({ data }) => {
  return (
    <ol>
      {data.map((instruction, index) => {
        return (
          <li key={index}>
            <p>{instruction}</p>
          </li>
        );
      })}
    </ol>
  );
}

export default InstructionList
