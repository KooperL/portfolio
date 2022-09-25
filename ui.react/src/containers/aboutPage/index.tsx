import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { AboutState, AboutPayload, AboutInitialState } from "./types";
import { fetchAbout } from "../App/api/aboutApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";

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

  function typeLookup(type: string, data:string[]) {
    switch(type) {
      case 'button':
        return <a href={data[0]}><div style={{backgroundColor: scheme.button.bgSolid}} className={type}>{data[0]}</div></a>
      case 'unorderedList':
        return <ul className={`text ${type}`}>{data.map((item:string) => <li>{item}</li>)}</ul>
      case 'body':
        return <p className={`text ${type}`}>{data.map((item:string) => <span>{item}</span>)}</p>
      case 'header':
        return <p className={`text ${type}`}>{data}</p>
      case 'subheader':
        return <p className={`text ${type}`}>{data}</p>
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
    console.log(data)

    return (
      <>
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></> }
        <div className="container">
          <div className="links">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>About</h2>
            {data.map((segment, indexSegment) => (
              <div key={indexSegment}>
                {typeLookup(segment.type, segment.data)}
              </div>
            ))}
          </div>
          <div className='render'>
            {window.outerWidth > 1000 ?
              <ReactP5Wrapper sketch={sketchWrapper(1200, 1200, scheme.body.background, scheme.body.foreground, scheme.body.h1)} /> : <></>
            }
          </div>
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