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
import { getBlogHome } from "../App/api/blogApis";
import { BlogHomeGETInitialState, BlogHomeGETResponse, BlogRegisterPOSTResponse } from "../blogLoginPage/types";
import { blogPath } from "../App/api/types";
import { Link } from "react-router-dom";

interface Props {
  dataCall: Function; 
}


function BlogHomePage(props: Props): JSX.Element {
  const [state, setState] = useState({...BlogHomeGETInitialState});
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [value, setValue] = useState('');
  const [scheme, setScheme] = useContext(SchemeContext);
  const [token, setToken] = useAccessToken();
  useAccessToken()
  useEffect(() => {
    if(!token) {return}
    props.dataCall({session_id: sessionStorage.getItem('session_id')}, token).then((resp: BlogHomeGETResponse) => {
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
  }, [token]);

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
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Blog Home</h2>
            <div className="posts">
              {Object.keys(data).map((segment, indexSegment) => (
                <div className="category" key={indexSegment}>
                  <p key={indexSegment**2}>{segment}</p>
                  {/** @ts-ignore */}
                  {data[segment].map((catPost, catPostIndex) => (
                    <Link to={`/${blogPath}/post/${catPost['id']}`} key={catPostIndex}>
                      <div className="post-details" key={catPostIndex + indexSegment}>
                        <div className="post-detail" key={catPostIndex + indexSegment + 2}>{catPost['author']}</div>
                        <div className="post-detail" key={catPostIndex + indexSegment + 1}>{catPost['title']}</div>
                        {window.outerWidth > 1000 ? <div className="post-detail" key={catPostIndex + indexSegment + 3}>{catPost['body']}</div> : <></>}
                        <div className="post-detail" key={catPostIndex + indexSegment + 4}>{catPost['views']}</div>
                    </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <BlogHomePage dataCall={getBlogHome} />
  ) 
};

export default enhance;