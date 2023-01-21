import { useContext, useEffect, useState } from "react"
import "./style.css"
import { SchemeContext } from "../../containers/context/colourScheme"
import { Props } from "./types"
import { Link } from "react-router-dom"
import { postMonitor } from "../../containers/App/api/loggerApi"
import { LoggingPOSTResponse } from "../Logger/types"
import ButtonRedir from "../ButtonRedir"

function Hamburger(props: Props) {
  const [scheme, setScheme] = useContext(SchemeContext)
  const [open, setOpen] = useState(false)

  useEffect(() => {}, [open])

  const burgerButton = (
    <>
      <button
        onClick={() => {
          setOpen(!open)
        }}
      >
        <div
          className="icon"
          style={{ backgroundColor: scheme.body.h1 }}
        >
          <p className="hamburger-icon">{open ? "×" : "≡"}</p>
          <div className="hover-effect"></div>
        </div>
      </button>
    </>
  )

  // if(!open) {
  //   return (
  //     <div className="hamburger">
  //       {burgerButton}
  //       <div className={`links ${open ? 'open' : ''}`} style={{backgroundColor: scheme.body.background}}></div>
  //     </div>
  //   )
  // }

  return (
    <div className="hamburger">
      {burgerButton}
      <div
        className={`links ${open ? "open" : ""}`}
        style={{ backgroundColor: scheme.body.background }}
      >
        {/* <div className="links" style={{display: open ? 'fixed' : 'none'}}> */}
        {open ? (
          props.data.map((item, index) => (
            <ButtonRedir
              destination={item.destination}
              label={item.label}
              key={index}
              local={true}
              onClickCallback={() => {
                setOpen(false)
                if (item.callback) item.callback()
              }}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Hamburger
