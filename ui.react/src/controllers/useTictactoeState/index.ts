import { useContext, useEffect, useState } from 'react'
import { useCms } from 'src/hooks/useCms'
import { useError } from 'src/hooks/useError'
import { useFetch } from 'src/hooks/useFetch'
import { SchemeContext } from '../../state/colorScheme/colourScheme'
import { useEventListener } from '../../hooks/useEventListener'
import { Board, CalculateWinner } from './types'

export const x = '❌'
export const o = '🟢'

const inverse = new Map([
  [x, o],
  [o, x],
])

function miniMax(
  board: Board,
  depth: number,
  isMaximising: boolean,
  symbol: string,
) {
  // console.log(board, depth, isMaximising, symbol)
  const scores = {
    A: 1,
    B: -1,
    draw: 0,
  }

  let result = calculateWinner(board)
  if (result[0] !== '') {
    if (result[0] === 'draw') {
      return scores['draw']
    } else if (result[0] === o) {
      return scores['A']
    } else if (result[0] === x) {
      return scores['B']
    }
  }
  if (isMaximising) {
    let bestScore = -Infinity
    if (depth > 10) {
      return bestScore
    }
    for (let i = 0; i < board.length; i++) {
      if (board[i] == undefined) {
        let potentialBoard: Board = [...board]
        potentialBoard[i] = symbol
        // @ts-ignore
        let score = miniMax(
          potentialBoard,
          depth + 1,
          false,
          inverse.get(symbol) ?? '',
        )
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    // P1 simulation
    let bestScore = Infinity
    if (depth > 10) {
      return bestScore
    }
    for (let i = 0; i < board.length; i++) {
      if (board[i] == undefined) {
        let potentialBoard = [...board]
        potentialBoard[i] = symbol
        // @ts-ignore
        let score = miniMax(
          potentialBoard,
          depth + 1,
          true,
          inverse.get(symbol) ?? '',
        )
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

const computerP2 = (boardCopy: Board, mode: number, symbol: string) => {
  if (mode === 1) {
    let choice: number
    while (true) {
      choice = Math.random() * 9
      if (boardCopy[choice] == undefined) {
        break
      }
    }
    boardCopy[choice] = symbol
  } else if (mode === 0) {
    let bestScore = -Infinity
    let bestMove: number
    for (let i = 0; i < boardCopy.length; i++) {
      if (boardCopy[i] == undefined) {
        let potentialBoard: Board = [...boardCopy]
        potentialBoard[i] = symbol
        // @ts-ignore
        let score = miniMax(potentialBoard, 0, false, inverse.get(symbol)) //max false is p1 turn
        if (score > bestScore) {
          bestScore = score
          bestMove = i
        }
      }
    }
    // @ts-ignore
    boardCopy[bestMove] = symbol
  }
  return boardCopy
}

function calculateWinner(board: Board): CalculateWinner {
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
    if (!!board[a] && board[a] === board[b] && board[a] === board[c]) {
      // @ts-ignore
      return [board[a], lines[i]]
    }
    if (!board.some(elem => elem == undefined)) {
      return ['draw', [NaN, NaN, NaN]]
    }
  }
  return ['', [NaN, NaN, NaN]]
}

export const useTictactoeState = () => {
  // const search = useLocation().search;
  // const parsed = search.match(/[?|&][a-zA-Z]+=[0-9]/gi);
  // const params = {};
  // for(let i=0;i<parsed.length;i++) {
  //   const [key, val] = parsed[i].split('=')
  //   params[key.replace(/^[?|&]/gi, '').toLowerCase()] = val
  // }

  const [board, setBoard] = useState(new Array(9).fill(undefined))
  const [ticker, setTicker] = useState(0)
  const [winner, setWinner] = useState<undefined | CalculateWinner>(undefined)
  const [mode, setMode] = useState(0)
  const [pPlayerFirst, setPPlayerFirst] = useState(1)
  const [pPlayerWins, setPPlayerWins] = useState(0)
  const [sPlayerWins, setSPlayerWins] = useState(0)
  const [gameInProgress, setGameInProgress] = useState(false)
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()
  const p1 = pPlayerFirst ? x : o
  const p2 = pPlayerFirst ? o : x
  const { raiseError } = useError()

  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data',
      })
    }
  }, [stateCMS])

  const newGame = () => {
    let board = new Array(9).fill(undefined)
    setWinner(undefined)
    setGameInProgress(false)
    if (!pPlayerFirst) {
      setBoard(computerP2(board, 1, p1))
    } else {
      setBoard(board)
      setTicker(0)
    }
    // setSPlaterWins();
  }

  useEffect(() => {
    const t = ticker
    if (t == 0 && pPlayerFirst == 0 && mode != 2) {
      const firstBoard = computerP2([...board], 1, p2)
      setBoard(firstBoard)
      setTicker(0)
    }
    const outcome = calculateWinner(board)
    if (outcome[0]) {
      setWinner(outcome)
      setGameInProgress(false)
      if (outcome[0] == x) {
        let wins = pPlayerWins
        setPPlayerWins(wins + 1)
      } else if (outcome[0] == o) {
        let wins = sPlayerWins
        setSPlayerWins(wins + 1)
      }
    }
  }, [ticker])

  useEffect(() => {
    document.title = `Ttictactoe | ${scheme.title}`
    pull('tictactoeCms')
  }, [])

  const handleClick = (BoardIndex: number) => {
    if (winner) {
      return
    }
    setGameInProgress(true)
    let boardCopy = [...board]

    if (boardCopy[BoardIndex] === undefined) {
      let t = ticker
      boardCopy[BoardIndex] = t % 2 ? p2 : p1
      t += 1
      if (!calculateWinner(boardCopy)[0]) {
        if (mode !== 2) {
          boardCopy = computerP2(boardCopy, mode, p2)
          t += 1
        }
      }
      setBoard(boardCopy)
      setTicker(t)
    }
  }

  return {
    gameInProgress,
    mode,
    setMode,
    pPlayerFirst,
    setPPlayerFirst,
    board,
    setTicker,
    winner,
    setWinner,
    newGame,
    handleClick,
    sPlayerWins,
    pPlayerWins,
    scheme,
    stateCMS,
  }
}
