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
import { useNavigate } from "react-router-dom"
import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "../../components/p5/box"
import { Button } from "../../components/Button"
import { useAccessToken } from "../authContext/context"
import {
  ForumLoginPOSTInitialState,
  ForumLoginPOSTPayload,
  ForumLoginPOSTResponse,
  ForumRegisterPOSTPayload,
  ForumRegisterPOSTResponse,
} from "./types"
import { postForumLogin, postForumRegister } from "../App/api/forumApis"
import { forumPath } from "../App/api/types"
import Redirect from "../../components/Redirect"
import { ForumRouteType } from "../App/routeTypes"
import { IslandCenter } from "../../templates/IslandCenter"
import { Input } from "../../components/Input"
import Modal from "../../components/Modal"
import { termsAndConditions } from "../../assets/TermsAndConditions"
import { useForumLoginState } from "../../controllers/useForumLoginState"

interface Props {
  token: string | null
  scheme: PageInformation
  handleSubmitRegister: (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumRegisterPOSTPayload,
  ) => void
  handleSubmitLogin: (
    e: React.FormEvent<HTMLFormElement>,
    data: ForumLoginPOSTPayload,
  ) => void
  usernameRegister: string
  setUsernameRegister: React.Dispatch<React.SetStateAction<string>>
  passwordRegister: string
  setPasswordRegister: React.Dispatch<React.SetStateAction<string>>
  usernameLogin: string
  setUsernameLogin: React.Dispatch<React.SetStateAction<string>>
  passwordLogin: string
  setPasswordLogin: React.Dispatch<React.SetStateAction<string>>
}

function ForumLoginPage(props: Props): JSX.Element {
  if (props.token !== "" && props.token !== null) {
    return <Redirect destination={`/${ForumRouteType.ForumHome}`} />
  }
  const tnc = termsAndConditions()
  console.log(props.usernameLogin)
  console.log(props.passwordRegister)
  return (
    <IslandCenter>
      <div className="forumLoginPage">
        <div className="links">
          <div id="register">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Register
            </h2>
            <form
              onSubmit={e =>
                props.handleSubmitRegister(e, {
                  session_id: sessionStorage.getItem("session_id") ?? "error",
                })
              }
            >
              <Input
                label="Username: "
                value={props.usernameRegister}
                readOnly={true}
                onChange={e => {
                  e.target.value = props.usernameRegister
                }}
              />
              <Input
                label="Password: "
                value={props.passwordRegister}
                readOnly={true}
                onChange={e => {
                  e.target.value = props.passwordRegister
                }}
              />
              <div id="button">
                <Button
                  colours={props.scheme}
                  action="submit"
                />
                {/* <Modal
                  closedChildren={
                    <Button
                      colours={props.scheme}
                      action="button"
                    />
                  }
                >
                  <div className="modal-children">
                    <div>
                      {Object.keys(tnc).map(section => (
                        <div key={section}>
                          <h3>{section}</h3>
                          {Object.keys(tnc[section]).map((text, ind) => (
                            <p key={text}>{`${tnc[section][ind]}`}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                    <Button
                      colours={props.scheme}
                      label="I agree"
                      action="submit"
                      callBack={() => {}}
                    />
                  </div>
                </Modal> */}
              </div>
            </form>
          </div>

          <div id="login">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Login
            </h2>
            <form
              onSubmit={e =>
                props.handleSubmitLogin(e, {
                  session_id: sessionStorage.getItem("session_id") ?? "error",
                })
              }
            >
              <Input
                label="Username: "
                value={props.usernameLogin}
                autoComplete="username email"
                onChange={e => {
                  props.setUsernameLogin(e.target.value)
                }}
              />
              <Input
                label="Password: "
                value={props.passwordLogin}
                autoComplete="new-password"
                onChange={e => {
                  props.setPasswordLogin(e.target.value)
                }}
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
  return <ForumLoginPage {...useForumLoginState()} />
}

export default Enhance
