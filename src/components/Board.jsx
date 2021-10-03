import React from 'react'
import '../style/board.css'
import Square from './Square';

function Board({size, current, endGameRes, onClick}) {

  function renderSquare(i) {
    let isSelect = false;
    if (i === endGameRes[0] || i === endGameRes[1] || i === endGameRes[2] || i === endGameRes[3] || i === endGameRes[4])
      isSelect = true;
    else if (current.move.x === (Math.trunc(i / size)) && current.move.y === (i % size))
      isSelect = true;
    
    return (
      <Square key={i} isSelect={isSelect} value={current.squares[i]} onClick={() => onClick(i) }></Square>
    )
  }

  function createBoard() {
    let res = [];
    for(let i = 0; i < size; i++) {
      let rowSquare = [];
      for(let j = 0; j < size; j++) {
        let square = renderSquare(i*size + j);
        rowSquare.push(square);
      }
      res.push(<div key={i} className="boardRow">{rowSquare}</div>);
    }
    return (
      <>
      { res }
      </>
    );
  }

  return (
    <div className="board">
      { createBoard() }
    </div>
  )
}

export default Board;