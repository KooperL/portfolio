import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { AboutState, AboutPayload, AboutInitialState } from "./types";
import { fetchAbout } from "../App/api/aboutApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/dnaAscii";

interface Props {
  dataCall: Function; 
}

// max width 1684px

function AboutPage(props: Props): JSX.Element {
  const [state, setState] = useState({...AboutInitialState});
  const [scheme, setScheme] = useContext(SchemeContext);

  useEffect(() => {
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
        return <a href={data[0]}><div style={{backgroundColor: scheme.button.bgSolid}} className={type}>{text}</div></a>
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
    return (
      <>
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
          </div>
          <div id="test"></div>
        </div>
      </>
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