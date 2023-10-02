import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
import Navbar from "../../components/Navbar"
import {
  PageInformation,
  SchemeContext,
} from "../../state/colorScheme/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "../../components/p5/box"
import ButtonRedir from "../../components/ButtonRedir"
import { IslandLeft } from "../../templates/IslandLeft"
import TypeLookup from "../../components/TypeLookup"
import ErrorPage from "../ErrorPage"
import { useHomeState } from "../../controllers/useHomeState"
import { State } from "../../types/State"
import { CMSPageResponse } from "../../components/TypeLookup/types"

interface Props {
  stateCMS: State<CMSPageResponse>
  scheme: PageInformation
}

function HomePage(props: Props): JSX.Element {
  console.log(props)
  return (
    <IslandLeft>
      <div className="homePage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
        <div className="container">
          <div className="">
            <div className="links">
              <TypeLookup {...props.stateCMS} />
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

const Enhance = (): JSX.Element => {
  return <HomePage {...useHomeState()} />
}

export default Enhance
