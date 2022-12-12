import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { HomeState, HomePayload, HomeInitialState } from "./types";
import { fetchHome } from "../App/api/homeApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";
import ButtonRedir from "../../components/ButtonRedir";
import { IslandLeft } from "../../templates/IslandLeft";
import TypeLookup from "../../components/TypeLookup";

interface Props {
  dataCall: Function; 
}

function HomePage(props: Props): JSX.Element {
  const [state, setState] = useState({...HomeInitialState});
  const [scheme, setScheme] = useContext(SchemeContext);

  useEffect(() => {
    document.title = `Home | ${scheme.title}`;
  }, []);

  useEffect(() => {
    props.dataCall().then((resp: HomePayload) => {
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
      <IslandLeft>
      <div className="homePage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></> }
        <div className="container">
          <div className="">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Home</h2>
            <div className="links">
              {data.map((segment, indexSegment) => (
                  <>
                  {TypeLookup({type: segment.type, data: segment.data, text: segment?.text})}
                  </>
              ))}
            </div>
          </div>
          <div className='render'>
            {/* {window.outerWidth > 1000 ?
              <ReactP5Wrapper sketch={sketchWrapper(1200, 1200, scheme.body.background, scheme.body.foreground, scheme.body.h1)} /> : <></>
            } */}
          </div>
        </div>
      </div>
      </IslandLeft>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <HomePage dataCall={fetchHome} />
  ) 
};

export default enhance;