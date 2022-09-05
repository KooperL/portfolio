import { Scheme } from "../containers/context/type";

export function Button(props: {colours: Scheme, disabled?: Boolean}) {
  const style = {
    backgroundColor: props.colours.button.bgSolid,
    color: props.colours.button.text,
    borderRadius: '10px',
    padding: '0.2rem 2rem',
    // margin: '10px'
  } as const;
  return (
    <button className="submit-button" type='submit' name='submit' value='Submit' style={style}>Submit</button>
  );
}

// https://stackoverflow.com/questions/28365233/inline-css-styles-in-react-how-to-implement-ahover