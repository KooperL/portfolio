import { useContext } from "react"
import { State } from "src/types/State"
import { SchemeContext } from "../context/colourScheme"
import "./style.css"

interface Props {
  error: string
}

function ErrorPage(props: Props): JSX.Element {
  const [scheme, setScheme] = useContext(SchemeContext)

  return (
    <div className="errorPage">
      <div className="container">
        <div
          className="code"
          style={{ color: scheme.body.h1 }}
        >
          20x
        </div>
        <div className="details">
          <div className="message">{props.error}</div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
