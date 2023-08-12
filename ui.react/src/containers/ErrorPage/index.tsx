import { useContext } from "react"
import { State } from "src/types/State"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import "./style.css"
import { ErrorPageProps } from "./types"

function ErrorPage(props: ErrorPageProps): JSX.Element {
  const [scheme, setScheme] = useContext(SchemeContext)

  return (
    <div className="errorPage">
      <div className="container">
        <div
          className="code"
          style={{ color: scheme.body.h1 }}
        >
          {props.decorator ?? ':('}
        </div>
        <div className="details">
          <div className="message">{props.errorMessage}</div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
