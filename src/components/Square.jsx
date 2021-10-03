import React from 'react'

import '../style/square.css'

function Square({value, onClick, isSelect}) {

  return (
    <button 
      className={`square ${isSelect?'selected':''}`}
      onClick={onClick}
    >
      <h3 className={value === "X"? "X" : "O"}>{value}</h3>
    </button>
  )
}

export default Square
