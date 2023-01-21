import React, {
  HtmlHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react"
import Spinner from "../../components/Spinner"
import { fetchContact, postContact } from "../App/api/contactApi"
import Navbar from "../../components/Navbar"
import { SchemeContext } from "../context/colourScheme"
import "./style.css"

import { ReactP5Wrapper } from "react-p5-wrapper"
import sketchWrapper from "../../components/p5/box"
import { Button } from "../../components/Button"
import ForumItem from "../../components/ForumItem"
import ButtonRedir from "../../components/ButtonRedir"
import { useAccessToken } from "../authContext/context"
import { getForumHome } from "../App/api/forumApis"
import { forumPath } from "../App/api/types"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ForumRouteType } from "../App/routeTypes"
import Redirect from "../../components/Redirect"
import { ForumHomeGETInitialState, ForumHomeGETResponse } from "./types"
import { IslandCenter } from "../../templates/IslandCenter"
import { IslandLeft } from "../../templates/IslandLeft"
import { Input } from "../../components/Input"
import ErrorPage from "../ErrorPage"

interface Props {
  dataCall: Function
}

function ForumHomePage(props: Props): JSX.Element {
  const [state, setState] = useState({ ...ForumHomeGETInitialState })
  const [searchState, setSearchState] = useState("")
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext)
  const [token, setToken] = useAccessToken()
  const location = useLocation()
  const navigate = useNavigate()

  function dataFetch() {
    let paramString = window.location.href.split("?")[1]
    let queryString = new URLSearchParams(paramString)

    props
      .dataCall(
        {
          session_id: sessionStorage.getItem("session_id"),
          category: queryString.get("category"),
          search: queryString.get("search"),
        },
        token,
      )
      .then((resp: ForumHomeGETResponse) => {
        setState({
          details: resp,
          error: false,
          errorMessage: null,
          loading: false,
        })
      })
      .catch((err: any) => {
        setState({
          error: true,
          errorMessage: err,
          loading: false,
        })
      })
  }

  useEffect(() => {
    if (!token) {
      return
    }
    dataFetch()
  }, [token, location])

  const handleSubmit = () => {
    navigate(`/${ForumRouteType.ForumHome}?search=${searchState}`)
    return (
      <Redirect
        destination={`/${ForumRouteType.ForumHome}?search=${searchState}`}
      />
    )
  }

  useEffect(() => {
    document.title = `Forum Home | ${scheme.title}`
  }, [])

  console.log(token)

  if (state.loading) return <Spinner />
  if (token === "") {
    return (
      <Redirect
        destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`}
      />
    )
  }
  if (state.error && state.errorMessage)
    return <ErrorPage error={state.errorMessage} />
  if (state.details && state.details.data) {
    const data = state.details.data
    return (
      <IslandLeft>
        <div className="forumHomePage">
          {window.outerWidth > 1000 ? <Navbar isVertical={true} /> : <></>}
          <div className="links">
            <h2
              className="main-heading"
              style={{ color: scheme.body.h1 }}
            >
              Forum Home
            </h2>
            <div className="posts">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                <div className="search">
                  <Input
                    value={searchState}
                    onChange={e => {
                      setSearchState(e.target.value)
                    }}
                  />
                  <Button
                    colours={scheme}
                    callBack={handleSubmit}
                    label="search"
                  ></Button>
                  {/* <ButtonRedir destination={`/${ForumRouteType.ForumHome}?search=${searchState}`} label="Search" local={true}></ButtonRedir> */}
                </div>
              </form>
              {Object.keys(data).map((segment, indexSegment) => (
                <div
                  className="category"
                  key={indexSegment}
                >
                  <Link
                    key={indexSegment ** 2}
                    to={`/${forumPath}?category=${segment}`}
                  >
                    <p>Topic - {segment}</p>
                  </Link>
                  <div className="posts">
                    {data[segment].map((catPost, catPostIndex) => (
                      <ForumItem
                        key={catPostIndex}
                        data={catPost}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IslandLeft>
    )
  }
  return <></>
}

const enhance = (): JSX.Element => {
  return <ForumHomePage dataCall={getForumHome} />
}

export default enhance
