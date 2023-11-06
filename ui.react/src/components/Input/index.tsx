import React from 'react'
import './style.css'

export function Input(props: {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  autoComplete?: string
  name?: string
  id?: string
  placeholder?: string
  label?: string
  inputBoxLabel?: string
}) {
  return (
    <div id="Input-container">
      <label htmlFor={props.name}>{props.label}</label>
      <div id="Input">
        <div id="Input-decorator">
          <p>{props.inputBoxLabel}&nbsp;</p>
        </div>
        <input
          type="text"
          readOnly={props?.readOnly}
          autoComplete={props?.autoComplete}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          // style={{
          //   ...(
          //     !!props.inputBoxLabel ?
          //     {
          //       borderTopLeftRadius: '0',
          //       borderBottomLeftRadius: '0',
          //     } :
          //     {borderRadius: ''}
          //   )
          // }}
        />
      </div>
    </div>
  )
}
