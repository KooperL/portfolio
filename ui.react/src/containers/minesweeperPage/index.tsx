import React, { useContext, useEffect, useState } from "react"
// import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal"
// @ts-ignore
import gear from "../../assets/gear.svg"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"
import { IslandCenter } from "../../templates/IslandCenter"
import { Gear } from "../../components/Gear"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import {
  Cell,
  gameStateLookup,
  makeupLookup,
  useMinesweeperState,
} from "../../controllers/useMinesweeperState"
import { State } from "../../types/State"
import { cmsData } from "@containers/App/api/types"

interface Props {
  gridSize: number
  setGridSize: React.Dispatch<React.SetStateAction<number>>
  mineDensity: number
  setMineDensity: React.Dispatch<React.SetStateAction<number>>
  genFreshBoard: () => void
  gameState: number
  scheme: PageInformation
  timer: number
  grid: Cell[][]
  handleClick: (
    BoardIndexY: number,
    BoardIndexX: number,
    clickType: number,
  ) => void
  setMousePressDuration: React.Dispatch<React.SetStateAction<number>>
  mousePressDuration: number
  stateCMS: State<cmsData[]>
}

function Minesweeper(props: Props) {
  return (
    <IslandCenter>
      <div className="minesweeperPage">
        <div className="game-controls">
          <div className="game-control">
            <Modal closedChildren={<Gear variant="small" />}>
              <>
                <Input
                  label="Grid size:"
                  value={props.gridSize.toString()}
                  onChange={e => {
                    props.setGridSize(+e.target.value)
                    props.genFreshBoard()
                  }}
                />
                <Input
                  label="Mine density:"
                  value={props.mineDensity.toString()}
                  onChange={e => {
                    props.setMineDensity(+(+e.target.value / 10).toFixed(3))
                    props.genFreshBoard()
                  }}
                />
              </>
            </Modal>
          </div>
          <div className="game-control">
            {(gameStateLookup as any)[props.gameState]}
          </div>
          <div className="game-control">
            <span className="digits">
              {("0" + Math.floor((props.timer / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
              {("0" + Math.floor((props.timer / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits mili-sec">
              {("0" + ((props.timer / 10) % 100)).slice(-2)}
            </span>
          </div>
        </div>
        <div
          className="game"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${props.grid.length}, 1fr)`,
          }}
        >
          {props.grid.map((gridRow, y) => (
            // <div className="row" key={y}>
            <>
              {gridRow.map((cell: Cell, x: number) => (
                <div
                  className="cell"
                  key={x}
                >
                  <button
                    className="cell-button"
                    onContextMenu={e => {
                      e.preventDefault()
                      props.handleClick(y, x, 2)
                    }}
                    // onClick={((e) => {mprops.handleClick(y, x)})}
                    onMouseDown={e => {
                      props.setMousePressDuration(Date.now())
                    }}
                    onMouseUp={e => {
                      if (e.button !== 0) {
                        return
                      }
                      if (Date.now() - props.mousePressDuration > 300) {
                        props.handleClick(y, x, 2) // mouse press held
                      } else {
                        props.handleClick(y, x, 1)
                      }
                    }}
                    style={{
                      opacity: (+cell.revealed + 1) / 2,
                      backgroundColor: props.scheme.body.foreground,
                    }}
                  >
                    {cell.makeup === ""
                      ? cell.revealed
                        ? cell.neighbours > 0
                          ? cell.neighbours
                          : (makeupLookup as any)[cell.type.toString()]
                        : ""
                      : cell.makeup}
                  </button>
                </div>
              ))}
            </>
            // </div>
          ))}
        </div>
        <div className="game-controls">
          {/* <div className="reset-button"><button onClick={(e) => {genFreshBoard()}}>reset</button></div> */}
          <Button
            colours={props.scheme}
            callBack={() => {
              props.genFreshBoard()
            }}
            label="Reset board"
            action="button"
          />
        </div>
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <Minesweeper {...useMinesweeperState()} />
}

export default Enhance
