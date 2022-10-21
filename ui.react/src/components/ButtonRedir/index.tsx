import { useContext, useEffect } from 'react';
import './style.css';
import { SchemeContext } from '../../containers/context/colourScheme';
import { FuncProps, Props } from './types';
import { Link } from 'react-router-dom';
import { postMonitor } from '../../containers/App/api/loggerApi';
import { LoggingPOSTResponse } from '../Logger/types';

function ButtonRedir(props: FuncProps) {
  const [scheme, setScheme] = useContext(SchemeContext);

  useEffect(() => {
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
  }, [])

  if(props.data.local) {
    return (
      <Link to={props.data.destination}>
        <div style={{backgroundColor: scheme.button.bgSolid}} className="buttonRedir" onClick={async (e) => {
          if(props.data.onClickCallback) {
            props.data.onClickCallback()
          }
          // window.location = (window.location.host + props.data.destination)
        }}>
          {props.data.label}
        </div>
      </Link>
    )
  }
  return (
    <a href={props.data.destination}>
      <div style={{backgroundColor: scheme.button.bgSolid}} className="buttonRedir" onClick={async (e) => {
        if(props.data.onClickCallback) {
          props.data.onClickCallback()
        }
        // window.location = (window.location.host + props.data.destination)
      }}>
        {props.data.label}
      </div>
    </a>
  )
}

const enhance = (props: Props): JSX.Element => {
  return(
    <ButtonRedir data={props} monitorPost={postMonitor} />
  ) 
};

export default enhance;