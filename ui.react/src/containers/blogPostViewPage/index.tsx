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
import { BlogPostViewGETInitialState, BlogPostViewGETPayload, BlogPostViewGETResponse } from "./types";
import { getPostView, postPostCreate } from "../App/api/blogApis";
import { blogPath } from "../App/api/types";
import { RouteType } from "../App/routeTypes";

interface Props {
  dataGet: Function; 
}

function BlogPostViewPage(props: Props): JSX.Element {
  const [GETstate, setGETState] = useState({...BlogPostViewGETInitialState})
  const [scheme, setScheme] = useContext(SchemeContext);
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {return}
    setGETState({...GETstate, loading: true});
    props.dataGet({session_id: sessionStorage.getItem('session_id')}, token, window.location.href.toString().slice(window.location.href.lastIndexOf('/')+1)).then(
      (resp: BlogPostViewGETResponse) => {
        if(resp.success) {
          setGETState({
            details: resp,
            error: false,
            errorMessage: '',
            loading: false
          });
          // navigate(`/${blogPath}/post/`)
        } else {
          throw new Error(resp.error);
        }
      }).catch((err: any) => {
        console.log(err)
        setGETState({
          error: true,
          errorMessage: err,
          loading: false
        });
      }
    )
  }, [token]);

  console.log(token)

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: BlogPostViewGETPayload) => {
  //   setPOSTState({...POSTstate, loading: true});
  //   event.preventDefault();
  //   props.dataPost(payload).then((resp: BlogPostViewGETResponse) => {
  //     if(resp.success) {
  //       setPOSTState({
  //         details: resp,
  //         error: false,
  //         errorMessage: '',
  //         loading: false
  //       });
  //       navigate(`/${blogPath}/post/`)
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
    document.title = `${GETstate.details ? GETstate.details?.data?.title : 'Loading'} | ${scheme.title}`;
    // window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  }, []);

  if(!GETstate.details) {
    return <>loading</>
  } 
  return (
    <div className="container">
      <div className="links">
        <div id="form-container">
          <h2 className='main-heading' style={{color: scheme.body.h1}}>Post</h2>
            <div id="post">
            <div className="title">
              <p>Title</p>
              <p className="field">{GETstate.details?.data?.title}</p>
            </div>
            <div className="body">
              <p>Body</p>
              <p className="field">{GETstate.details?.data?.body}</p>
            </div>
            <div id="button">
              <Button colours={scheme} />
            </div>
            {/* <form onSubmit={((e) => handleSubmit(e, {
              session_id: sessionStorage.getItem('session_id') ?? 'error',
              data: {
                blog_title: title,
                blog_body: body
              }
            }))}>
          </form> */}
          </div>
        </div>
      </div>
    </div>
  );

}

const enhance = (): JSX.Element => {
  return(
    <BlogPostViewPage dataGet={getPostView} />
  ) 
};

export default enhance;