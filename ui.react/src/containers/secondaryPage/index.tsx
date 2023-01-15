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
import { IslandCenter } from "../../templates/IslandCenter";
import { Input } from "../../components/Input";
import { Radio } from "../../components/Radio";
import { Gear } from "../../components/Gear";
import { Textarea } from "../../components/Textarea";
import ErrorPage from "../ErrorPage";


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
          errorMessage: null,
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
        <div className="description" style={{ color: scheme.body.text }}>
          {showingDesc ? <p>Enter a sequence of amino acids in single character form to view a calculated reconstruction of the secondary protein structure according to the Chou-Fasman method (~50% accuracy).</p> : <></>}
        </div>
        <form onSubmit={((e) => handleSubmit(e, {
          aa_field_id: aa_field_id,
          aaf_field_id: aaf_field_id,
          detectthreshold: detectthreshold,
          leniency: leniency
        }))}>
          <div className="inputWithButton">
            <Input inputBoxLabel="🔬 Amino acids:" name='aa_field_id' id='aa_field_id' value={aa_field_id} onChange={((e) => {setAa_field_id(e.target.value)})} />
            <div className="buttonWithGear">
              <Button colours={scheme} disabled={aa_field_id.length < 4} />
              {/* <Modal
                textSmall={<Gear />}
                text={() => {
                  return (
                    <div>
                      <Radio label="Single letter code" id="inputtype" name="inputtype" value="s" checked={aaf_field_id === 's'} onClick={((e) => { setAaf_field_id((e.target as HTMLTextAreaElement).value) })} />
                      <Radio label="Three letter code" id="inputtype" name="inputtype" value="t" checked={aaf_field_id === 't'} onClick={((e) => { setAaf_field_id((e.target as HTMLTextAreaElement).value) })} />
                      <Input label="Leniency:" name='leniency' id='leniency' value={leniency.toString()} onChange={((e) => { setLeniency(+e.target.value) })} />
                      <Input label="Detection threshold:" name='detectthreshold' id='detectthreshold' value={detectthreshold.toString()} onChange={((e) => { setDetectthreshold(+e.target.value) })} />
                    </div>
                  )
                }}>
              </Modal> */}
            </div>
          </div>
        </form>
      </div>
    );
  }


  if(state.loading) {
   return <Spinner/>
  }
  if(state.error && state.errorMessage) {
    return (
      <ErrorPage error={state.errorMessage} />
    );
  }
  if(state.details && state.details.data) {
    const data = state.details.data;
    return (
      <IslandCenter>
        <div className="secondaryPage">
          <div>
            <div className="resultsScreen">
                {SearchBar(window.outerWidth > 1000)}
            </div>
            <hr/>
            <div className="resultsContainer">
              <div className="resultsTitle">Results:</div>
              {/* <div className="results">
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
                </div> */}

              <div className="mrna-preview" >
                {/* <p className="resultTitle">Calculated reconstruction: </p> */}
                {/* <textarea className="resultTextArea" name="aa" value={data.pred_str} readOnly={true} /> */}
                <Textarea name="aa" value={data} readOnly={true} />
              </div>
            </div>
          </div>
        </div>
      </IslandCenter>
    );
  } else {
    return (
      <IslandCenter>
        <div className="secondaryPage">
          {SearchBar(true)}
        </div>
      </IslandCenter>
    );
  }
}


const enhance = (): JSX.Element => {
  return(
    <SecondaryPage dataCall={fetchSecondary} />
  ) 
};

export default enhance;