import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';

import Board from './components/Board'
import ToggleButton from './components/ToggleButton';
import RangeBar from './components/RangeBar';

function Game() {

  const [size, setSize] = useState(5);
  const [history, setHistory] = useState([
    { 
      squares: Array(size*size).fill(null),
      move: {
        x: null,
        y: null,
      }
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isNextX, setIsNextX] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [endGameRes, setEndGameRes] = useState([]);

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || endGameRes.length !== 0) return;
    
    squares[i] = isNextX ? 'X' : 'O';
    
    let isWin = calculateWinner(squares);
    console.log(isWin);
    if (isWin) {
      setEndGameRes(isWin);
    }

    setHistory(newHistory.concat(
      [
        {
          squares,
          move: {
            x: Math.trunc(i / size),
            y: i % size
          }
        }
      ]
    ));
    setIsNextX(!isNextX);
    setStepNumber(stepNumber + 1);
  }

  function jumpTo(i) {
    setStepNumber(i);
    setIsNextX((i % 2) === 0);
    const current = history[i];
    const isWin = calculateWinner(current.squares);

    if (!isWin)
      setEndGameRes([]);
    else
      setEndGameRes(isWin);
  }

  function triggerToggle() {
    setToggle(!toggle)
  }

  function newGame() {
    jumpTo(0);
    setHistory([
      { 
        squares: Array(9).fill(null),
        move: {
          x: null,
          y: null,
        }
      }
    ]);
  }

  function changeBoardSize(n) {
    setSize(n);
    newGame();
  }

  function calculateWinner(squares) {
    let nextCoord = [
      {i: 0, j: 1}, //row left to right
      {i: 1, j: 1}, //diag top left to bottom right
      {i: 1, j: 0}, //column top to bottom
      {i: 1, j: -1}, //diag top right to bottom left
    ];
    let res = Array(5);

    //Go through all board
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        let index = i*size + j;
        //If not null (checked)
        if (squares[index] != null) {
          // Check 4 possible solutions
          for(let k = 0; k < nextCoord.length; k++) {
            let count = 1;
            let x = i;
            let y = j;
            while (count <= 4) {
              let newX = x + nextCoord[k].i;
              let newY = y + nextCoord[k].j;
              if (newX >= 0 && newY >= 0 && newX < size && newY < size) {
                let newIndex = newX*size + newY;
                if (squares[newIndex] === squares[index]) {
                  console.log(`${k}. ${newX} ${newY}`);
                  res[count] = newIndex;
                }
                else 
                {
                  break;
                }
              }
              else {
                break;
              }
              x = newX;
              y = newY;
              count++;
            }
            //Found all 5
            if (count === 5) {
              res[0] = index;
              return res;
            }
          }
        }
      }
    }

    return null;

  }
  
  let move = history.map( (element, index) => {
    let x = element.move.x;
    let y = element.move.y;
    const desc = index ?
    `Go to move # ${index} ${history[index].squares[x*size+y]}(${x}, ${y})`:
    'Go to game start';

    return (
      <li key={index}>
        <button className={index === stepNumber? "selected":""} onClick={() => jumpTo(index)}>{desc}</button>
      </li>
    )
  });

  if (toggle) {
    move = move.reverse();
  }

  let status;
  if (endGameRes.length === 5) {
    status = "Winner: " + history[stepNumber].squares[endGameRes[0]];
  } else if (stepNumber === size*size) {
    status = "It's a draw!"
  } else if (endGameRes) {
    status = "Next player: " + (isNextX? "X" : "O");
  }
  
  return (
    <div className="game">
      <h1>CARO GAME ULTIMATE</h1>
      <div className="game-header">
        <div className="new-game">
          <button onClick={newGame}>New Game</button>
        </div>
        <div className="range-bar-container">
          <RangeBar onChange={(n) => changeBoardSize(n)}/>
        </div>
      </div>
      <div className="game-main">
        <div className="game-board">
          <h2 className="status">{status}</h2>
          <Board 
            size={size}
            current={history[stepNumber]}
            endGameRes={endGameRes}
            onClick={ i => handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div className="toogle-button">
            <ToggleButton toggle={toggle} onChange={() => triggerToggle()}/>
            <p>{toggle? "Descending" : "Ascending"}</p>
          </div>
          <ol>{move}</ol>
        </div>
      </div>
    </div>
  )
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);