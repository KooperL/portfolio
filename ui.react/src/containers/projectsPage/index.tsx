import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "@components/Spinner"
import { ProjectsState, ProjectsPayload, ProjectsInitialState } from "./types"
import { fetchProjects } from "../App/api/projectsApi"
import Navbar from "@components/Navbar"
import { PageInformation, SchemeContext } from "../context/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "@components/p5/box"
// import { HomeInitialState, HomePayload } from "../homePage/types"
import ButtonRedir from "@components/ButtonRedir"
import TypeLookup from "@components/TypeLookup"
import { IslandLeft } from "@templates/IslandLeft"
import ErrorPage from "../ErrorPage"
import { useFetch } from "../../hooks/useFetch"
import { ApiError } from "../../api/apiErrorHandler"
import { HomePayload } from "../homePage/types"
import { State } from "../../types/State"
import { useProjectsState } from "@controllers/useProjectsState"

interface Props {
  scheme: PageInformation
  state: State<HomePayload>
}

function ProjectsPage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details) {
    const data = props.state.details.data
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
