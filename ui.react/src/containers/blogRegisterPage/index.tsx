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
import { BlogRegisterInitialState, BlogRegisterPOSTInitialState, BlogRegisterPOSTPayload, BlogRegisterPOSTResponse } from "./types";
import { postBlogRegister } from "../App/api/blogApis";

interface Props {
  dataPost: Function; 
}

// https://github.com/Nooruddin-code/english-words-Json/blob/master/words_dictionary.json

const commonNouns = ['time', 'year', 'people', 'way', 'day', 'man', 'thing', 'woman', 'life', 'child', 'world', 'school', 'state', 'family', 'student', 'group', 'country', 'problem', 'hand', 'part', 'place', 'case', 'week', 'company', 'system', 'program', 'question', 'work', 'government', 'number', 'night', 'point', 'home', 'water', 'room', 'mother', 'area', 'money', 'story', 'fact', 'month', 'lot', 'right', 'study', 'book', 'eye', 'job', 'word', 'business', 'issue', 'side', 'kind', 'head', 'house', 'service', 'friend', 'father', 'power', 'hour', 'game', 'line', 'end', 'member', 'law', 'car', 'city', 'community', 'Name', 'president', 'team', 'minute', 'idea', 'kid', 'body', 'information', 'back', 'parent', 'face', 'others', 'level', 'office', 'door', 'health', 'person', 'art', 'war', 'history', 'party', 'result', 'change', 'morning', 'reason', 'research', 'girl', 'guy', 'moment', 'air', 'teacher', 'force', 'education']

function BlogRegisterPage(props: Props): JSX.Element {
  const [state, setState] = useState({...BlogRegisterInitialState});
  const [POSTstate, setPOSTState] = useState({...BlogRegisterPOSTInitialState})
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [scheme, setScheme] = useContext(SchemeContext);
  // const [token, setToken] = useContext(useAccessToken);
  // useAccessToken()

  function generateUsername() {
    return commonNouns[Math.floor(Math.random() * commonNouns.length)]
  }
  function generatePassword(length: number) {
    return Math.random().toString(16).substr(2, length);
  }

  useEffect(() => {
    setUsername(generateUsername())
    setPassword(generatePassword(16))
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: BlogRegisterPOSTPayload) => {
    setPOSTState({...POSTstate, loading: true});
    event.preventDefault();
    props.dataPost(payload).then((resp: BlogRegisterPOSTResponse) => {
      if(resp.success) {
        setPOSTState({
          details: resp,
          error: false,
          errorMessage: '',
          loading: false
        });
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
    document.title = `Blog Register | ${scheme.title}`;
  }, []);


  return (
      <div className="container">
        <div className="links">
          <h2 className='main-heading' style={{color: scheme.body.h1}}>Register</h2>
          <form onSubmit={((e) => handleSubmit(e, {
            session_id: sessionStorage.getItem('session_id') ?? 'error',
            data: {
              blog_username: username,
              blog_password: password
            }
          }))}>
            <div className="field">
              <p>Username: </p>
              <input type="text" value={username} readOnly={true} onChange={(e) => {e.target.value = username}}></input>
            </div>
            <div className="field">
              <p>Password: </p>
              <input type="text" value={password} readOnly={true} onChange={(e) => {e.target.value = password}}></input>
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
    <BlogRegisterPage dataPost={postBlogRegister} />
  ) 
};

export default enhance;