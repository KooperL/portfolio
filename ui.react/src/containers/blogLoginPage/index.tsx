import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { fetchContact, postContact } from "../App/api/contactApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';
import { useNavigate } from 'react-router-dom';
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";
import { Button } from "../../components/Button";
import { useAccessToken } from "../authContext/context";
import { BlogLoginPOSTInitialState, BlogLoginPOSTPayload, BlogLoginPOSTResponse } from "./types";
import { postBlogLogin } from "../App/api/blogApis";
import { blogPath } from "../App/api/types";
import { RouteType } from "../App/routeTypes";

interface Props {
  dataPost: Function; 
}


function BlogLoginPage(props: Props): JSX.Element {
  const [POSTstate, setPOSTState] = useState({...BlogLoginPOSTInitialState})
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [scheme, setScheme] = useContext(SchemeContext);
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken();
  const navigate = useNavigate();
  // useAccessToken()

  useEffect(() => {

  }, []);

  console.log(token)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: BlogLoginPOSTPayload, authToken: string) => {
    setPOSTState({...POSTstate, loading: true});
    event.preventDefault();
    props.dataPost(payload, authToken).then((resp: BlogLoginPOSTResponse) => {
      if(resp.success) {
        setPOSTState({
          details: resp,
          error: false,
          errorMessage: '',
          loading: false
        });
        // add auth token to context
        setToken(resp.accessToken ?? '')
        navigate(RouteType.BlogHome)
        // window.location = '/'
      } else {
        throw new Error(resp.error);
      }
    }).catch((err: any) => {
      console.log(err)
      setPOSTState({
        error: true,
        errorMessage: err,
        loading: false
      });
    })

  }
  
  useEffect(() => {
    document.title = `Blog Login | ${scheme.title}`;
  }, []);

  const encoded = btoa(`${username}:${password}`)

  return (
      <div className="container">
        <div className="links">
          <h2 className='main-heading' style={{color: scheme.body.h1}}>Login</h2>
          <form onSubmit={((e) => handleSubmit(e, {
            session_id: sessionStorage.getItem('session_id') ?? 'error',
          }, encoded))}>
            <div className="field">
              <p>Username: </p>
              <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
            </div>
            <div className="field">
              <p>Password: </p>
              <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>
            <div id="button">
              <Button colours={scheme} />
            </div>
          </form>
        </div>
      </div>
  );

}

const enhance = (): JSX.Element => {
  return(
    <BlogLoginPage dataPost={postBlogLogin} />
  ) 
};

export default enhance;