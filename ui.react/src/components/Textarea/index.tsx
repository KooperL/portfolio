import React from 'react';
import './style.css'

export function Textarea(
  props: {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    id?: string;
    readOnly?: boolean;
    label?: string;
    resize?: string;
    height?: string;
    highlightOnFocus?: boolean
  }
) {
  return (
    <div id="Textarea">
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        value={props.value}
        onChange={props.onChange} 
        readOnly={props?.readOnly}
        name={props.name}
        id={props.id}
        style={{
          ...(props.hasOwnProperty('resize') && {resize: props.resize}) as {[key: string]: string;},
          ...(props.hasOwnProperty('height') && {height: props.height}) as {[key: string]: string;}
        }}
        onFocus={(e) => {if (!!props.highlightOnFocus) e.target.select()}}
      />
    </div>
  )
};
