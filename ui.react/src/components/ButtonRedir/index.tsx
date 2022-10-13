import { useContext } from 'react';
import './style.css';
import { SchemeContext } from '../../containers/context/colourScheme';
import { Props } from './types';
import { Link } from 'react-router-dom';

function ButtonRedir(props: Props) {
  const [scheme, setScheme] = useContext(SchemeContext);

  if(props.local) {

    return (
      <Link to={props.destination}>
        <div style={{backgroundColor: scheme.button.bgSolid}} className="buttonRedir" onClick={async (e) => {
          if(props.onClickCallback) {
            props.onClickCallback()
          }
          // window.location = (window.location.host + props.destination)
        }}>
          {props.label}
        </div>
      </Link>
    )
  }
  return (
    <a href={props.destination}>
      <div style={{backgroundColor: scheme.button.bgSolid}} className="buttonRedir" onClick={async (e) => {
        if(props.onClickCallback) {
          props.onClickCallback()
        }
        // window.location = (window.location.host + props.destination)
      }}>
        {props.label}
      </div>
    </a>
  )
}

export default ButtonRedir;