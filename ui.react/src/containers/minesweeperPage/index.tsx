import React, { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
// @ts-ignore
import gear from "../../assets/gear.svg";
import { SchemeContext } from "../context/colourScheme";
import './style.css';
import { IslandCenter } from "../../templates/IslandCenter";
import { Gear } from "../../components/Gear";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

interface DensityMap {
  1: number;              // Mine
}

const typeLookup = {
  blank: 0,
  mine: 1,
  explodedMine: 2,
  flag: 3,
  unsure: 4
}

const makeupLookup = {
  0: '',
  1: '💣',
  2: '💥',
  3: '🚩',
  4: '❓'
}

class Cell {
  public type: number;
  public revealed;
  public coords;
  public neighbours: number = 0;
  public makeup: string;

  constructor(type: number, coords: {x: number; y: number;}) {
    this.coords = coords;
    this.type = type;
    this.makeup = (makeupLookup as any)[this.type];
    this.revealed = false;
  }
  countNeighbours(grid: Cell[][]) {
    // console.log(grid)
    if(this.type === 1) {
      this.neighbours = -1;
    } else {
      let total = 0;
      for(let yOff = -1; yOff <=1; yOff++) {
        for(let xOff = -1; xOff <=1; xOff++) {
          let i = this.coords.x + xOff;
          let j = this.coords.y + yOff;
          if(i > -1 && i < grid.length && j > -1 && j < grid.length) {
            let neighbnour = grid[j][i];
            if(neighbnour.type === 1) {
              total++;
            }
          }
        }
      }
      this.neighbours = total;
    }
  }

  cycleAlt() {
    if(this.makeup === makeupLookup[0]) {
      this.makeup = makeupLookup[3];
      this.revealed = true;
    } else if(this.makeup === makeupLookup[3]) {
      this.makeup = makeupLookup[4];
      this.revealed = true;
    } else if(this.makeup === makeupLookup[4]) {
      this.makeup = makeupLookup[0];
      this.revealed = false;
    }
  }

  identity() {
    switch(this.type) {
      case 0:
        return (this.neighbours > 0 ? this.neighbours.toString() : '2');
      case 1:
        return makeupLookup[this.type];
      case 2:
        return makeupLookup[this.type];
      case 3:
        return makeupLookup[this.type];
      case 4:
        return makeupLookup[this.type];
    }
  }

  reveal(grid: Cell[][]) {
    if(this.type === 1) {
      this.bombClicked(grid);
    } else {
      this.revealed = true;
      if(this.neighbours === 0) {
        this.floodFill(grid);
      }
    }
  }

  floodFill(grid: Cell[][]) {
    for(let yOff = -1; yOff <=1; yOff++) {
      for(let xOff = -1; xOff <=1; xOff++) {
        let i = this.coords.x + xOff;
        let j = this.coords.y + yOff;
        if(i > -1 && i < grid.length && j > -1 && j < grid.length) {
          let neighbnour = grid[j][i];
          if(neighbnour.type === 0 && !neighbnour.revealed) {
            neighbnour.reveal(grid);
          }
        }
      }
    }
  }

  hydrateCoords(x: number, y: number) {
    this.coords = {x: x, y: y};
  }
  bombClicked(grid: Cell[][]) {
    const gridSize = grid.length;
    for(let y = 0; y < gridSize; y++) {
      for(let x = 0; x < gridSize; x++) {
        const cell = grid[y][x];
        if(cell.type === 1) {
          cell.type = 2;
          cell.revealed = true;
        }
      }
    }
    // return grid
  }
}



function randomPopulate(grid: Cell[][], densityMap: DensityMap) {
  let gridOptions = grid.map(function(arr) {
    return arr.slice();
  });
  let gridSize = grid.length**2;
  let special: any = {}
  const densityMapKeys = Object.keys(densityMap)
  for (let i = 0; i < densityMapKeys.length; i++) {
    // @ts-ignore
    special[densityMapKeys[i]] = Math.floor(gridSize * densityMap[densityMapKeys[i]])
  }
  const specialKeys = Object.keys(special)
  for (let i = 0; i < specialKeys.length; i++) {
    for(let a = 0; a < special[specialKeys[i]]; a++) {
      const randY = Math.floor(Math.random()*gridOptions.length);
      const randX = Math.floor(Math.random()*gridOptions[randY].length);
      // console.log(randY, randX)
      // console.log(gridOptions)
      // console.log(grid)
      grid[randY][randX].type = +specialKeys[i];
      gridOptions[randY].splice(randX, 1);
    }
  }
  return grid;
}


const gameStateLookup = {
  0: '⏳', // Loading
  1: '🙂', // In progress
  2: '😵', // Lost
  3: '😄' // Won
}


export default function Minesweeper() {
  const [gridSize, setGridSize] = useState(10);
  const [mineDensity, setMineDensity] = useState(0.1);
  const [grid, setGrid] = useState([[new Cell(0, {x: 0, y: 0})],]);
  const [clicks, setClicks] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(true);
  const [mousePressDuration, setMousePressDuration] = useState(-1);
  const [gameState, setGameState] = useState(0);
  const [scheme, setScheme] = useContext(SchemeContext);


  useEffect(() => {
    document.title = `Minesweeper | ${scheme.title}`;
  }, []);

  function genFreshBoard() {
    let newGrid = new Array(gridSize)
    for(let y = 0; y < newGrid.length; y++) {
      newGrid[y] = new Array(gridSize)
    }
    for(let y = 0; y < gridSize; y++) {
      for(let x = 0; x < gridSize; x++) {
        newGrid[y][x] = new Cell(0, {x: x, y: y});
      }
    }
    newGrid = randomPopulate(newGrid, {1: mineDensity});
    for(let y = 0; y < gridSize; y++) {
      for(let x = 0; x < gridSize; x++) {
        newGrid[y][x].countNeighbours(newGrid);
      }
    }
    setGrid(newGrid);
    setGameState(1);
    handleReset();
    handleStart();
  }

  function checkWin() {
    if(gameState !== 1) {return}
    const gridSize = grid.length;
    let freeEmptyCells = 0
    for(let y = 0; y < gridSize; y++) {
      for(let x = 0; x < gridSize; x++) {
        const cell = grid[y][x];
        if((cell.type === 0 && cell.revealed) || cell.type === 1 && cell.makeup === makeupLookup[3]) {
          freeEmptyCells++;
        } else if(cell.type === 2) {
          setGameState(2);
          setTimerIsActive(false)
          setTimerIsPaused(true)
          return;
        }
      }
    }

    if(freeEmptyCells === grid.length ** 2) {
      setGameState(3);
      setTimerIsActive(false)
      setTimerIsPaused(true)
    }
  }

  useEffect(() => {
    let interval: any = null;
  
    if (timerIsActive && timerIsPaused === false) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerIsActive, timerIsPaused]);
  
  const handleStart = () => {
    setTimerIsActive(true);
    setTimerIsPaused(false);
  };
  
  const handlePause = () => {
    setTimerIsPaused(true);
  };
  
  const handleReset = () => {
    setTimerIsActive(false);
    setTimer(0);
  };

  useEffect(() => {
    genFreshBoard();
  }, [])

  useEffect(() => {
    checkWin();
  }, [clicks])

  const actionPress = (BoardIndexY: number, BoardIndexX: number) => {
    grid[BoardIndexY][BoardIndexX].reveal(grid);
    // setGrid(grid);
  }
  const altPress = (BoardIndexY: number, BoardIndexX: number) => {
    grid[BoardIndexY][BoardIndexX].cycleAlt();
  }

  const handleClick = (BoardIndexY: number, BoardIndexX: number, clickType: number) => {
    if(gameState) {
      switch(clickType) {
        case 1:
          actionPress(BoardIndexY, BoardIndexX);
          break;
        case 2:
          altPress(BoardIndexY, BoardIndexX);
          break;
      }
      setClicks(clicks+1);
    }
  };

  return (
    <IslandCenter>
      <div className="minesweeperPage">
        <div className="game-controls">
          <div className="game-control">
            <Modal closedChildren={<Gear variant="small"/>} >
                <>
                  <Input label="Grid size:" value={gridSize.toString()} onChange={((e) => {setGridSize(+e.target.value);genFreshBoard();})} />
                  <Input label="Mine density:" value={mineDensity.toString()} onChange={((e) => {setMineDensity(+(+e.target.value/10).toFixed(3));genFreshBoard();})} />
                </>
            </Modal>
          </div>
          <div className="game-control">{(gameStateLookup as any)[gameState]}</div>
          <div className="game-control">
            <span className="digits">
              {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
              {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits mili-sec">
              {("0" + ((timer / 10) % 100)).slice(-2)}
            </span>
          </div>

          </div>
          <div className="game" style={{display: 'grid', gridTemplateColumns: `repeat(${grid.length}, 1fr)`}}>
            {grid.map((gridRow, y) => (
              // <div className="row" key={y}>
              <>
              {gridRow.map((cell: Cell, x: number) => (
                <div className="cell" key={x}>
                  <button className="cell-button" 
                    onContextMenu={((e) => {e.preventDefault();handleClick(y, x, 2)})}
                    // onClick={((e) => {mhandleClick(y, x)})}
                    onMouseDown={(e) => {setMousePressDuration(Date.now())}}
                    onMouseUp={((e) => {if(e.button!==0){return};if((Date.now() - mousePressDuration) > 300){
                      handleClick(y, x, 2) // mouse press held
                    } else {
                      handleClick(y, x, 1)
                    }})}
                    style={{opacity: (+cell.revealed+1)/2, backgroundColor: scheme.body.foreground}}
                  >{cell.makeup === '' ? (cell.revealed ? (cell.neighbours > 0 ? cell.neighbours : (makeupLookup as any)[cell.type.toString()]) : '') : cell.makeup}</button>
                </div>
              ))}
                </>
              // </div>
            ))}
          </div>
          <div className="game-controls">
            {/* <div className="reset-button"><button onClick={(e) => {genFreshBoard()}}>reset</button></div> */}
            <Button colours={scheme} callBack={(() => { genFreshBoard() })} label="Reset board" action="button"/>

          </div>
        </div>
      </IslandCenter>
  )
} 





