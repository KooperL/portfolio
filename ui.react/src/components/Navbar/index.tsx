import { useContext, useEffect, useState } from "react"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import "./style.css"
import { Link, useNavigate } from "react-router-dom"
import ButtonRedir from "../ButtonRedir"
import Hamburger from "../Hamburger"
import { useLocation } from "react-router-dom"
import { sendForumLogout } from "src/api/clients/forumHandler/routes/sendForumLogout"
import { forumPath, routes } from "src/containers/App/types"
import { useAuth } from "src/hooks/useAuth"

function getPath() {
  return window.location.pathname.split("/").filter(item => item)
}

const site = () => {
  let name = "kooperlingohr.com/".split("")
  for (let i = 0; i < name.length; i++) {
    const rand = Math.random()
    if ((rand * 100) % 10 > 8) {
      name[i] = name[Math.floor(rand * name.length)]
    }
  }
  return name.join("")
}

function Navbar(props: { isVertical: boolean }) {
  const [scheme, setScheme] = useContext(SchemeContext)
  // const [path, setPath] = useState([''])
  const { authentication } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  let bannerText = []

  // window.innerHeight window.innerWidth
  for (
    let i = 0;
    i <
    (props.isVertical
      ? Math.floor(window.innerHeight / 60)
      : Math.floor(window.innerWidth / 110));
    i++
  ) {
    if (i % 3 === 0) {
      bannerText.push(
        <span
          key={i}
          style={{ color: scheme.header.text }}
        >
          {site()}
        </span>,
      )
    } else {
      bannerText.push(
        <span
          key={i}
          className=""
          style={{ color: scheme.header.background }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>,
      )
    }
  }

  function buttonController(path: string[]) {
    if (path[0] && path[0].toLowerCase() === "forum") {
      if (!authentication.accessToken) {
        // No user
        // Should have already been redirected to login/register page
      } else {
        // Signed in

        const username = JSON.parse(atob(authentication.accessToken.split(".")[1]))["username"]

        const HamburgerData = (
          <Hamburger
            data={[
              {
                destination: `/${forumPath}/${routes.forumPostCreate}`,
                label: "create",
              },
              {
                destination: `/${forumPath}/${routes.forumUserView}/${username}`,
                label: "my posts",
              },
              {
                destination: `/${forumPath}`,
                label: "logout",
                callback: () => {
                  sendForumLogout({
                    payload: { session_id: sessionStorage.getItem("session_id") ?? "" },
                    auth: `Bearer ${authentication.accessToken}`,
                  }).then(resp => {
                    if (resp?.data?.success) {
                      authentication.setAccessToken(null)
                      navigate(
                        `/${forumPath}/${routes.forumLogin}`,
                      )
                    }
                  })
                },
              },
            ]}
          />
        )
        return [HamburgerData, "items"]
      }
    } else {
      return []
    }
    return []
  }

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
