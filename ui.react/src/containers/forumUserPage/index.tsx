import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
import { fetchContact, postContact } from "../App/api/contactApi"
import Navbar from "../../components/Navbar"
import { SchemeContext } from "../context/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "../../components/p5/box"
import { Button } from "../../components/Button"
import { useAccessToken } from "../authContext/context"
import { getForumHome, getUserView } from "../App/api/forumApis"
import { forumPath } from "../App/api/types"
import { Link, Navigate, useLocation } from "react-router-dom"
import { ForumRouteType } from "../App/routeTypes"
import Redirect from "../../components/Redirect"
import ForumItem from "../../components/ForumItem"
import { ForumUserGETInitialState, ForumUserGETResponse } from "./types"
import ErrorPage from "../ErrorPage"

interface Props {
  dataCall: Function
}

function ForumHomePage(props: Props): JSX.Element {
  const [state, setState] = useState({ ...ForumUserGETInitialState })
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext)
  const [token, setToken] = useAccessToken()
  const location = useLocation()
  const user = window.location.href
    .toString()
    .slice(window.location.href.lastIndexOf("/") + 1)

  useEffect(() => {
    if (!token) {
      return
    }
    props
      .dataCall(
        {
          session_id: sessionStorage.getItem("session_id"),
        },
        token,
        user,
      )
      .then((resp: ForumUserGETResponse) => {
        setState({
          details: resp,
          error: false,
          errorMessage: null,
          loading: false,
        })
      })
      .catch((err: any) => {
        setState({
          error: true,
          errorMessage: err,
          loading: false,
        })
      })
  }, [token, location])

  useEffect(() => {
    document.title = `Forum Home | ${scheme.title}`
  }, [])

  if (state.loading) return <Spinner />
  if (token === "") {
    return (
      <Redirect
        destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`}
      />
    )
  }
  if (state.error && state.errorMessage)
    return <ErrorPage error={state.errorMessage} />
  if (state.details && state.details.data) {
    const data = state.details.data
    console.log(data)
    return (
      <div className="forumUserPage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
        <div className="container">
          <div className="links">
            <span className="main-heading">User -&nbsp;</span>
            <span
              className="main-heading"
              style={{ color: scheme.body.h1 }}
            >
              {user}
            </span>
            <div className="posts">
              {/** @ts-ignore */}
              {data.map((catPost, catPostIndex) => (
                <ForumItem
                  key={catPostIndex}
                  data={catPost}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}

const enhance = (): JSX.Element => {
  return <ForumHomePage dataCall={getUserView} />
}

export default enhance
