import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
import { ContactRequestPayload } from "./types"
import { postContact } from "../App/api/contactApi"
import Navbar from "../../components/Navbar"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "../../components/p5/box"
import { Button } from "../../components/Button"
import ButtonRedir from "../../components/ButtonRedir"
import { IslandCenter } from "../../templates/IslandCenter"
import TypeLookup from "../../components/TypeLookup"
import { Input } from "../../components/Input"
import ErrorPage from "../ErrorPage"
import { State } from "../../types/State"
import { useContactState } from "../../controllers/useContactState"
import { cmsData, GenericResponse } from "@containers/App/api/types"
import { ApiError } from "src/api/apiErrorHandler"

interface Props {
  scheme: PageInformation
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    payload: ContactRequestPayload,
  ) => void
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  stateCMS: State<cmsData[]>
  POSTstate: State<null>
}

function ContactPage(props: Props): JSX.Element {

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
                      ? !props.POSTstate.error
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

  if (props.stateCMS.loading) return <Spinner />
  if (props.stateCMS.error && props.stateCMS.errorMessage)
    return <ErrorPage error={props.stateCMS.errorMessage} />
  if (props.stateCMS.details) {
    const data = props.stateCMS.details

    return (
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
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <ContactPage {...useContactState()} />
}

export default Enhance
