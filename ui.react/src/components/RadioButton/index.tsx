import './style.css'

export function RadioButton(props: {
  name: string
  label: string
  value: string
  onclick?: (e?: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  // React.ChangeEvent<HTMLInputElement>
  // React.MouseEvent<HTMLInputElement, MouseEvent>
}): JSX.Element {
  return (
    <div className="radio-button-container">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="radio-button">
        {/* <p>{props.decorator}</p> */}
        <input
          value={props.value}
          name={props.name}
          type="radio"
          onClick={props.onclick}
        />
      </div>
    </div>
  )
}
