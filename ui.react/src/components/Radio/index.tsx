import React from "react"
import "./style.css"

export function Radio(props: {
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  name?: string
  id?: string
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
}) {
  return (
    <div id="Radio-container">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="radio"
        value={props.value}
        name={props.name}
        id={props.id}
        onClick={props.onClick}
        checked={props.checked}
        disabled={props.disabled}
        defaultChecked={props.defaultChecked}
      />
    </div>
  )
}
