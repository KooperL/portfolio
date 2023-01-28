import { useContext, useEffect, useRef } from "react"
import "./style.css"
import { SchemeContext } from "../../containers/context/colourScheme"
import { FuncProps, Props } from "./types"
import { Link } from "react-router-dom"
import { postMonitor } from "../../containers/App/api/loggerApi"
import { LoggingPOSTResponse } from "../Logger/types"
import { Globe } from "../Globe"

const letters = 'abcdefghijklmnopqrstuvwxyz'

function ButtonRedir(props: FuncProps) {
  const [scheme, setScheme] = useContext(SchemeContext)
  const ref = useRef(0)

  // useEffect(() => {
  // if(ref.current === 0) {
  function monitor() {
    props
      .monitorPost({
        uuid: localStorage.getItem("uuid"),
        session_id: sessionStorage.getItem("session_id"),
        page: window.location.pathname,
        ...(localStorage.getItem("currentPage") && {
          prevPage: localStorage.getItem("currentPage"),
        }),
      })
      .then((resp: LoggingPOSTResponse) => {
        if (resp.success) {
          localStorage.setItem("currentPage", window.location.pathname)
        } else {
          throw new Error(resp.error)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
    // }, [])
  }

  const glitchText = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e)
    // @ts-ignore
    const ogText: string = e.target.innerText
    let iterations = 0
    const interval = setInterval(() => {
      // @ts-ignore
      if (iterations >= e.target.dataset.value.length) clearInterval(interval)
      // @ts-ignore
      e.target.innerText = ogText.split('').map((letter, index) => {
      // @ts-ignore
        if (index < iterations) return e.target.dataset.value[index]
        return letters[Math.floor(Math.random() * letters.length)]
      }).join('')
      iterations+=3
    }, 60)

    // @ts-ignore
    e.target.innerText = ogText
  }

  if (props.data.local) {
    return (
      <div className="ButtonRedir container">
        <Link to={props.data.destination}>
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
            
            <div className="data" onMouseOver={glitchText} data-value={props.data.label}>{props.data.label}</div>
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
      monitorPost={postMonitor}
    />
  )
}

export default enhance
