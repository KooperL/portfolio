import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import Redirect from "../../components/Redirect"
import { useFetch } from "src/hooks/useFetch"
import { ForumPostViewRequestPayload, ForumPostViewResponsePayload } from "src/api/clients/forumHandler/routes/fetchForumPostView/types"
import { fetchForumPostView } from "src/api/clients/forumHandler/routes/fetchForumPostView"
import { useAuth } from "src/hooks/useAuth"
import { forumPath, routes } from "src/containers/App/types"
import { genericApiDataResponse } from "src/api/shared/types"


export const useForumPostViewState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const navigate = useNavigate()
  const { state: GETstate, pull: post } = useFetch<
    ForumPostViewRequestPayload,
    genericApiDataResponse<ForumPostViewResponsePayload>
  >()
  const { authentication } = useAuth() 

  useEffect(() => {
    if (!authentication.accessToken) {
      // HandleUnauthenticated()
      navigate(`/${forumPath}/${routes.forumRegister}`)
    }
    post({
      ApiImpl: fetchForumPostView,
      auth: authentication.accessToken as string,
      varRoute,
      payload: {
        session_id: sessionStorage.getItem("session_id") ?? "error",
      },
    })
  }, [authentication])

  const varRoute = window.location.href
    .split("/")
    .slice(-1)[0]
    .replace(/[^0-9]/g, "")


  useEffect(() => {
    document.title = `${
      GETstate.details ? GETstate.details?.data?.title : "Loading"
    } | ${scheme.title}`
    // window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  }, [GETstate])

  return {
    scheme,
    authentication,
    GETstate,
  }
}
