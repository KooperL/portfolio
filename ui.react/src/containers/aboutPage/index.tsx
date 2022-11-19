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
import TypeLookup from "../../components/TypeLookup";

interface Props {
  dataCall: Function; 
}

function newSeed(arrs: number, length: number, width: number) {
  let arr = new Array(arrs)
  let arrLength = new Array(length)
  let arrWidth = new Array(width)
  for(let i = 0; i< arr.length; i++) {
    arr[i] = [...arrLength]
    for(let y = 0; y< arrLength.length; y++) {
      arr[i][y] = [...arrWidth]
      for(let x = 0; x< arrWidth.length; x++) {
        arr[i][y][x] = Math.ceil(Math.random()*10)
      }
    }
  }
  // arr = arr.map((subArr) => subArr.map(() => Math.ceil(Math.random()*10)))
  return arr
}

function AboutPage(props: Props): JSX.Element {
  const [state, setState] = useState({...AboutInitialState});
  const [seed, setSeed] = useState<Array<Array<Array<number>>>>([]);
  const [text, setText] = useState<Array<Array<number>>>([[]]);
  const [scheme, setScheme] = useContext(SchemeContext);


  useEffect(() => {
    fetch(dna).then(r => r.text()).then(textRaw => {
      setText(textRaw.split('\n').map(item => item.split('').map(item => +item)));
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

  useEffect(() => {
    setSeed(newSeed(3, text.length, text[0].length))
  }, [text])



  useEffect(() => {
    if(!(window.outerWidth > 1000)) {return}
      setTimeout(() => {
        if(seed.length) {
          let newSeed = seed
          const last = newSeed.pop() ?? [[0]]
          setSeed([last, ...newSeed])
      }
    }, 100)
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
  if(state.details && seed[0].length && seed[0][0].length) {
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
                {TypeLookup(segment.type, segment.data, segment?.text)}
                {/* <TypeLookup type={segment.type} data={segment.data} text={segment?.text} /> */}
              </div>
            ))}
          </div>
          <div className='render'>
            {/* {window.outerWidth > 1000 ? <ReactP5Wrapper sketch={sketchWrapper(scheme.body.h1)} /> : <></>} */}
            {window.outerWidth > 1000 ?  
              <>
                {text.map((row, rowindex) => (
                  <div key={rowindex}>
                  {row.map((col, colIndex) => (
                    <span className={`nucleotide ${seed[0][rowindex][colIndex]}`} key={colIndex} style={{opacity: `${+col === 0 ? 0 : +col*10}%`, ...(seed[0][rowindex][colIndex] === 7) && {color: scheme.body.h1}}}>
                      {+col !== 0 ? 
                        (seed[0][rowindex][colIndex] === 7 ?
                          validCharsBinary[Math.floor(Math.random()*validCharsBinary.length)] : validCharsNucleotides[Math.floor(Math.random()*validCharsNucleotides.length)]) : '.'}
                    </span>
                  ))}
                  </div>
                ))}
              </>
            : <></>}
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