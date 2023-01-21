import { useContext, useEffect, useState } from "react"
import { SchemeContext } from "../../containers/context/colourScheme"
import "./style.css"
import { Link } from "react-router-dom"
import ButtonRedir from "../ButtonRedir"
import Hamburger from "../Hamburger"
import { useLocation } from "react-router-dom"
import { useAccessToken } from "../../containers/authContext/context"
import { forumPath } from "../../containers/App/api/types"
import { ForumRouteType } from "../../containers/App/routeTypes"
import { postForumLogout } from "../../containers/App/api/forumApis"
import { ForumRegisterPOSTResponse } from "../../containers/forumLoginPage/types"

// style="width: 100000px; transform: translateX(-3561px); animation: 12.9416s linear 0s infinite normal none running marqueeAnimation-77345020;"

function getPath() {
  return window.location.pathname.split("/").filter(item => item)
}

function Navbar(props: { isVertical: boolean }) {
  const [scheme, setScheme] = useContext(SchemeContext)
  // const [path, setPath] = useState([''])
  const [token, setToken] = useAccessToken()
  console.log(`%${token}`)

  const location = useLocation()

  let bannerText = []
  // window.innerHeight window.innerWidth
  for (let i = 0; i < (props.isVertical ? 15 : 21); i++) {
    if (i % 2 === 0) {
      bannerText.push(
        <div
          key={i}
          style={{ color: scheme.header.text }}
        >
          kooperlingohr.com/
        </div>,
      )
    } else {
      bannerText.push(
        <div
          key={i}
          className=""
          style={{ color: scheme.header.background }}
        >
          -------
        </div>,
      )
    }
  }

  function buttonController(path: string[]) {
    if (path[0] && path[0].toLowerCase() === "forum") {
      if (token === "") {
      } else if (token === null) {
        // No user
        // Should already be redirected to login/register page
      } else {
        // Signed in

        const username = JSON.parse(atob(token.split(".")[1]))["username"]
        const forum_create = (
          <ButtonRedir
            destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumPostCreate}`}
            label="create"
            local={true}
          />
        )
        const forum_profile = (
          <ButtonRedir
            destination={`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumUser}/${username}`}
            label="My posts"
            local={true}
          />
        )
        const forum_sign_out = (
          <ButtonRedir
            destination={`/${ForumRouteType.ForumHome}`}
            label="Log out"
            local={true}
            onClickCallback={() => {
              postForumLogout(
                { session_id: sessionStorage.getItem("session_id") ?? "" },
                token,
              ).then(resp => {
                resp = resp as ForumRegisterPOSTResponse
                if (resp.success) {
                  setToken(null)
                }
              })
            }}
          />
        )
        const items = [forum_create, forum_profile, forum_sign_out]
        // Search field?
        // setSpecialButtons(items)

        const HamburgerData = (
          <Hamburger
            data={[
              {
                destination: `/${ForumRouteType.ForumHome}/${ForumRouteType.ForumPostCreate}`,
                label: "create",
              },
              {
                destination: `/${ForumRouteType.ForumHome}/${ForumRouteType.ForumUser}/${username}`,
                label: "my posts",
              },
              {
                destination: `/${ForumRouteType.ForumHome}`,
                label: "logout",
                callback: () => {
                  postForumLogout(
                    { session_id: sessionStorage.getItem("session_id") ?? "" },
                    token,
                  ).then(resp => {
                    resp = resp as ForumRegisterPOSTResponse
                    if (resp.success) {
                      setToken(null)
                    }
                  })
                },
              },
            ]}
          />
        )
        return [HamburgerData, items]
      }
    } else {
      return []
    }
    return []
  }

  // useEffect(() => {
  //   const pathTemp = getPath()
  //   setPath(pathTemp)
  //   setSpecialButtons(buttonController(pathTemp))
  // }, [location])

  // useEffect(() => {
  //   const pathTemp = getPath()
  //   setPath(pathTemp)
  //   setSpecialButtons(buttonController(pathTemp))
  //   console.log('```````````````````````````````````````````````````')
  // }, [])

  const path = getPath()
  const aaa = buttonController(path)

  const home = (
    <ButtonRedir
      destination="/"
      label="Home ⬅️"
      local={true}
    />
  )
  const back = (
    <ButtonRedir
      destination={path[0]}
      label={`${path[0] ?? "/"} ⬅️` ?? ""}
      local={true}
    />
  )

  return (
    <div className="navbar">
      <nav
        className={`nav-container ${props.isVertical ? "vertical" : ""}`}
        style={{
          backgroundColor: scheme.header.background,
          zIndex: props.isVertical ? 1 : 11,
        }}
      >
        <div className="nav-row">
          <div className="placeholder">
            {/* {window.outerWidth > 1000 ? aaa[1] : aaa[0] } */}
            {aaa[0]}
          </div>
          {/* {props.isVertical ? '' : specialButtons} */}
          <div className="buttons-container">
            {!!path.length ? (!props.isVertical ? home : "") : ""}
            {path.length >= 2 ? (!props.isVertical ? back : "") : ""}
          </div>
          <div className="tech-slideshow">
            <div
              className="mover-1 text"
              style={{ height: "100%" }}
            >
              {bannerText.map(jsx => jsx)}
            </div>
          </div>
          {/* <div className='buttons-container'>
            {specialButtons}
          </div> */}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
