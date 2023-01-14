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
import { getPostView, postPostCreate } from "../App/api/forumApis";
import { forumPath } from "../App/api/types";
import Redirect from "../../components/Redirect"
import { BlogRouteType } from "../App/routeTypes";
import daysAgo from "../../utils/daysAgo";
import { IslandCenter } from "../../templates/IslandCenter";


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
    const postId = window.location.href.toString().slice(window.location.href.lastIndexOf('/') + 1)
    props.dataGet({session_id: sessionStorage.getItem('session_id')}, token, postId).then(
      (resp: BlogPostViewGETResponse) => {
        if(resp.success) {
          setGETState({
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
        setGETState({
          error: true,
          errorMessage: err,
          loading: false
        });
      }
    )
  }, [token]);

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
  //       navigate(`/${forumPath}/post/`)
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
  }, [GETstate]);

  if(GETstate.loading) {
    return <Spinner/>
   }
   if(!token?.length) {
     return (
       <Redirect
         destination={`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogRegister}`}
       />
     )
   }
   if(GETstate.error) {
     return (
       <div>
         {JSON.stringify(GETstate.errorMessage)}
       </div>
     );
   }
  const data = GETstate.details?.data;
  return (
    <IslandCenter>
    <div className="forumPostViewPage">
        <div className="links">
          <div id="form-container">
            <div id="post">
              <div className="row">
                <p>Posted to:&nbsp;</p>
                <p>{data?.category}</p>
                <p>,&nbsp;</p>
                <p>{daysAgo(data?.date ?? '0')}</p>
              </div>
              <div className="title">
                <p className="field">{data?.title}</p>
              </div>
              <div className="metadata">
                <div className="row">
                  <p>By:&nbsp;</p>
                  <p style={{color: scheme.body.h1}}>{data?.author}</p>
                </div>
                <div className="row">
                  <p>{data?.views}</p>
                  <p>&nbsp;view(s)</p>
                </div>
              </div>
              <div className="body" style={{borderColor: scheme.body.foreground}}>
                <p className="field">{data?.body}</p>
              </div>
              {/* <div id="button">
                <Button colours={scheme} />
              </div> */}
              {/* <form onSubmit={((e) => handleSubmit(e, {
                session_id: sessionStorage.getItem('session_id') ?? 'error',
                data: {
                  forum_title: title,
                  forum_body: body
                }
              }))}>
            </form> */}
            </div>
          </div>
      </div>
    </div>
    </IslandCenter>
  );

}

const enhance = (): JSX.Element => {
  return(
    <BlogPostViewPage dataGet={getPostView} />
  ) 
};

export default enhance;