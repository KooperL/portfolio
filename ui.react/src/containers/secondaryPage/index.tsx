import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { SecondaryPayload, SecondaryState, SecondaryInitialState, SecondaryPOST } from "./types";
import { fetchSecondary } from "../App/api/SecondaryApi";
import Modal from "../../components/Modal/Modal";
// @ts-ignore
import gear from "../../assets/gear.svg";
import './style.css'
import { SchemeContext } from "../context/colourScheme";
import { Button } from "../../components/Button";


interface Props {
  dataCall: Function; 
}

function SecondaryPage(props: Props): JSX.Element {
  const [state, setState] = useState<SecondaryState>(SecondaryInitialState);
  const [aa_field_id, setAa_field_id] = useState('');
  const [aaf_field_id, setAaf_field_id] = useState('s');
  const [detectthreshold, setDetectthreshold] = useState(4);
  const [leniency, setLeniency] = useState(3);
  const [scheme, setScheme] = useContext(SchemeContext);

  useEffect(() => {
    document.title = `Protein Secondary Structure | ${scheme.title}`;
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: SecondaryPOST) => {
    setState({...state, loading: true});
    event.preventDefault();
    props.dataCall(payload).then((resp: SecondaryPayload) => {
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
      setState({
        error: true,
        errorMessage: err,
        loading: false
      });
    })
  }
  
  
  function SearchBar(showingDesc: Boolean) {
    return (
      <div className="search-container">
        <div className="description" style={{color: scheme.body.text}}>
          {showingDesc?<p>Enter a sequence of amino acids in single character form to view a calculated reconstruction.</p>:<></>}
        </div>
        <div className="">
          <div className="flex flex-row">
            <form onSubmit={((e) => handleSubmit(e, {
              aa_field_id: aa_field_id,
              aaf_field_id: aaf_field_id,
              detectthreshold: detectthreshold,
              leniency: leniency
            }))}>
              <div className="inputWithButton">
                <div className="inputContainer">
                  <div className="inputLabel">🔬 Amino acids:</div>
                  <input className='input' type='text' name='aa_field_id' id='aa_field_id' value={aa_field_id} onChange={((e) => {setAa_field_id(e.target.value)})} />
                </div>
                <div className="buttonWithGear">
                  <div className="button">
                    <Button colours={scheme} disabled={aa_field_id.length<4?true:false}/>
                  </div>
                  <Modal
                    textSmall={(() => {return <img src={gear} alt={gear} style={{ width: '42px', height: '42px'}}></img>})()}
                    text={() => {return (
                    <div className="text-xs">
                      <div className="p-2 w-fill">
                        <p>Naming Convention: </p>
                        <input type="radio" id="inputtype" name="inputtype" value="s" checked={aaf_field_id==='s'?true:false} onChange={((e) => {setAaf_field_id(e.target.value)})}/>
                        <label className='pl-2' htmlFor="inputtype">Single letter code</label><br/>
                        <input type="radio" id="inputtype" name="inputtype" value="t" checked={aaf_field_id==='t'?true:false} onChange={((e) => {setAaf_field_id(e.target.value)})}/>
                        <label className='pl-2' htmlFor="inputtype"></label>Three letter code<br/>
                      </div>
                      <div className="p-2">
                        <p>Leniency: </p>
                        <input className='ml-2 bg-gray-100 rounded w-1/2' type='text' name='leniency' id='leniency' value={leniency} onChange={((e) => {setLeniency(+e.target.value)})} />
                      </div>                    
                      <div className="p-2">
                        <p>Detection threshold: </p>
                        <input className='ml-2 bg-gray-100 rounded w-1/2' type='text' name='detectthreshold' id='detectthreshold' value={detectthreshold} onChange={((e) => {setDetectthreshold(+e.target.value)})} />
                      </div>
                    </div>)}}>
                  </Modal>
                </div>
              </div>
            </form>
          </div>
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
        {JSON.stringify(state.errorMessage)}
      </div>
    );
  }
  if(state.details && state.details.data) {
    const data = state.details.data;
    return (
      <div>
        <div className="resultsScreen">
              {SearchBar(window.outerWidth > 1000)}
        </div>
        <hr/>
        <div className="resultsContainer">
        <div className="resultsTitle">Results:</div>
        <div className="results">
          <div className="result" >
            <p className="resultTitle">Amino acids: </p>
            <textarea className="resultTextArea" name="aa" value={data.aa_field} readOnly={true} />
          </div>
          <div className="result" >
            <p className="resultTitle">α helix propensities: </p>
            <textarea className="resultTextArea" name="aa" value={data.ahm_field.toString()} readOnly={true} />
          </div>
          <div className="result" >
            <p className="resultTitle">α helix μ-distributed prop.s: </p>
            <textarea className="resultTextArea" name="aa" value={data.bsm_field.toString()} readOnly={true} />
          </div>
          <div className="result" >
            <p className="resultTitle">β-pleated sheet propensities: </p>
            <textarea className="resultTextArea" name="aa" value={data.ahl_field.toString()} readOnly={true} />
          </div>
          <div className="result" >
            <p className="resultTitle">β-pleated sheet μ-dist. prop.s: </p>
            <textarea className="resultTextArea" name="aa" value={data.bsl_field.toString()} readOnly={true} />
          </div>
          <div className="result" ></div>
          </div>

          <div className="mrna-preview" >
            <p className="resultTitle">Calculated reconstruction: </p>
            <textarea className="resultTextArea" name="aa" value={data.pred_str} readOnly={true} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        {SearchBar(true)}
      </div>
    );
  }
  return <></>;
}


const enhance = (): JSX.Element => {
  return(
    <SecondaryPage dataCall={fetchSecondary} />
  ) 
};

export default enhance;