import { SchemeContext } from '../../state/colorScheme/colourScheme'
import { useContext } from 'react'
// @ts-ignore
import globe from '../../assets/globe.svg'
import './style.css'

export function Globe(props: { variant?: 'small' | 'large' }) {
  // const [scheme, setScheme] = useContext(SchemeContext)

  const size = props.variant === 'small' ? 20 : 40
  // const col = scheme.body.
  const whiteFilter =
    'filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(159deg) brightness(110%) contrast(101%);'
  const darkFilter =
    'filter: brightness(0) saturate(100%) invert(0%) sepia(37%) saturate(4536%) hue-rotate(37deg) brightness(84%) contrast(95%);'
  return (
    <div
      id="globe"
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        style={{
          filter: whiteFilter,
        }}
        src={globe}
        alt={globe}
      />
    </div>
  )
}
