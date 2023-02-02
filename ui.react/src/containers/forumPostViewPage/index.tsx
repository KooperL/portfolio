import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "@components/Spinner"
import { fetchContact, postContact } from "../App/api/contactApi"
import Navbar from "@components/Navbar"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"
import { useNavigate } from "react-router-dom"
import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "@components/p5/box"
import { Button } from "@components/Button"
import { useAccessToken } from "../authContext/context"
import {
  ForumPostViewGETInitialState,
  ForumPostViewGETPayload,
  ForumPostViewGETResponse,
} from "./types"
import { getPostView, postPostCreate } from "../App/api/forumApis"
import { forumPath } from "../App/api/types"
import Redirect from "@components/Redirect"
import { ForumRouteType } from "../App/routeTypes"
import daysAgo from "../../utils/daysAgo"
import { IslandCenter } from "@templates/IslandCenter"
import { State } from "../../types/State"
import { useForumPostViewState } from "@controllers/useForumPostViewState"

interface Props {
  scheme: PageInformation
  token: string | null
  GETstate: State<ForumPostViewGETResponse>
}

function ForumPostViewPage(props: Props): JSX.Element {
  if (props.GETstate.loading) {
    return <Spinner />
  }
  if (!props.token?.length) {
    return (
      <Redirect
        destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`}
      />
    )
  }
  if (props.GETstate.error) {
    return <div>{JSON.stringify(props.GETstate.errorMessage)}</div>
  }
  const data = props.GETstate.details?.data
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
                <p>{daysAgo(data?.date ?? "0")}</p>
              </div>
              <div className="title">
                <p className="field">{data?.title}</p>
              </div>
              <div className="metadata">
                <div className="row">
                  <p>By:&nbsp;</p>
                  <p style={{ color: props.scheme.body.h1 }}>{data?.author}</p>
                </div>
                <div className="row">
                  <p>{data?.views}</p>
                  <p>&nbsp;view(s)</p>
                </div>
              </div>
              <div
                className="body"
                style={{ borderColor: props.scheme.body.foreground }}
              >
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
  )
}

const Enhance = (): JSX.Element => {
  return <ForumPostViewPage {...useForumPostViewState()} />
}

export default Enhance
