import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import Redirect from "../../components/Redirect"
import { useFetch } from "src/hooks/useFetch"
import { ForumPostViewRequestPayload, ForumPostViewResponsePayload } from "src/api/clients/forumHandler/routes/fetchForumPostView/types"
import { fetchForumPostView } from "src/api/clients/forumHandler/routes/fetchForumPostView"


export const useForumPostViewState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  // const [token, setToken] = useContext(AccessToken);
  const [token, setToken] = useAccessToken()
  const navigate = useNavigate()
  const { state: GETstate, pull: post } = useFetch<
    ForumPostViewRequestPayload,
    ForumPostViewResponsePayload
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
      ApiImpl: fetchForumPostView,
      auth: `Bearer ${token ?? ""}`,
      varRoute,
      payload: {
        session_id: sessionStorage.getItem("session_id") ?? "error",
      },
    })
  }, [token])

  useEffect(() => {
    document.title = `${
      GETstate.details ? GETstate.details?.title : "Loading"
    } | ${scheme.title}`
    // window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  }, [GETstate])

  return {
    scheme,
    token,
    GETstate,
  }
}
