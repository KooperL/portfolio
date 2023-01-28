import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ForumRouteType } from "../../containers/App/routeTypes"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import { ForumHomeGETResponse } from "../../containers/forumHomePage/types"
import Redirect from "../../components/Redirect"
import { usePost } from "../../hooks/usePost"
import { endpoints } from "../../containers/App/api/endpoints"
import { ForumLoginPOSTPayload } from "../../containers/forumLoginPage/types"
import {
  ForumPostViewGETPayload,
  ForumPostViewGETResponse,
} from "../../containers/forumPostViewPage/types"

export const useForumPostViewState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken()
  const navigate = useNavigate()
  const { state: GETstate, post } = usePost<
    ForumPostViewGETPayload,
    ForumPostViewGETResponse
  >()

  const varRoute = window.location.href
    .split("/")
    .slice(-1)[0]
    .replace(/[^0-9]/g, "")

  useEffect(() => {
    if (!token) {
      return
    }
    post({
      endpoint: endpoints["forumPost"] + varRoute,
      authBearer: token ?? "",
      data: {
        session_id: sessionStorage.getItem("session_id") ?? "error",
      },
    })
  }, [token])

  useEffect(() => {
    document.title = `${
      GETstate.details ? GETstate.details?.data?.title : "Loading"
    } | ${scheme.title}`
    // window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  }, [GETstate])

  return {
    scheme,
    token,
    GETstate,
  }
}
