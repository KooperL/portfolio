// @ts-ignore
import globe from "../../assets/globe.svg"
import "./style.css"

export function Globe(props: { variant?: "small" | "large" }) {
  return (
    <div
      id="globe"
      style={{
        width: props.variant === "small" ? 20 : 40,
        height: props.variant === "small" ? 20 : 40,
      }}
    >
      <img
        src={globe}
        alt={globe}
      />
    </div>
  )
}
