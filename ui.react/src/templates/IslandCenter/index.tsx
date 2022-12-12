import { useContext } from 'react';
import { SchemeContext } from '../../containers/context/colourScheme';
import './style.css'


export function IslandCenter({ children }: any) {
  const [scheme, setScheme] = useContext(SchemeContext);

  const style = { "--bg-color": `${scheme.body.background}`, "--dot-color": `${scheme.body.foreground}` } as React.CSSProperties;
  return (
    <div className="IslandCenter container" style={style}>
      {/* <div className="IslandCenter parent"> */}
      <div className="IslandCenter island">
        <div className="IslandCenter child">
          <div className="IslandCenter island-background"></div>
          {children}
        </div>
      </div>
      <div className="background"></div>
      {/* </div> */}
    </div>
  )
}