import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { SeqAlignPayload, SeqAlignState, SeqAlignInitialState, SeqAlignPOST } from "./types";
import { fetchSeqAlign } from "../App/api/seqAlignApi";
import Modal from "../../components/Modal";
// @ts-ignore
import gear from "../../assets/gear.svg";
import { SchemeContext } from "../context/colourScheme";
import { Button } from "../../components/Button";
import './style.css'
import { IslandCenter } from "../../templates/IslandCenter";
import { Input } from "../../components/Input";
import { Gear } from "../../components/Gear";
import { Radio } from "../../components/Radio";
import { ApiError } from "../../api/apiErrorHandler";
import ErrorPage from "../ErrorPage";

interface Props {
  dataCall: Function; 
}

function SeqAlignPage(props: Props): JSX.Element {
  const [state, setState] = useState<SeqAlignState>(SeqAlignInitialState);
  const [sampletxt, setSampletxt] = useState('');
  const [referencetxt, setReferencetxt] = useState('');
  const [identical, setIdentical] = useState(1.0);
  const [mismatch, setMismatch] = useState(0.0);
  const [gaps, setGaps] = useState(-0.5);
  const [extgaps, setExtgaps] = useState(-0.1);
  const [scheme, setScheme] = useContext(SchemeContext);

  useEffect(() => {
    document.title = `Protein Secondary Structure | ${scheme.title}`;
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: SeqAlignPOST) => {
    setState({...state, loading: true});
    event.preventDefault();
    props.dataCall(payload).then((resp: SeqAlignPayload) => {
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
        <div className="description" style={{color: scheme.body.text}}>
          {showingDesc?<p>Enter two sequences of DNA to see how well they physically align.</p>:<></>}
        </div>
          <form onSubmit={((e) => handleSubmit(e, {
            sampletxt: sampletxt,
            referencetxt: referencetxt,
            identical: identical,
            mismatch: mismatch,
            gaps: gaps,
            extgaps: extgaps
          }))}>
            <div className="searchBoxes">
              <Input inputBoxLabel="DNA strand 1:" name='referencetxt' id='referencetxt' value={referencetxt} onChange={(e) => {setReferencetxt(e.target.value)}} />
              <Input inputBoxLabel="DNA strand 2:" name='sampletxt' id='sampletxt' value={sampletxt} onChange={(e) => {setSampletxt(e.target.value)}} />
            </div>
            <div className="buttonWithGear">
              <Button colours={scheme} disabled={(referencetxt.length<4 && sampletxt.length<4)?true:false}/>
              <Modal closedChildren={<Gear />} >
                <div>
                  <Input label="Identical base reward:" name='identical' id='identical' value={identical.toString()} onChange={(e) => {setIdentical(+e.target.value)}} />
                  <Input label="Mismatching base penalty:" name='mismatch' id='mismatch' value={mismatch.toString()} onChange={(e) => {setMismatch(+e.target.value)}} />
                  <Input label="Beginning gap penalty:" name='gaps' id='gaps' value={gaps.toString()} onChange={(e) => {setGaps(+e.target.value)}} />
                  <Input label="Extending gap penalty:" name='extgaps' id='extgaps' value={extgaps.toString()} onChange={(e) => {setExtgaps(+e.target.value)}} />
                </div>
            </Modal>
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
    const splitDrawArray = data.draw_res.map(elem => elem.split('\n'));
    console.log(state.details)
    return (
      <IslandCenter>
      <div className="seqAlignPage">
        <div>
          <div className="resultsScreen">
              {SearchBar(window.outerWidth > 1000)}
          </div>
          <hr/>
          <div className="resultTitle">Results:</div>
            <div className="resultsContainer">
            <div className="results">
            {splitDrawArray.map((res, ind) => (
              <div key={ind} className="result" >
                <div>
                  <p key={ind} className="resultTitle">Possible result: </p>
                  {/** @ts-ignore */}
                  {/* {state.details.draw_res[ind].split('\n').map((line, lineInd) => ( */}
                  {/* <p key={lineInd} className="resultBody">{line}</p> */}
                  {/* ))} */}
                  {/** @ts-ignore */}
                   <textarea rows={5} className="resultBody">{`${res[0]}\n${res[1]}\n${res[2]}\n${res[3]}\n`}</textarea>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
      </IslandCenter>
    );
  } else {
    return (
      <IslandCenter>
        <div className="seqAlignPage">
          <div className="innerContainer">
            {SearchBar(true)}
          </div>
        </div>
      </IslandCenter>
    );
  }
}


const enhance = (): JSX.Element => {
  return(
    <SeqAlignPage dataCall={fetchSeqAlign} />
  ) 
};

export default enhance;