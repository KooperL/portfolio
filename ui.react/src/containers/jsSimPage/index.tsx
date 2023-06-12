import React, { useContext, useEffect, useRef, useState } from "react"
// import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal"
// @ts-ignore
import gear from "../../assets/gear.svg"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"
import { IslandCenter } from "../../templates/IslandCenter"
import { Button } from "../../components/Button"
import { useJssimState } from "../../controllers/useJssimState"
import { State } from "../../types/State"
import { CMSPage } from "../../components/TypeLookup/types"
import TypeLookup from "../../components/TypeLookup"

interface Props {
  timer: number
  setTimer: React.Dispatch<React.SetStateAction<number>>
  score: number
  referenceString: string[]
  referenceIndex: number
  typedString: string[]
  selectString: (index?: number) => void
  scoreColourLookup: {
    [key: string]: string
  }
  scoreTally: number[]
  scheme: PageInformation
  stateCMS: State<CMSPage>
}

function JsSim(props: Props) {
  return (
    <IslandCenter>
      <div className="jsSimPage">
        <div className="instrucions">
          <TypeLookup {...props.stateCMS} />
        </div>
        <hr />
        <div className="info">
          <div className="timer">
            <span className="digits">
              {("0" + Math.floor((props.timer / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
              {("0" + Math.floor((props.timer / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits mili-sec">
              {("0" + ((props.timer / 10) % 100)).slice(-2)} ⏱️
            </span>
          </div>
          <div>{props.score}% 🎯</div>
        </div>
        <div className="string">
          {props.referenceString.map((char, index) => (
            // @ts-ignore
            <span
              key={index}
              style={{
                color: props.typedString[index]
                  ? props.scoreColourLookup[props.scoreTally[index]]
                  : props.scoreColourLookup[0],
              }}
            >
              {props.typedString[index] ?? char}
            </span>
          ))}
        </div>
        <div className="buttons">
          <Button
            colours={props.scheme}
            callBack={() => props.selectString(props.referenceIndex)}
            label="reset"
          />
          <Button
            colours={props.scheme}
            callBack={() => props.selectString()}
            label="new"
          />
        </div>
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <JsSim {...useJssimState()} />
}

export default Enhance
