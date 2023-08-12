import { useContext, useEffect, useState } from "react"
import { useCms } from "src/hooks/useCms"
import { useError } from "src/hooks/useError"
import { useFetch } from "src/hooks/useFetch"
import { SchemeContext } from "../../state/colorScheme/colourScheme"

interface DensityMap {
  [key: string]: number
}

const typeLookup = {
  blank: 0,
  mine: 1,
  explodedMine: 2,
  flag: 3,
  unsure: 4,
}

export const makeupLookup = {
  0: "",
  1: "💣",
  2: "💥",
  3: "🚩",
  4: "❓",
}

export class Cell {
  public type: number
  public revealed
  public coords
  public neighbours: number = 0
  public makeup: string

  constructor(type: number, coords: { x: number; y: number }) {
    this.coords = coords
    this.type = type
    this.makeup = (makeupLookup as any)[this.type]
    this.revealed = false
  }
  countNeighbours(grid: Cell[][]) {
    // console.log(grid)
    if (this.type === 1) {
      this.neighbours = -1
    } else {
      let total = 0
      for (let yOff = -1; yOff <= 1; yOff++) {
        for (let xOff = -1; xOff <= 1; xOff++) {
          let i = this.coords.x + xOff
          let j = this.coords.y + yOff
          if (i > -1 && i < grid.length && j > -1 && j < grid.length) {
            let neighbnour = grid[j][i]
            if (neighbnour.type === 1) {
              total++
            }
          }
        }
      }
      this.neighbours = total
    }
  }

  cycleAlt() {
    if (this.makeup === makeupLookup[0]) {
      this.makeup = makeupLookup[3]
      this.revealed = true
    } else if (this.makeup === makeupLookup[3]) {
      this.makeup = makeupLookup[4]
      this.revealed = true
    } else if (this.makeup === makeupLookup[4]) {
      this.makeup = makeupLookup[0]
      this.revealed = false
    }
  }

  identity() {
    switch (this.type) {
      case 0:
        return this.neighbours > 0 ? this.neighbours.toString() : "2"
      case 1:
        return makeupLookup[this.type]
      case 2:
        return makeupLookup[this.type]
      case 3:
        return makeupLookup[this.type]
      case 4:
        return makeupLookup[this.type]
    }
  }

  reveal(grid: Cell[][]) {
    if (this.type === 1) {
      this.bombClicked(grid)
    } else {
      this.revealed = true
      if (this.neighbours === 0) {
        this.floodFill(grid)
      }
    }
  }

  floodFill(grid: Cell[][]) {
    for (let yOff = -1; yOff <= 1; yOff++) {
      for (let xOff = -1; xOff <= 1; xOff++) {
        let i = this.coords.x + xOff
        let j = this.coords.y + yOff
        if (i > -1 && i < grid.length && j > -1 && j < grid.length) {
          let neighbnour = grid[j][i]
          if (neighbnour.type === 0 && !neighbnour.revealed) {
            neighbnour.reveal(grid)
          }
        }
      }
    }
  }

  hydrateCoords(x: number, y: number) {
    this.coords = { x: x, y: y }
  }
  bombClicked(grid: Cell[][]) {
    const gridSize = grid.length
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = grid[y][x]
        if (cell.type === 1) {
          cell.type = 2
          cell.revealed = true
        }
      }
    }
    // return grid
  }
}

function randomPopulate(grid: Cell[][], densityMap: DensityMap) {
  let gridOptions = grid.map(function (arr) {
    return arr.slice()
  })
  let gridSize = grid.length ** 2
  let special: any = {}
  const densityMapKeys = Object.keys(densityMap)
  for (let i = 0; i < densityMapKeys.length; i++) {
    // @ts-ignore
    special[densityMapKeys[i]] = Math.floor(
      gridSize * densityMap[densityMapKeys[i]],
    )
  }
  const specialKeys = Object.keys(special)
  for (let i = 0; i < specialKeys.length; i++) {
    for (let a = 0; a < special[specialKeys[i]]; a++) {
      const randY = Math.floor(Math.random() * gridOptions.length)
      const randX = Math.floor(Math.random() * gridOptions[randY].length)
      // console.log(randY, randX)
      // console.log(gridOptions)
      // console.log(grid)
      grid[randY][randX].type = +specialKeys[i]
      gridOptions[randY].splice(randX, 1)
    }
  }
  return grid
}

