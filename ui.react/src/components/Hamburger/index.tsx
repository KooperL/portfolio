import { useContext, useEffect, useState } from 'react';
import './style.css';
import { SchemeContext } from '../../containers/context/colourScheme';
import { Props } from './types';
import { Link } from 'react-router-dom';
import { postMonitor } from '../../containers/App/api/loggerApi';
import { LoggingPOSTResponse } from '../Logger/types';
import ButtonRedir from '../ButtonRedir'

function Hamburger(props: Props) {
  const [scheme, setScheme] = useContext(SchemeContext);
  const [style, setStyle] = useState({display:'none'});

  const handleToggle = () => {
    if(style.display === 'none') {
      setStyle({display:'static'})
      console.log('should appear')
    } else {
      setStyle({display:'none'})
    }
  }

  return (
    <div className="hamburger">
      <button onClick={() => {handleToggle()}}>
        <div className="icon" style={{backgroundColor: scheme.body.h1}}>
          <p className="hamburger-icon">≡</p>
        </div>
      </button>
      <div className="links" style={style}>
      {/* <div className="links" style={{display: open ? 'fixed' : 'none'}}> */}
        {props.data.map((item, index) => (
          <ButtonRedir destination={item.destination} label={item.label} key={index} local={true} onClickCallback={item?.callback}/>
        ))}
      </div>
    </div>
  )
}

export default Hamburger;