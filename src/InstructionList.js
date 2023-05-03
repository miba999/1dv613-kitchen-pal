import React from 'react'

const InstructionList = ({ data }) => {
  return (
    <ol>
      {data.map((instruction) => {
        return (
          <li>
            <p>{instruction}</p>
          </li>
        );
      })}
    </ol>
  );
}

export default InstructionList
