import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { fetchContact, postContact } from "../App/api/contactApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";
import { Button } from "../../components/Button";
import { useAccessToken } from "../authContext/context";
import { BlogHomeInitialState } from "./types";

interface Props {
  dataCall: Function; 
  dataPost: Function; 
}


function BlogHomePage(props: Props): JSX.Element {
  const [state, setState] = useState({...BlogHomeInitialState});
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [value, setValue] = useState('');
  const [scheme, setScheme] = useContext(SchemeContext);
  // const [token, setToken] = useContext(useAccessToken);
  useAccessToken()
  useEffect(() => {
    // props.dataCall().then((resp: ContactPayload) => {
    //   setState({
    //     details: resp,
    //     error: false,
    //     errorMessage: '',
    //     loading: false
    //   });
    // }).catch((err: any) => {
    //   setState({
    //     error: true,
    //     errorMessage: err,
    //     loading: false
    //   });
    // })
  }, []);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: ContactPOST) => {
  //   setPOSTState({...POSTstate, loading: true});
  //   event.preventDefault();
  //   props.dataPost(payload).then((resp: ContactPOSTPayload) => {
  //     if(resp.success) {
  //       setPOSTState({
  //         details: resp,
  //         error: false,
  //         errorMessage: '',
  //         loading: false
  //       });
  //     } else {
  //       throw new Error(resp.error);
  //     }
  //   }).catch((err: any) => {
  //     console.log(err)
  //     setPOSTState({
  //       error: true,
  //       errorMessage: err,
  //       loading: false
  //     });
  //   })
  // }
  
  useEffect(() => {
    document.title = `Blog Home | ${scheme.title}`;
  }, []);



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
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Contact</h2>
            {data.map((segment, indexSegment) => (
              <div key={indexSegment}>
                Yo
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <BlogHomePage dataCall={fetchContact} dataPost={postContact} />
  ) 
};

export default enhance;