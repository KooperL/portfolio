import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { ProjectsState, ProjectsPayload, ProjectsInitialState } from "./types";
import { fetchProjects } from "../App/api/projectsApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";
import { HomeInitialState, HomePayload } from "../homePage/types";
import ButtonRedir from "../../components/ButtonRedir";

interface Props {
  dataCall: Function; 
}

// max width 1684px
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
      return <div className={type}><p className={`text ${type}`}>{data[0]}</p></div>
  }
}
function ProjectsPage(props: Props): JSX.Element {
  const [state, setState] = useState({...HomeInitialState});
  const [scheme, setScheme] = useContext(SchemeContext);
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

  if(state.loading) {
   return <Spinner/>
  }
  if(state.error) {
    console.log(state.errorMessage)
    return (
      <div>
        {JSON.stringify(state.errorMessage)}
      </div>
    );
  }
  if(state.details) {
    const data = state.details.data
    return (
      <div className="ProjectsPage"> {/**arguments.callee.name**/}
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></> }
        <div className="container">
        <div className="links-container">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Projects</h2>
            <div className="links">
              {data.map((segment, indexSegment) => (
                // <div key={indexSegment}>
                <>
                  {typeLookup(segment.type, segment.data, segment?.text)}
                {/* </div> */}
                </>
              ))}
            </div>
          </div>
          <div className='render'>
            {window.outerWidth > 1000 ?
              <ReactP5Wrapper sketch={sketchWrapper(1200, 1200, scheme.body.background, scheme.body.foreground, scheme.body.h1)} /> : <></>
            }
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <ProjectsPage dataCall={fetchProjects} />
  ) 
};

export default enhance;