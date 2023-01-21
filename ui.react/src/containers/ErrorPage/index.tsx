import { useContext } from "react"
import { ApiError } from "../../api/apiErrorHandler"
import { SchemeContext } from "../context/colourScheme"
import "./style.css"

interface Props {
  error: ApiError
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
          {props.error.code}
        </div>
        <div className="details">
          <div className="name">{props.error.name}</div>
          <div className="message">{props.error.message}</div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
