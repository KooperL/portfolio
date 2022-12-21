import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { RandomBioPayload, RandomBioState, RandomBioInitialState, RandomBioPOST } from "./types";
import { fetchRandomBio } from "../App/api/randomBioApi";
import { SchemeContext } from "../context/colourScheme";
import './style.css';
import { Button } from "../../components/Button";
import { IslandCenter } from "../../templates/IslandCenter";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { Radio } from "../../components/Radio";


interface Props {
  dataCall: Function; 
}

function RandomBioPage(props: Props): JSX.Element {
  const [state, setState] = useState<RandomBioState>(RandomBioInitialState);
  const [value, setValue] = useState('');
  const [scheme, setScheme] = useContext(SchemeContext);
  const [length, setLength] = useState(100);
  const [type, setType] = useState(1);
  const [single, setSingle] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: RandomBioPOST) => {
    setState({...state, loading: true});
    event.preventDefault();
    props.dataCall(payload).then((resp: RandomBioPayload) => {
      if(resp.success && resp.data) {
        setState({
          details: resp,
          error: false,
          errorMessage: '',
          loading: false
        });
      } else {
        throw new Error(resp.error);
      }
    }).catch((err: any) => {
      console.log(err)
      setState({
        error: true,
        errorMessage: err,
        loading: false
      });
    })
  }
  
  useEffect(() => {
    document.title = `Random generator | ${scheme.title}`;
  }, []);

  function SearchBar(showingDesc: Boolean) {
    return (
      <div className="search-container">
        <div className="description" style={{color: scheme.body.text}}>
          {showingDesc?<p>Generate a random sequence of nucleotides or amino acid residues.</p>: <></>}
        </div>
        <div className="form">
          <form onSubmit={((e) => handleSubmit(e, {
            type: type,
            length: length,
            ...(type===3 && {single: +single})
          }))}>
            <div className="type">
              <Radio label="DNA" id="inputtype" name="inputtype" value="1" checked={type===1} onChange={((e) => {setType(+e.target.value)})} />
              <Radio label="RNA" id="inputtype" name="inputtype" value="2" checked={type===2} onChange={((e) => {setType(+e.target.value)})} />
              <Radio label="Amino acids" id="inputtype" name="inputtype" value="3" checked={type===3} onClick={((e) => {setType(+(e.target as HTMLTextAreaElement).value)})} />
            </div>
            <Input label="Sequence length:" name='length' id='length' value={length.toString()} onChange={((e) => {setLength(+e.target.value)})} />
            <div className="single">
              <p>Single letter abbreviations: </p>
              <input type="checkbox" id="inputtype" name="inputtype" value="t" disabled={type!==3} checked={single===true} onChange={((e) => {setSingle(!single)})}/>
            </div>
              <div className="button">
                <Button colours={scheme} />
              </div>
          </form>
        </div>
      </div>
    );
  }
  if(state.loading) {
   return <Spinner/>
  }
  if(state.error) {
    return (
      <div>
        {state.errorMessage?.toString()}
      </div>
    );
  }
  if(state.details && state.details.data) {
    console.log(state.details)
    const data = state.details.data;
    return (
      <IslandCenter>
        <div className="randomBioPage">
          <div className="searchArea">
            {SearchBar(window.outerWidth > 1000)}
          </div>
          <hr/>
          <div className="resultsCenter">
            <Textarea label="Results:" value={data.results} highlightOnFocus={true}/>
          </div>
        </div>
      </IslandCenter>
    );
  } else {
    return (
      <IslandCenter>
        <div className="randomBioPage">
          <>{SearchBar(true)}</>
        </div>
      </IslandCenter>
    );
  }
}


const enhance = (): JSX.Element => {
  return(
    <RandomBioPage dataCall={fetchRandomBio} />
  ) 
};

export default enhance;