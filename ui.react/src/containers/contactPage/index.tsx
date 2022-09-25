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
  }, []);

  function typeLookup(type: string, data:string[]) {
    switch(type) {
      case 'button':
        return <a href={data[0]}><div style={{backgroundColor: scheme.button.bgSolid}} className={type}>{data[0]}</div></a>
      case 'unorderedList':
        return <ul className={`text ${type}`}>{data.map((item:string) => <li>{item}</li>)}</ul>
      case 'body':
        return <p className={`text ${type}`}>{data.map((item:string) => <span>{item}</span>)}</p>
      case 'header':
      case 'subheader':
      case 'emoji':
        return <p className={`text ${type}`}>{data[0]}</p>
    }
      
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, payload: ContactPOST) => {
    setPOSTState({...POSTstate, loading: true});
    event.preventDefault();
    props.dataPost(payload).then((resp: ContactPOSTPayload) => {
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
    document.title = `Contact | ${scheme.title}`;
  }, []);

  function SearchBar() {
    return (
      <div className="search-container">
        <div className="form">
          <form onSubmit={((e) => handleSubmit(e, {
            session_id: localStorage.getItem('uuid') ?? 'error',
            message: value
          }))}>
            <div className="inputWithButton">
              <div className="inputContainer">
                <div className="inputLabel">📝: </div>
                <input className="input" type="text" value={value} onChange={((e) => {setValue(e.target.value)})} />
              </div>
              <div className="submit-button">
                <Button colours={scheme} />
              </div>
              <div className="status">
                {POSTstate.loading ? '🛫' : (POSTstate.details ? (POSTstate.details.success ? '✅' : '❌') : '')}
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
            <h2 className='main-heading' style={{color: scheme.body.h1}}>Contact</h2>
            {data.map((segment, indexSegment) => (
              <div key={indexSegment}>
                {typeLookup(segment.type, segment.data)}
              </div>
            ))}
          {SearchBar()}
          </div>
        </div>
      </>
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