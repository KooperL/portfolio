import { useContext } from 'react'
import { SchemeContext } from '../../state/colorScheme/colourScheme'
import './style.css'

export function IslandLeft({ children }: { children: React.ReactNode }) {
  const [scheme, setScheme] = useContext(SchemeContext)

  const style = {
    '--bg-color': `${scheme.body.background}`,
    '--dot-color': `${scheme.body.foreground}`,
  } as React.CSSProperties
  return (
    <div style={style}>
      <div className="IslandLeft container">
        <div className="IslandLeft island">
          <div className="IslandLeft island-background"></div>
          {children}
        </div>
        <div className="background"></div>
      </div>
    </div>
  )
}
