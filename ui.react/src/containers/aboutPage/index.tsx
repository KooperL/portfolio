import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { AboutState, AboutPayload, AboutInitialState } from "./types";
import { fetchAbout } from "../App/api/aboutApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';
import sketchWrapper from "../../components/p5/dnaAscii";
import { ReactP5Wrapper } from "react-p5-wrapper";
// @ts-ignore
import dna from './dna.txt';
import ButtonRedir from "../../components/ButtonRedir";

interface Props {
  dataCall: Function; 
}


function AboutPage(props: Props): JSX.Element {
  const [state, setState] = useState({...AboutInitialState});
  const [seed, setSeed] = useState(Math.random());
  const [text, setText] = useState<Array<Array<string>>>([[]]);
  const [scheme, setScheme] = useContext(SchemeContext);


  useEffect(() => {
    fetch(dna).then(r => r.text()).then(textRaw => {
      setText(textRaw.split('\n').map(item => item.split('')));
    })
    props.dataCall().then((resp: AboutPayload) => {
      setState({
        details: resp,
        error: false,
        errorMessage: '',
        loading: false
      });
    }).catch((err: any) => {
      setState({
        error: true,
        errorMessage: err,
        loading: false
      });
    })
  }, []);

  useEffect(() => {
    document.title = `About | ${scheme.title}`;
  }, []);

  function typeLookup(type: string, data:string[], text?:string) {
    switch(type) {
      case 'button':
        return <ButtonRedir destination={data[0]} label={text ?? ''} local={!data[0].includes('http')}/>
      case 'unorderedList':
        return <ul className={`text ${type}`}>{data.map((item:string, index:number) => <li key={index}>{item}</li>)}</ul>
      case 'body':
        return <p className={`text ${type}`}>{data.map((item:string, index:number) => <span key={index}>{item}</span>)}</p>
      case 'header':
      case 'subheader':
      case 'emoji':
        return <p className={`text ${type}`}>{data[0]}</p>
    }
  }

  function newSeed() {
    setSeed(Math.random())
  }

  useEffect(() => {
    setTimeout(() => {
      newSeed()
    }, 500)
  }, [seed])

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
  if(state.details) {
    const data = state.details.data
    const validCharsBinary = ['1','0']
    const validCharsNucleotides = ['A','T','G','C']
    return (
      <div className="aboutPage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></> }
        <div className="container">
          <div className="links">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>About</h2>
            {data.map((segment, indexSegment) => (
              <div key={indexSegment}>
                {typeLookup(segment.type, segment.data, segment?.text)}
              </div>
            ))}
          </div>
          <div className='render'>
            {window.outerWidth > 1000 ? <ReactP5Wrapper sketch={sketchWrapper(scheme.body.h1)} /> : <></>}
            {/* {text.map((row, rowindex) => (
              <div key={rowindex}>
              {row.map((col, colIndex) => (
                <span className="nucleotide" key={colIndex} style={{opacity: `${+col*10}%`, ...(Math.ceil((colIndex+rowindex)*seed)%4 && {color: scheme.body.h1})}}>
                  {+col < 10 ? ( Math.ceil((colIndex+rowindex)*seed)%4 ? validCharsBinary[Math.floor(Math.random()*validCharsBinary.length)] : validCharsNucleotides[Math.floor(Math.random()*validCharsNucleotides.length)]) : '&nbsp;'}
                </span>
              ))}
              </div>
            ))} */}
          </div>
          <div id="test"></div>
        </div>
      </div>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <AboutPage dataCall={fetchAbout} />
  ) 
};

export default enhance;