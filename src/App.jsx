import { useState } from 'react'
import { FaCheck } from "react-icons/fa";
import './App.css'

function App() {
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
  const Square = ({ value, onClick }) => (
    <button className='square' onClick={onClick}>{value}</button>
  )
  const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [next, setNext] = useState(true)
    const winner = calculateWinner(squares)

    const handleClick = (i) => {
      if (winner || squares[i]) {
        return
      }
      const newSquares = [...squares]
      newSquares[i] = next ? 'X' : 'O'
      setSquares(newSquares)
      setNext(!next)
    }
    const renderSquare = (i) => (
      <Square value={squares[i]} onClick={() => handleClick(i)} />
    )
    const reset = () => {
      setSquares(Array(9).fill(null))
      setNext(true)
    }
    let status
    if (winner) {
      status = `Player:${winner} won!`
    } else if (squares.every(square => square !== null)) {
      status = 'Tie'
    } else {
      status = `Next Player: ${next ? 'X' : 'O'}`
    }
    return (
      <div className='status'>{status}
        <div className='board-row'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className='reset-button' onClick={reset}>Reset Game</button>
      </div>
    )
  }


  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <h1>Tic Tac Toe</h1>
        </header>
        <div className='game-board'>
          <Board />
        </div>
      </div>
    </>
  )
}

export default App
