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
import { getBlogHome, getUserView } from "../App/api/blogApis";
import { blogPath } from "../App/api/types";
import { Link, Navigate, useLocation } from "react-router-dom";
import { BlogRouteType } from "../App/routeTypes";
import Redirect from "../../components/Redirect"
import BlogItem from "../../components/BlogItem";
import { BlogUserGETInitialState, BlogUserGETResponse } from "./types";


interface Props {
  dataCall: Function; 
}

function BlogHomePage(props: Props): JSX.Element {
  const [state, setState] = useState({...BlogUserGETInitialState});
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext);
  const [token, setToken] = useAccessToken();
  const location = useLocation()
  const user = window.location.href.toString().slice(window.location.href.lastIndexOf('/') + 1)

  useEffect(() => {
    if(!token) {return}
    props.dataCall({
      session_id: sessionStorage.getItem('session_id'),
    }, token, user).then((resp: BlogUserGETResponse) => {
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
  }, [token, location]);
  
  useEffect(() => {
    document.title = `Blog Home | ${scheme.title}`;
  }, []);


  if(state.loading) {
   return <Spinner/>
  }
  if(token === '') {
    return (
      <Redirect
        destination={`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogRegister}`}
      />
    )
  }
  if(state.error) {
    return (
      <div>
        {JSON.stringify(state.errorMessage)}
      </div>
    );
  }
  if(state.details && state.details.data) {
    const data = state.details.data
    console.log(data)
    return (
      <div className="blogUserPage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></> }
        <div className="container">
          <div className="links">
            <span className='main-heading'>User -&nbsp;</span>
            <span className='main-heading' style={{color: scheme.body.h1}}>{user}</span>
            <div className="posts">
                {/** @ts-ignore */}
                {data.map((catPost, catPostIndex) => (
                  <BlogItem key={catPostIndex} data={catPost}/>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <BlogHomePage dataCall={getUserView} />
  ) 
};

export default enhance;