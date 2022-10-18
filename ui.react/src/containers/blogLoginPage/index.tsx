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
import { BlogLoginPOSTInitialState, BlogLoginPOSTPayload, BlogLoginPOSTResponse, BlogRegisterPOSTPayload, BlogRegisterPOSTResponse } from "./types";
import { postBlogLogin, postBlogRegister } from "../App/api/blogApis";
import { blogPath } from "../App/api/types";
import Redirect from "../../components/Redirect"
import { BlogRouteType } from "../App/routeTypes";


declare global {
  interface PasswordCredentialConstructor extends PasswordCredential {
    new({}: PasswordCredential): PasswordCredential
  }
  interface PasswordCredential {
    id: string;
    password: string;
  }
  const PasswordCredential: PasswordCredentialConstructor;
}

interface Props {
  dataPostRegister: Function; 
  dataPostLogin: Function; 
}

// https://github.com/Nooruddin-code/english-words-Json/blob/master/words_dictionary.json

const commonNouns = ['time', 'year', 'people', 'way', 'day', 'man', 'thing', 'woman', 'life', 'child', 'world', 'school', 'state', 'family', 'student', 'group', 'country', 'problem', 'hand', 'part', 'place', 'case', 'week', 'company', 'system', 'program', 'question', 'work', 'government', 'number', 'night', 'point', 'home', 'water', 'room', 'mother', 'area', 'money', 'story', 'fact', 'month', 'lot', 'right', 'study', 'book', 'eye', 'job', 'word', 'business', 'issue', 'side', 'kind', 'head', 'house', 'service', 'friend', 'father', 'power', 'hour', 'game', 'line', 'end', 'member', 'law', 'car', 'city', 'community', 'Name', 'president', 'team', 'minute', 'idea', 'kid', 'body', 'information', 'back', 'parent', 'face', 'others', 'level', 'office', 'door', 'health', 'person', 'art', 'war', 'history', 'party', 'result', 'change', 'morning', 'reason', 'research', 'girl', 'guy', 'moment', 'air', 'teacher', 'force', 'education']

function BlogLoginPage(props: Props): JSX.Element {
  const [POSTstate, setPOSTState] = useState({...BlogLoginPOSTInitialState})
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [usernameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [hasRegistered, setHasRegistered] = useState(false);
  const [scheme, setScheme] = useContext(SchemeContext);
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken();
  const navigate = useNavigate();
  // useAccessToken()

  function generateUsername() {
    return commonNouns[Math.floor(Math.random() * commonNouns.length)]
  }
  function generatePassword(length: number) {
    return Math.random().toString(16).substr(2, length);
  }

  useEffect(() => {
    setUsernameRegister(generateUsername())
    setPasswordRegister(generatePassword(16))
  }, []);

  const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>, payload: BlogRegisterPOSTPayload) => {
    if(hasRegistered) {return}
    setPOSTState({...POSTstate, loading: true});
    event.preventDefault();
    props.dataPostRegister(payload).then((resp: BlogRegisterPOSTResponse) => {
      if(resp.success) {
        setPOSTState({
          details: resp,
          error: false,
          errorMessage: '',
          loading: false
        });
        setHasRegistered(true)
        if(window.hasOwnProperty('PasswordCrediential')) {
          let c = new PasswordCredential({id: usernameRegister, password: passwordRegister})
          navigator.credentials.create(c as any)
        }
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
  

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>, payload: BlogLoginPOSTPayload, authToken: string) => {
    setPOSTState({...POSTstate, loading: true});
    event.preventDefault();
    props.dataPostLogin(payload, authToken).then((resp: BlogLoginPOSTResponse) => {
      if(resp.success) {
        setPOSTState({
          details: resp,
          error: false,
          errorMessage: '',
          loading: false
        });
        // add auth token to context
        setToken(resp.accessToken ?? '')
        navigate('/blog/post/1')
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

  const encoded = btoa(`${usernameLogin}:${passwordLogin}`)

  if(token?.length) {
    return (
      <Redirect
        destination={`/${BlogRouteType.BlogHome}`}
      />
    )
  }
  return (
    <div className="blogLoginPage">
      <div className="container">
        <div className="links">
          <div id="register">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Register</h2>
          <form onSubmit={((e) => handleSubmitRegister(e, {
              session_id: sessionStorage.getItem('session_id') ?? 'error',
              data: {
                blog_username: usernameRegister,
                blog_password: passwordRegister
              }
            }))}>
              <div className="field">
                <p>Username: </p>
                <input type="text" value={usernameRegister} readOnly={true} onChange={(e) => {e.target.value = usernameRegister}}></input>
              </div>
              <div className="field">
                <p>Password: </p>
                <input type="text" value={passwordRegister} readOnly={true} onChange={(e) => {e.target.value = passwordRegister}}></input>
              </div>
              <div id="button">
                <Button colours={scheme} />
              </div>
            </form>
          </div>
            <div id="login">
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Login</h2>
            <form onSubmit={((e) => handleSubmitLogin(e, {
              session_id: sessionStorage.getItem('session_id') ?? 'error',
            }, encoded))}>
              <div className="field">
                <p>Username: </p>
                <input type="text" value={usernameLogin} autoComplete="username email" onChange={(e) => {setUsernameLogin(e.target.value)}}></input>
              </div>
              <div className="field">
                <p>Password: </p>
                <input type="text" value={passwordLogin} autoComplete="new-password" onChange={(e) => {setPasswordLogin(e.target.value)}}></input>
              </div>
              <div id="button">
                <Button colours={scheme} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const enhance = (): JSX.Element => {
  return(
    <BlogLoginPage dataPostLogin={postBlogLogin} dataPostRegister={postBlogRegister}/>
  ) 
};

export default enhance;