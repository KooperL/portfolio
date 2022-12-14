import { Scheme } from "../containers/context/type";

export function Button(props: {colours: Scheme, disabled?: Boolean, callBack?: Function, label?: string}) {
  const style = {
    backgroundColor: props.colours.button.bgSolid,
    color: props.colours.button.text,
    borderRadius: '10px',
    padding: '0.2rem 2rem',
    // margin: '10px'
  } as const;
  if(props.hasOwnProperty('callBack')) {
    return (
    // @ts-ignore - Sooo bad.... cmon ts, it exists!!!! 
    <button className="submit-button" value={props.label ?? 'Submit'} style={style} onClick={() => {props.callBack()}}>{props.label ?? 'Submit'}</button>
    )
  }
  return (
    <button className="submit-button" type='submit' name='submit' value={props.label ?? 'Submit'} style={style}>{props.label ?? 'Submit'}</button>
  );
}

// https://stackoverflow.com/questions/28365233/inline-css-styles-in-react-how-to-implement-ahover