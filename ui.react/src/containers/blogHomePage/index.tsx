import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { fetchContact, postContact } from "../App/api/contactApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";
import { Button } from "../../components/Button";
import BlogItem from "../../components/BlogItem";
import ButtonRedir from "../../components/ButtonRedir";
import { useAccessToken } from "../authContext/context";
import { getBlogHome } from "../App/api/blogApis";
import { blogPath } from "../App/api/types";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BlogRouteType } from "../App/routeTypes";
import Redirect from "../../components/Redirect"
import { BlogHomeGETInitialState, BlogHomeGETResponse } from "./types";


interface Props {
  dataCall: Function; 
}

function BlogHomePage(props: Props): JSX.Element {
  const [state, setState] = useState({...BlogHomeGETInitialState});
  const [searchState, setSearchState] = useState('');
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext);
  const [token, setToken] = useAccessToken();
  const location = useLocation()
  const navigate = useNavigate();


  function dataFetch() {
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    props.dataCall({
      session_id: sessionStorage.getItem('session_id'),
      category: queryString.get('category'),
      search: queryString.get('search')
    }, token).then((resp: BlogHomeGETResponse) => {
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
  }

  useEffect(() => {
    if(!token) {return}
    dataFetch()
  }, [token, location]);


  const handleSubmit = () => {
    navigate(`/${BlogRouteType.BlogHome}?search=${searchState}`);
    return (
      <Redirect
        destination={`/${BlogRouteType.BlogHome}?search=${searchState}`}
      />
    )
  }

  // Todo add way to track redirects
  
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
    return (
      <div className="blogHomePage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></> }
        <div className="container">
          <div className="links">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Blog Home</h2>
            <div className="posts">
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}>

              <div className="search">
                <input type="text" value={searchState} onChange={(e) => {setSearchState(e.target.value)}}></input>
                <Button colours={scheme} callBack={handleSubmit} label="search"></Button>
                {/* <ButtonRedir destination={`/${BlogRouteType.BlogHome}?search=${searchState}`} label="Search" local={true}></ButtonRedir> */}
              </div>
              </form>
              {Object.keys(data).map((segment, indexSegment) => (
                <div className="category" key={indexSegment}>
                  <Link key={indexSegment**2} to={`/${blogPath}?category=${segment}`}><p>Topic - {segment}</p></Link>
                  {/** @ts-ignore */}
                  <div className="posts">
                    {data[segment].map((catPost, catPostIndex) => (
                      <BlogItem key={catPostIndex} data={catPost}/>
                    ))}
                  </div>
                </div>
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
    <BlogHomePage dataCall={getBlogHome} />
  ) 
};

export default enhance;