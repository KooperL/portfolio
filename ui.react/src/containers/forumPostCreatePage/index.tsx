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
  ForumPostCreatePOSTInitialState,
  ForumPostCreatePOSTPayload,
  ForumPostCreatePOSTResponse,
} from "./types"
import { postPostCreate } from "../App/api/forumApis"
import { forumPath } from "../App/api/types"
import { ForumRouteType } from "../App/routeTypes"
import Redirect from "@components/Redirect"
import { IslandCenter } from "@templates/IslandCenter"
import { Input } from "@components/Input"
import { Textarea } from "@components/Textarea"
import { State } from "../../types/State"
import { useForumPostCreateState } from "@controllers/useForumPostCreateState"

interface Props {
  scheme: PageInformation
  token: string | null
  state: State<ForumPostCreatePOSTResponse>
  body: string
  setBody: React.Dispatch<React.SetStateAction<string>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumPostCreatePOSTPayload,
  ) => void
}

function ForumPostCreatePage(props: Props): JSX.Element {
  if (props.token === "") {
    return (
      <Redirect
        destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`}
      />
    )
  }
  return (
    <IslandCenter>
      <div className="forumCreatePage">
        <div className="links">
          <div id="form-container">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Post
            </h2>
            <form
              onSubmit={e =>
                props.handleSubmit(e, {
                  session_id: sessionStorage.getItem("session_id") ?? "error",
                  data: {
                    forum_title: props.title,
                    forum_body: props.body,
                  },
                })
              }
            >
              <Input
                label="Title"
                value={props.title}
                onChange={e => {
                  props.setTitle(e.target.value)
                }}
              />
              <Textarea
                label="Body"
                value={props.body}
                onChange={e => {
                  props.setBody(e.target.value)
                }}
                resize="none"
                height="300px"
              />
              <div id="button">
                <Button colours={props.scheme} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </IslandCenter>
  )
}

const Enhance = (): JSX.Element => {
  return <ForumPostCreatePage {...useForumPostCreateState()} />
}

export default Enhance
