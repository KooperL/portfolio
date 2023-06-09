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
// import { HomeInitialState, HomePayload } from "../homePage/types"
import ButtonRedir from "../../components/ButtonRedir"
import TypeLookup from "../../components/TypeLookup"
import { IslandLeft } from "../../templates/IslandLeft"
import ErrorPage from "../ErrorPage"
import { useFetch } from "../../hooks/useFetch"
import { ApiError } from "../../api/apiErrorHandler"
import { State } from "../../types/State"
import { useProjectsState } from "../../controllers/useProjectsState"
import { cmsData } from "@containers/App/api/types"

interface Props {
  scheme: PageInformation
  stateCMS: State<cmsData[]>
}

function ProjectsPage(props: Props): JSX.Element {
  if (props.stateCMS.loading) return <Spinner />
  if (props.stateCMS.error && props.stateCMS.errorMessage)
    return <ErrorPage error={props.stateCMS.errorMessage} />
  if (props.stateCMS.details) {
    const data = props.stateCMS.details
    return (
      <IslandLeft>
        <div className="projectsPage">
          {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
          <div
            className="container"
            style={{ backgroundColor: "" ?? props.scheme.body.background }}
          >
            <div className="links-container">
              <h2
                className="main-heading"
                style={{ color: props.scheme.body.h1 }}
              >
                Projects
              </h2>
              <div className="links">
                {data.map((segment, indexSegment) => (
                  <TypeLookup
                    key={indexSegment}
                    type={segment.type}
                    data={segment.data}
                    text={segment?.text}
                  />
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
  return <ProjectsPage {...useProjectsState()} />
}

export default Enhance
