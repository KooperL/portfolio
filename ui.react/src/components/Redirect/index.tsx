import { LoggingResponsePayload } from "src/components/Logger/types"
import { Navigate, useNavigate } from "react-router-dom"
import { sendMonitor } from "src/api/clients/ApiHandler/routes/sendMonitor"
import { FuncProps, Props } from "./types"

function Redirect(props: FuncProps) {
  props
    .monitorPost({
      uuid: localStorage.getItem("uuid"),
      session_id: sessionStorage.getItem("session_id"),
      page: window.location.pathname,
      ...(localStorage.getItem("currentPage") && {
        prevPage: localStorage.getItem("currentPage"),
      }),
    })
    .then((resp: LoggingResponsePayload) => {
      if (resp.success) {
        localStorage.setItem("currentPage", window.location.pathname)
      } else {
        throw new Error(resp.error)
      }
    })
    .catch((err: any) => {
      console.log(err)
    })

  // if(props.data.programatic) {
  //   return (
  //     <Redirect
  //       to={props.data.destination}
  //     />
  //   )
  // }

  return <Navigate to={props.data.destination} />
}

const enhance = (props: Props): JSX.Element => {
  return (
    <Redirect
      data={props}
      monitorPost={sendMonitor}
    />
  )
}

export default enhance
