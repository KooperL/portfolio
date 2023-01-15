import React, { HtmlHTMLAttributes, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { ContactState, ContactPayload, ContactInitialState, ContactPOSTPayload, ContactPOSTInitialState, ContactPOST } from "./types";
import { fetchContact, postContact } from "../App/api/contactApi";
import Navbar from "../../components/Navbar";
import { SchemeContext } from "../context/colourScheme";
import './style.css';

import { ReactP5Wrapper } from "react-p5-wrapper";
import sketchWrapper from "../../components/p5/box";
import { Button } from "../../components/Button";
import ButtonRedir from "../../components/ButtonRedir";
import { IslandCenter } from "../../templates/IslandCenter";
import TypeLookup from "../../components/TypeLookup";
import { Input } from "../../components/Input";
import ErrorPage from "../ErrorPage";

interface Props {
  dataCall: Function; 
  dataPost: Function; 
}


function ContactPage(props: Props): JSX.Element {
  const [state, setState] = useState({...ContactInitialState});
  const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [value, setValue] = useState('');
  const [scheme, setScheme] = useContext(SchemeContext);

  useEffect(() => {
    props.dataCall().then((resp: ContactPayload) => {
      setState({
        details: resp,
        error: false,
        errorMessage: null,
        loading: false
      });
    }).catch((err: any) => {
      setState({
        error: true,
        errorMessage: err,
        loading: false
      });
    })
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: ContactPOST) => {
    setPOSTState({...POSTstate, loading: true});
    event.preventDefault();
    props.dataPost(payload).then((resp: ContactPOSTPayload) => {
      if(resp.success) {
        setPOSTState({
          details: resp,
          error: false,
          errorMessage: null,
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
    document.title = `Contact | ${scheme.title}`;
  }, []);

  function SearchBar() {
    return (
      <div className="search-container">
        <div className="form">
          <form onSubmit={((e) => handleSubmit(e, {
            session_id: sessionStorage.getItem('session_id') ?? 'error',
            message: value
          }))}>
            <div className="inputWithButton">

              <Input inputBoxLabel="📝:" value={value} onChange={((e) => {setValue(e.target.value)})}/>
              <div className="submit-button">
                <Button colours={scheme} />
                <div className="status">
                  {value.length ? (POSTstate.loading ? '🛫' : (POSTstate.details ? (POSTstate.details.success ? '✅' : '❌') : '✏️')) : '🗒️'}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }


  if(state.loading) {
   return <Spinner/>
  }
  if(state.error && state.errorMessage) {
    return (
      <ErrorPage error={state.errorMessage} />
    );
  }
  if(state.details) {
    const data = state.details.data

    return (
      // <div className="contactPage">
      <IslandCenter>
        <div className="contactPage">
          <div className="container">
            <div className="links">
              <h2 className='main-heading' style={{color: scheme.body.h1}}>Contact</h2>
              {data.map((segment, indexSegment) => (
                <div key={indexSegment}>
                  {TypeLookup({type: segment.type, data: segment.data, text: segment?.text})}
                </div>
              ))}
            {SearchBar()}
            </div>
          </div>
        </div>
      </IslandCenter>
      // </div>
    );
  }
  return <></>;
}

const enhance = (): JSX.Element => {
  return(
    <ContactPage dataCall={fetchContact} dataPost={postContact} />
  ) 
};

export default enhance;