import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
import { fetchContact, postContact } from "../App/api/contactApi"
import Navbar from "../../components/Navbar"
import { PageInformation, SchemeContext } from "../context/colourScheme"
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
import { State } from "../../types/state"
import { useForumUserState } from "../../controllers/useForumUserState"
import { IslandCenter } from "../../templates/IslandCenter"

interface Props {
  scheme: PageInformation
  token: string | null
  state: State<ForumUserGETResponse>
  user: string
}

function ForumHomePage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.token === "") {
    return (
      <Redirect
        destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`}
      />
    )
  }
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details && props.state.details.data) {
    const data = props.state.details.data
    return (
      <IslandCenter>
      <div className="forumUserPage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
        {/* <div className="container"> */}
          <div className="links">
            <span className="main-heading">User -&nbsp;</span>
            <span
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              {props.user}
            </span>
            <div className="posts">
              {data.map((catPost, catPostIndex) => (
                <ForumItem
                  key={catPostIndex}
                  data={catPost}
                />
              )) ?? <>No Posts</>}
            </div>
          {/* </div> */}
        </div>
      </div>
      </IslandCenter>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <ForumHomePage {...useForumUserState()} />
}

export default Enhance
