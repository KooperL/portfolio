import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { ProjectsState, ProjectsPayload, ProjectsInitialState } from "./types";
import { fetchProjects } from "../App/api/projectsApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";

interface Props {
  dataCall: Function; 
}

// max width 1684px

function ProjectsPage(props: Props): JSX.Element {
  const [state, setState] = useState({...ProjectsInitialState});
  const [scheme, setScheme] = useContext(SchemeContext);
  useEffect(() => {
    props.dataCall().then((resp: ProjectsPayload) => {
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
    return (
      <>
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></> }
        <div className="container">
          <div className="links">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Projects</h2>
            {state.details.data.map((topic, indexTopic) => (
              <div className='' key={indexTopic}>
                <div className='area-heading' style={{color: scheme.body.h2}} key={indexTopic}>
                  <h3>{topic.title}</h3>
                </div>
                <div className='area'>
                  { /**@ts-ignore */ }
                  {topic.points.map((link, indexLink) => (
                    // <div className="text-black w-48 m-3 p-3 hover:border rounded-3xl bg-gray-50 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100" key={indexLink} >
                    <div className='button' key={indexLink} style={{backgroundColor: scheme.button.bgSolid}}
                    // onMouseOver={(e: any) => {e.target.style['backgroundImage']='linear-gradient(red, yellow)'}}
                    // onMouseOut={(e: any) => {e.target.style['backgroundImage']=''}}
                    >
                      <a className='buttonInner' href={link.address} key={indexLink}>
                        <div className=''>
                          {link.name}
                        </div>
                        <div className=''>
                          {'> Go!'}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
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
    <ProjectsPage dataCall={fetchProjects} />
  ) 
};

export default enhance;