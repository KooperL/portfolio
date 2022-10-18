import { Navigate } from "react-router-dom";
import { postMonitor } from "../../containers/App/api/loggerApi";
import { LoggingPOSTResponse } from "../Logger/types";
import { FuncProps, Props } from "./types";


function Redirect(props: FuncProps) {
  props.monitorPost({
    uuid: localStorage.getItem('uuid'),
    session_id: sessionStorage.getItem('session_id'),
    page: window.location.pathname,
    ...(localStorage.getItem('currentPage') && {prevPage: localStorage.getItem('currentPage')})
  }).then((resp: LoggingPOSTResponse) => {
    if(resp.success) {
      localStorage.setItem('currentPage', window.location.pathname)
    } else {
      throw new Error(resp.error);
    }
  }).catch((err: any) => {
    console.log(err)
  })

  return (
    <Navigate
    to={props.data.destination}
  />
  )
}

const enhance = (props: Props): JSX.Element => {
  return(
    <Redirect data={props} monitorPost={postMonitor} />
  ) 
};

export default enhance;