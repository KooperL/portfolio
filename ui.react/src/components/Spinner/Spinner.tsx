// @ts-nocheck

import React, { useContext } from "react"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import "./Spinner.css"

function Spinner() {
  const [scheme, setScheme] = useContext(SchemeContext)

  return (
    <>
      <svg
        className="spinner"
        viewBox="0 0 50 50"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          style={{
            stroke: scheme.body.h1,
          }}
        ></circle>
      </svg>
    </>
  )
}

export default Spinner
