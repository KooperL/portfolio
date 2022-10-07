import { useContext } from 'react';
import './style.css';
import { SchemeContext } from '../../containers/context/colourScheme';
import { Props } from './types';

function ButtonRedir(props: Props) {
  const [scheme, setScheme] = useContext(SchemeContext);

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