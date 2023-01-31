import { useContext, useEffect, useRef, useState } from "react"
import "./style.css"
import { SchemeContext } from "../../containers/context/colourScheme"
import { FuncProps, Props } from "./types"
import { Link } from "react-router-dom"
import { postMonitor } from "../../containers/App/api/loggerApi"
import { LoggingPOSTResponse } from "../Logger/types"
import { Globe } from "../Globe"
import { monitor } from "../../containers/authContext/context"

const letters = "abcdefghijklmnopqrstuvwxyz"

// const glitchText = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
const glitchText = (e: HTMLDivElement) => {
  // @ts-ignore
  // const ogText: string = e.target.innerText
  const ogText: string = e.innerText
  let iterations = 0

  // const dataVal = e.target.dataset.value
  // @ts-ignore
  const dataVal = e.attributes["data-value"].nodeValue

  const interval = setInterval(() => {
    // @ts-ignore
    if (iterations >= dataVal.length) clearInterval(interval)
    // @ts-ignore
    // e.target.innerText = ogText
    e.innerText = ogText
      .split("")
      .map((letter, index) => {
        // @ts-ignore
        if (index < iterations) return dataVal[index]
        return letters[Math.floor(Math.random() * letters.length)]
      })
      .join("")
    iterations += 3
  }, 60)

  // @ts-ignore
  // e.target.innerText = ogText
  e.innerText = ogText
}

function ButtonRedir(props: FuncProps) {
  const [scheme, setScheme] = useContext(SchemeContext)
  const [mouseOver, isMouseOver] = useState(false)
  const ref = useRef<any>()

  useEffect(() => {
    if (mouseOver) {
      glitchText(ref.current)
    }
    // console.log(ref.current)
  }, [mouseOver])

  if (props.data.local) {
    return (
      <div className="ButtonRedir container">
        <Link to={props.data.destination}>
          <div
            style={{ backgroundColor: scheme.button.bgSolid }}
            className="buttonRedir"
            onMouseEnter={() => isMouseOver(true)}
            onMouseLeave={() => isMouseOver(false)}
            onClick={async e => {
              monitor()
              if (props.data.onClickCallback) {
                props.data.onClickCallback()
              }
              // window.location = (window.location.host + props.data.destination)
            }}
          >
            <div
              className="data"
              // onMouseOver={glitchText}
              ref={ref}
              data-value={props.data.label}
            >
              {props.data.label}
            </div>
            {/* <Globe /> */}
          </div>
        </Link>
      </div>
    )
  }
  return (
    <a href={props.data.destination}>
      <div
        style={{ backgroundColor: scheme.button.bgSolid }}
        className="buttonRedir"
        onClick={async e => {
          monitor()
          if (props.data.onClickCallback) {
            props.data.onClickCallback()
          }
          // window.location = (window.location.host + props.data.destination)
        }}
      >
        <div className="data">{props.data.label}</div>
        <Globe />
      </div>
    </a>
  )
}

const enhance = (props: Props): JSX.Element => {
  return (
    <ButtonRedir
      data={props}
      monitorPost={monitor}
    />
  )
}

export default enhance
