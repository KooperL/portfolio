import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react'
import Spinner from '../../components/Spinner'
import Navbar from '../../components/Navbar'
import {
  PageInformation,
  SchemeContext,
} from '../../state/colorScheme/colourScheme'
import './style.css'

import { ReactP5Wrapper } from 'react-p5-wrapper'
import sketchWrapper from '../../components/p5/box'
// import { HomeInitialState, HomePayload } from "../homePage/types"
import ButtonRedir from '../../components/ButtonRedir'
import TypeLookup from '../../components/TypeLookup'
import { IslandLeft } from '../../templates/IslandLeft'
import ErrorPage from '../ErrorPage'
import { useFetch } from '../../hooks/useFetch'
import { State } from '../../types/State'
import { useProjectsState } from '../../controllers/useProjectsState'
import { CMSPageResponse } from '../../components/TypeLookup/types'

interface Props {
  scheme: PageInformation
  stateCMS: State<CMSPageResponse>
}

function ProjectsPage(props: Props): JSX.Element {
  return (
    <IslandLeft>
      <div className="projectsPage">
        {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
        <div
          className="container"
          style={{ backgroundColor: '' ?? props.scheme.body.background }}
        >
          <div className="links-container">
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
  return <ProjectsPage {...useProjectsState()} />
}

export default Enhance
