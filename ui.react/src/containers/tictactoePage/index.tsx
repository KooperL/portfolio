import React, { useContext, useEffect, useState } from "react"
// import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal"
// @ts-ignore
import gear from "../../assets/gear.svg"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"
import { IslandCenter } from "../../templates/IslandCenter"
import { Gear } from "../../components/Gear"
import { Radio } from "../../components/Radio"
import { Button } from "../../components/Button"
import {
  Board,
  CalculateWinner,
} from "../../controllers/useTictactoeState/types"
import { o, useTictactoeState, x } from "../../controllers/useTictactoeState"
import { State } from "../../types/State"
import { cmsData } from "@containers/App/api/types"

interface Props {
  gameInProgress: boolean
  mode: number
  setMode: React.Dispatch<React.SetStateAction<number>>
  pPlayerFirst: number
  setPPlayerFirst: React.Dispatch<React.SetStateAction<number>>
  board: Board
  setTicker: React.Dispatch<React.SetStateAction<number>>
  winner: undefined | CalculateWinner
  setWinner: React.Dispatch<React.SetStateAction<undefined | CalculateWinner>>
  newGame: () => void
  handleClick: (BoardIndex: number) => void
  sPlayerWins: number
  pPlayerWins: number
  scheme: PageInformation
  stateCMS: State<cmsData[]>
}

function Tictactoe(props: Props) {
  return (
    <IslandCenter>
      <div className="tictactoePage">
        {/* <div className="parent"> */}
        {/* <div className="sub-parent"> */}
        <div
          className="grid"
          style={{ backgroundColor: props.scheme.body.text }}
        >
          {props.board.map((square, i) => (
            // @ts-ignore
            <div
              key={i}
              className="grid-cell"
              style={{
                backgroundColor:
                  props.winner && props.winner[1].includes(i)
                    ? "#BBF7D0"
                    : props.scheme.body.foreground,
                borderColor: props.scheme.body.foreground,
              }}
            >
              <button
                className="grid-button"
                style={{}}
                onClick={() => props.handleClick(i)}
              >
                {square ? square : "(empty)"}
              </button>
            </div>
          ))}
        </div>
        <div className="scoreboard">
          <div className="scoreboard-item scoreboard-item-right">
            <p>{x}'s wins</p>
            <p>... {props.pPlayerWins}</p>
          </div>
          <Modal closedChildren={<Gear variant="large" />}>
            <Radio
              label="vs player 2"
              id="mode"
              name="mode"
              disabled={props.gameInProgress}
              value="2"
              checked={props.mode === 2}
              onClick={e => {
                props.setMode(2)
              }}
            />
            {/* <Radio label="vs Randomiser" id="mode" name="mode" disabled={props.gameInProgress} value="1" checked={props.mode===1} onClick={(e) => {props.setMode(1)}}/> */}
            <Radio
              label="vs miniMax"
              id="mode"
              name="mode"
              disabled={props.gameInProgress}
              value="0"
              checked={props.mode === 0}
              onClick={e => {
                props.setMode(0)
              }}
            />
            <div className="">
              <input
                type="checkbox"
                id="inputtype"
                value="s"
                checked={props.pPlayerFirst ? true : false}
                disabled={props.gameInProgress ? true : false}
                onChange={e => {
                  props.setPPlayerFirst(props.pPlayerFirst ? 0 : 1)
                  props.setTicker(0)
                }}
              />
              <label
                className="label"
                htmlFor="inputtype"
              >
                Primary player first?
              </label>
              <br />
            </div>
          </Modal>
          <div className="scoreboard-item scoreboard-item-left">
            <p>{o}'s wins</p>
            <p>{props.sPlayerWins} ...</p>
          </div>
        </div>
        <Button
          colours={props.scheme}
          callBack={() => {
            props.newGame()
          }}
          label="Reset board"
          action="button"
        />
        {/*   <div>
                          <button className="scoreboard-button" onClick={(e => { newGame() })}><p>Reset board</p></button>
                        </div> */}
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <Tictactoe {...useTictactoeState()} />
}

export default Enhance