export const gameStateLookup = {
  0: "⏳", // Loading
  1: "🙂", // In progress
  2: "😵", // Lost
  3: "😄", // Won
}

export const useMinesweeperState = () => {
  const [gridSize, setGridSize] = useState(10)
  const [mineDensity, setMineDensity] = useState(0.1)
  const [grid, setGrid] = useState([[new Cell(0, { x: 0, y: 0 })]])
  const [clicks, setClicks] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timerIsActive, setTimerIsActive] = useState(false)
  const [timerIsPaused, setTimerIsPaused] = useState(true)
  const [mousePressDuration, setMousePressDuration] = useState(-1)
  const [gameState, setGameState] = useState(0)
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()
  const { raiseError } = useError();
  
  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data'
      })
    }
  }, [stateCMS])

  useEffect(() => {
    document.title = `Minesweeper | ${scheme.title}`
    pull("minesweeperCms")
  }, [])

  function genFreshBoard() {
    let newGrid = new Array(gridSize)
    for (let y = 0; y < newGrid.length; y++) {
      newGrid[y] = new Array(gridSize)
    }
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        newGrid[y][x] = new Cell(0, { x: x, y: y })
      }
    }
    newGrid = randomPopulate(newGrid, { 1: mineDensity })
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        newGrid[y][x].countNeighbours(newGrid)
      }
    }
    setGrid(newGrid)
    setGameState(1)
    handleReset()
    handleStart()
  }

  function checkWin() {
    if (gameState !== 1) {
      return
    }
    const gridSize = grid.length
    let freeEmptyCells = 0
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const cell = grid[y][x]
        if (
          (cell.type === 0 && cell.revealed) ||
          (cell.type === 1 && cell.makeup === makeupLookup[3])
        ) {
          freeEmptyCells++
        } else if (cell.type === 2) {
          setGameState(2)
          setTimerIsActive(false)
          setTimerIsPaused(true)
          return
        }
      }
    }

    if (freeEmptyCells === grid.length ** 2) {
      setGameState(3)
      setTimerIsActive(false)
      setTimerIsPaused(true)
    }
  }

  useEffect(() => {
    let interval: any = null

    if (timerIsActive && timerIsPaused === false) {
      interval = setInterval(() => {
        setTimer(timer => timer + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [timerIsActive, timerIsPaused])

  const handleStart = () => {
    setTimerIsActive(true)
    setTimerIsPaused(false)
  }

  const handlePause = () => {
    setTimerIsPaused(true)
  }

  const handleReset = () => {
    setTimerIsActive(false)
    setTimer(0)
  }

  useEffect(() => {
    genFreshBoard()
  }, [])

  useEffect(() => {
    checkWin()
  }, [clicks])

  const actionPress = (BoardIndexY: number, BoardIndexX: number) => {
    grid[BoardIndexY][BoardIndexX].reveal(grid)
    // setGrid(grid);
  }
  const altPress = (BoardIndexY: number, BoardIndexX: number) => {
    grid[BoardIndexY][BoardIndexX].cycleAlt()
  }

  const handleClick = (
    BoardIndexY: number,
    BoardIndexX: number,
    clickType: number,
  ) => {
    if (gameState) {
      switch (clickType) {
        case 1:
          actionPress(BoardIndexY, BoardIndexX)
          break
        case 2:
          altPress(BoardIndexY, BoardIndexX)
          break
      }
      setClicks(clicks + 1)
    }
  }
  return {
    gridSize,
    setGridSize,
    mineDensity,
    setMineDensity,
    genFreshBoard,
    gameStateLookup,
    gameState,
    scheme,
    timer,
    grid,
    handleClick,
    setMousePressDuration,
    mousePressDuration,
    stateCMS,
  }
}
