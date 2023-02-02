import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "@components/Spinner"
import {
  ContactState,
  ContactPayload,
  ContactInitialState,
  ContactPOSTPayload,
  ContactPOSTInitialState,
  ContactPOST,
} from "./types"
import { fetchContact, postContact } from "../App/api/contactApi"
import Navbar from "@components/Navbar"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "@components/p5/box"
import { Button } from "@components/Button"
import ButtonRedir from "@components/ButtonRedir"
import { IslandCenter } from "@templates/IslandCenter"
import TypeLookup from "@components/TypeLookup"
import { Input } from "@components/Input"
import ErrorPage from "../ErrorPage"
import { State } from "../../types/State"
import { useContactState } from "@controllers/useContactState"

interface Props {
  scheme: PageInformation
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    payload: ContactPOST,
  ) => void
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  state: State<ContactPayload>
  POSTstate: State<ContactPOSTPayload>
}

function ContactPage(props: Props): JSX.Element {
  useEffect(() => {
    document.title = `Contact | ${props.scheme.title}`
  }, [])

  function SearchBar() {
    return (
      <div className="search-container">
        <div className="form">
          <form
            onSubmit={e =>
              props.handleSubmit(e, {
                session_id: sessionStorage.getItem("session_id") ?? "error",
                message: props.value,
              })
            }
          >
            <div className="inputWithButton">
              <Input
                inputBoxLabel="📝:"
                value={props.value}
                onChange={e => {
                  props.setValue(e.target.value)
                }}
              />
              <div className="submit-button">
                <Button colours={props.scheme} />
                <div className="status">
                  {props.value.length
                    ? props.POSTstate.loading
                      ? "🛫"
                      : props.POSTstate.details
                      ? props.POSTstate.details.success
                        ? "✅"
                        : "❌"
                      : "✏️"
                    : "🗒️"}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details) {
    const data = props.state.details.data

    return (
      // <div className="contactPage">
      <IslandCenter>
        <div className="contactPage">
          <div className="container">
            <div className="links">
              <h2
                className="main-heading"
                style={{ color: props.scheme.body.h1 }}
              >
                Contact
              </h2>
              {data.map((segment, indexSegment) => (
                <div key={indexSegment}>
                  {TypeLookup({
                    type: segment.type,
                    data: segment.data,
                    text: segment?.text,
                  })}
                </div>
              ))}
              {SearchBar()}
            </div>
          </div>
        </div>
      </IslandCenter>
      // </div>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <ContactPage {...useContactState()} />
}

export default Enhance
