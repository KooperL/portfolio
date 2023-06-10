import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
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
import { State } from "../../types/State"
import { CMSPage } from "../../components/TypeLookup/types"

interface Props {
  stateCMS: State<CMSPage>
  scheme: PageInformation
}

function HomePage(props: Props): JSX.Element {
  if (props.stateCMS.loading) return <Spinner />
  if (props.stateCMS.error && props.stateCMS.errorMessage)
    return <ErrorPage error={props.stateCMS.errorMessage} />
  if (props.stateCMS.details) {
    const data = props.stateCMS.details

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
                <TypeLookup {...data} />
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
