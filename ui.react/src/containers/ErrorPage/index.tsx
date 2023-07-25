import { useContext } from "react"
import { State } from "src/types/State"
import { SchemeContext } from "../context/colourScheme"
import "./style.css"

interface Props <T> {
  error: State<T>
}

function ErrorPage<T>(props: Props<T>): JSX.Element {
  const [scheme, setScheme] = useContext(SchemeContext)

  return (
    <div className="errorPage">
      <div className="container">
        <div
          className="code"
          style={{ color: scheme.body.h1 }}
        >
          123 TODO HI KOOPER
        </div>
        <div className="details">
          <div className="message">{props.error.errorMessage}</div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
