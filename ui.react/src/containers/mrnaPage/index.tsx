import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { MrnaPayload, MrnaState, MrnaInitialState, MrnaPOST } from "./types";
import { fetchMrna } from "../App/api/MrnaApi";
import { SchemeContext } from "../context/colourScheme";
import './style.css';
import { Button } from "../../components/Button";
import { IslandCenter } from "../../templates/IslandCenter";
import { Input } from "../../components/Input";
import ErrorPage from "../ErrorPage";


interface Props {
  dataCall: Function; 
}

function MrnaPage(props: Props): JSX.Element {
  const [state, setState] = useState<MrnaState>(MrnaInitialState);
  const [value, setValue] = useState('');
  const [scheme, setScheme] = useContext(SchemeContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: MrnaPOST) => {
    setState({...state, loading: true});
    event.preventDefault();
    props.dataCall(payload).then((resp: MrnaPayload) => {
      if(resp.success && resp.data) {
        setState({
          details: resp,
          error: false,
          errorMessage: null,
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
    document.title = `DNA decoder | ${scheme.title}`;
  }, []);

  function SearchBar(showingDesc: Boolean) {
    return (
      <div className="search-container">
        <div className="description" style={{color: scheme.body.text}}>
          {showingDesc?<p>Enter a DNA sequence to see a breakdown of its components.</p>: <></>}
        </div>
          <form onSubmit={((e) => handleSubmit(e, {
            dna_field_id: value
          }))}>
            <div className="inputWithButton">
              <Input inputBoxLabel="🧬 DNA:" placeholder=" GATTACA..." value={value} onChange={((e) => {setValue(e.target.value)})}/>
              <div className="button">
                <Button colours={scheme} />
              </div>
            </div>
          </form>
      </div>
    );
  }
  if(state.loading) return <Spinner/>
  if(state.error && state.errorMessage) return <ErrorPage error={state.errorMessage} />
  if(state.details && state.details.data) {

    const data = state.details.data;
    return (
      <div className="mrnaPage">
        <IslandCenter>
          <div className="resultsScreen">
            <div className="searchArea">
              {SearchBar(window.outerWidth > 1000)}
            </div>
            <hr/>
            <div className="resultsCenter">
              <div className="resultsContainer">
                <div>
                  <h2>Results: </h2>
                </div>
                <div className="analysisContainer">
                  <div className="result" >
                    <p className="font-bold">Amino acids: </p>
                    <textarea className="" name="aa" value={data.aa} readOnly={true} />
                  </div>
                  <div className="result" >
                    <p className="font-bold">Amino acids (single): </p>
                    <textarea className="" name="aa" value={data.aa_s} readOnly={true} />
                  </div>
                  <div className="result" >
                    <p className="font-bold">mRNA: </p>
                    <textarea className="" name="aa" value={data.mrna_field} readOnly={true} />
                  </div>
                  <div className="result" >
                    <p className="font-bold">DNA: </p>
                    <textarea className="" name="aa" value={data.dna_field} readOnly={true} />
                  </div>
                  <div className="result" >
                    <p className="font-bold">Complimentary DNA: </p>
                    <textarea className="" name="aa" value={data.rdna_field} readOnly={true} />
                  </div>
                  <div className="result paddingCell" ></div>
                </div>
                <div className="analysisContainer statsContainer">
                  <div className="result" >
                    <p className="font-bold">Stats: </p>
                    <p>Melting temperature (Tm in °C)</p>
                    <textarea className="" name="aa" value={data.tm} readOnly={true} />
                    <p>GC content:</p>
                    <textarea className="" name="aa" value={data.gccontent} readOnly={true} />
                    <p>Molecular weight:</p>
                    <textarea className="" name="aa" value={data.molweight} readOnly={true} />
                    <p>Base frequency:</p>
                    {Object.keys(data.simplecount).map((link, indexLink) => (
                      // @ts-ignore, dumbest fucking error, come on ts
                      <p key={indexLink}>{link}: {data.simplecount[link]}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IslandCenter>
      </div>
    );
  } else {
    return (
      <div className="mrnaPage">
        <IslandCenter>
          <>{SearchBar(true)}</>
        </IslandCenter>
      </div>
    );
  }
  return <></>;
}


const enhance = (): JSX.Element => {
  return(
    <MrnaPage dataCall={fetchMrna} />
  ) 
};

export default enhance;