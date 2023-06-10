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
import { Button } from "../../components/Button"
import ForumItem from "../../components/ForumItem"
import ButtonRedir from "../../components/ButtonRedir"
import { monitor, useAccessToken } from "../authContext/context"
import { getForumHome } from "../App/api/forumApis"
import { forumPath } from "../App/api/types"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ForumRouteType } from "../App/routeTypes"
import Redirect from "../../components/Redirect"
import { IslandCenter } from "../../templates/IslandCenter"
import { IslandLeft } from "../../templates/IslandLeft"
import { Input } from "../../components/Input"
import ErrorPage from "../ErrorPage"
import { State } from "../../types/State"
import { useForumHomeState } from "../../controllers/useForumHomeState"
import { ForumHomeResponse } from "./types"
import { forumItem } from "@containers/common/types"

interface Props {
  scheme: PageInformation
  token: string | null
  handleSubmit: () => void
  state: State<ForumHomeResponse>
  searchState: string
  setSearchState: React.Dispatch<React.SetStateAction<string>>
}

function ForumHomePage(props: Props): JSX.Element {
  if (props.state.loading) return <Spinner />
  if (props.token === "" || props.token === null) {
    return (
      <Redirect
        destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`}
      />
    )
  }
  if (props.state.error && props.state.errorMessage)
    return <ErrorPage error={props.state.errorMessage} />
  if (props.state.details && props.state.details.data) {
    const data = props.state.details
    return (
      <IslandLeft>
        <div className="forumHomePage">
          {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
          <div className="links">
            <h2
              className="main-heading"
              style={{ color: props.scheme.body.h1 }}
            >
              Forum Home
            </h2>
            <div className="posts">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  props.handleSubmit()
                }}
              >
                <div className="search">
                  <Input
                    value={props.searchState}
                    onChange={e => {
                      props.setSearchState(e.target.value)
                    }}
                  />
                  <Button
                    colours={props.scheme}
                    callBack={props.handleSubmit}
                    label="search"
                  ></Button>
                  {/* <ButtonRedir destination={`/${ForumRouteType.ForumHome}?search=${searchState}`} label="Search" local={true}></ButtonRedir> */}
                </div>
              </form>
              {Object.keys(data).map(
                (segment: string, indexSegment: number) => {
                  return (
                    <div
                      className="category"
                      key={indexSegment}
                    >
                      <Link
                        key={`${indexSegment}-1`}
                        to={`/${forumPath}?category=${segment}`}
                        onClick={monitor}
                      >
                        <p>{`Topic - ${segment}`}</p>
                      </Link>
                      <div className="posts">
                        {data[segment].map(
                          (catPost: forumItem, catPostIndex: number) => (
                            <ForumItem
                              key={`${indexSegment}-${catPostIndex}`}
                              data={catPost}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </IslandLeft>
    )
  }
  return <></>
}

const Enhance = (): JSX.Element => {
  return <ForumHomePage {...useForumHomeState()} />
}

export default Enhance
