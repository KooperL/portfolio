import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
import { HomeState, HomePayload, HomeInitialState } from "./types"
import { fetchHome } from "../App/api/homeApi"
import Navbar from "../../components/Navbar"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "../../components/p5/box"
import ButtonRedir from "../../components/ButtonRedir"
import { IslandLeft } from "../../templates/IslandLeft"
import TypeLookup from "../../components/TypeLookup"
import ErrorPage from "../ErrorPage"
import { useHomeState } from "../../controllers/useHomeState"
import { State } from "../../types/state"

interface Props {
  state: State<HomePayload>
  scheme: PageInformation
}

function HomePage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details) {
    const data = props.state.details.data

    return (
      <IslandLeft>
        <div className="homePage">
          {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
          <div className="container">
            <div className="">
              <h2
                className="main-heading"
                style={{ color: props.scheme.body.h1 }}
              >
                Home
              </h2>
              <div className="links">
                {data.map((segment, indexSegment) => (
                  <>
                    {TypeLookup({
                      type: segment.type,
                      data: segment.data,
                      text: segment?.text,
                    })}
                  </>
                ))}
              </div>
            </div>
            <div className="render">
              {/* {window.outerWidth > 1000 ?
              <ReactP5Wrapper sketch={sketchWrapper(1200, 1200, scheme.body.background, scheme.body.foreground, scheme.body.h1)} /> : <></>
            } */}
            </div>
          </div>
        </div>
      </IslandLeft>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <HomePage {...useHomeState()} />
}

export default Enhance
