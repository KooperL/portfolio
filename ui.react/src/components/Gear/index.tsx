// @ts-ignore
import gear from "../../assets/gear.svg";
import './style.css'

export function Gear(props: {variant?: 'small' | 'large'}) {
  return (
    <div id="Gear" style={{width: props.variant==='small' ? 20 : 40, height: props.variant==='small' ? 20 : 40}}>
      <img src={gear} alt={gear} /> 
    </div>
  )
}