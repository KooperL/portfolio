import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
import Navbar from "../../components/Navbar"
import { PageInformation, SchemeContext } from "../../state/colorScheme/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "../../components/p5/box"
import { Button } from "../../components/Button"
import { Link, Navigate, useLocation } from "react-router-dom"
import Redirect from "../../components/Redirect"
import ForumItem from "../../components/ForumItem"
import ErrorPage from "../ErrorPage"
import { State } from "../../types/State"
import { useForumUserState } from "../../controllers/useForumUserState"
import { IslandCenter } from "../../templates/IslandCenter"
import { ForumUserResponsePayload } from "src/api/clients/forumHandler/routes/fetchForumUser/types"
import { forumPath, genericApiDataResponse } from "src/api/shared/types"
import { routes } from "src/api/clients/forumHandler/types"
import { AuthContextType } from "src/state/authContext/types"

interface Props {
  scheme: PageInformation
  authentication: AuthContextType['authentication']
  state: State<genericApiDataResponse<ForumUserResponsePayload[]>>
  user: string
}

function ForumHomePage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage && !props.state.details?.data)
    return <ErrorPage errorMessage={props.state.errorMessage} errorType='NETWORK' />
  if (props.state.details) {
    const data = props.state.details.data as ForumUserResponsePayload[]
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
