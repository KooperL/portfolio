import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { SeqAlignPayload, SeqAlignState, SeqAlignInitialState, SeqAlignPOST } from "./types";
import { fetchSeqAlign } from "../App/api/seqAlignApi";
import Modal from "../../components/Modal/Modal";
// @ts-ignore
import gear from "../../assets/gear.svg";
import { SchemeContext } from "../context/colourScheme";
import { Button } from "../../components/Button";
import './style.css'

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
              <div className="inputContainer">
                <div className="inputLabel">DNA strand 1:</div>
                <input className='input' type='text' name='referencetxt' id='referencetxt' value={referencetxt} onChange={(e) => {setReferencetxt(e.target.value)}} />
              </div>
              <div className="inputContainer">
                <div className="inputLabel">DNA strand 2:</div>
                <input className='input' type='text' name='sampletxt' id='sampletxt' value={sampletxt} onChange={(e) => {setSampletxt(e.target.value)}} />
              </div>
            </div>
            <div className="buttonWithGear">
              {/* <button className={`${(referencetxt.length>4 && sampletxt.length>4)?'bg-blue-400':'bg-gray-400'} m-5 p-1 rounded text-white`} type='submit' name='submit' value='Submit' disabled={(referencetxt.length<4 && sampletxt.length<4)?true:false}>Submit</button> */}
              <div className="button">
                <Button colours={scheme} disabled={(referencetxt.length<4 && sampletxt.length<4)?true:false}/>
              </div>
              <Modal
              textSmall={(() => {return <img src={gear} alt={gear} style={{ width: '42px', height: '42px'}}></img>})()}
              text={() => {return (
              <div className="text-xs">
                <div className="p-2">
                  <p>Identical base reward: </p>
                  <input className='input' type='text' name='identical' id='identical' value={identical} onChange={(e) => {setIdentical(+e.target.value)}} />
                </div>
                <div className="p-2">
                  <p>Mismatching base penalty: </p>
                  <input className='input' type='text' name='mismatch' id='mismatch' value={mismatch} onChange={(e) => {setMismatch(+e.target.value)}} />
                </div>
                <div className="p-2">
                  <p>Beginning gap penalty: </p>
                  <input className='input' type='text' name='gaps' id='gaps' value={gaps} onChange={(e) => {setGaps(+e.target.value)}} />
                </div>
                <div className="p-2">
                  <p>Extending gap penalty: </p>
                  <input className='input' type='text' name='extgaps' id='extgaps' value={extgaps} onChange={(e) => {setExtgaps(+e.target.value)}} />
                </div>
              </div>
            )}}>
            </Modal>
          </div>
        </form>
      </div>
    );
  }
  
  if(state.loading) {
   return <Spinner/>
  }
  if(state.error) {
    return (
      <div>
        {state.errorMessage}
      </div>
    );
  }
  if(state.details && state.details.data) {
    const data = state.details.data;
    const splitDrawArray = data.draw_res.map(elem => elem.split('\n'));
    console.log(state.details)
    return (
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
    );
  } else {
    return (
      <div className="container">
        <div className="innerContainer">
          {SearchBar(true)}
        </div>
      </div>
    );
  }
  return <></>;
}


const enhance = (): JSX.Element => {
  return(
    <SeqAlignPage dataCall={fetchSeqAlign} />
  ) 
};

export default enhance;