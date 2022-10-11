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
import { BlogPostCreatePOSTInitialState, BlogPostCreatePOSTPayload, BlogPostCreatePOSTResponse } from "./types";
import { postPostCreate } from "../App/api/blogApis";
import { blogPath } from "../App/api/types";
import { RouteType } from "../App/routeTypes";

interface Props {
  dataPost: Function; 
}

function BlogPostCreatePage(props: Props): JSX.Element {
  const [POSTstate, setPOSTState] = useState({...BlogPostCreatePOSTInitialState})
  const [scheme, setScheme] = useContext(SchemeContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: BlogPostCreatePOSTPayload) => {
    setPOSTState({...POSTstate, loading: true});
    event.preventDefault();
    props.dataPost(payload, token).then((resp: BlogPostCreatePOSTResponse) => {
      if(resp.success) {
        setPOSTState({
          details: resp,
          error: false,
          errorMessage: '',
          loading: false
        });
        navigate(`/${blogPath}/post`)
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
    document.title = `Blog Create | ${scheme.title}`;
  }, []);

  return (
    <div className="container">
      <div className="links">
        <div id="form-container">
          <h2 className='main-heading' style={{color: scheme.body.h1}}>Post</h2>
          <form onSubmit={((e) => handleSubmit(e, {
              session_id: sessionStorage.getItem('session_id') ?? 'error',
              data: {
                blog_title: title,
                blog_body: body
              }
            }))}>
            <div className="title">
              <p>Title</p>
              <input className="field" value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
            </div>
            <div className="body">
              <p>Body</p>
              <textarea className="field"  value={body} onChange={(e) => {setBody(e.target.value)}}></textarea>
            </div>
            <div id="button">
              <Button colours={scheme} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

const enhance = (): JSX.Element => {
  return(
    <BlogPostCreatePage dataPost={postPostCreate} />
  ) 
};

export default enhance;