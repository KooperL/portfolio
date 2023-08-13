import { forumPath, routes } from "src/containers/App/types"
import { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchForumUser } from "src/api/clients/forumHandler/routes/fetchForumUser"
import { ForumUserRequestPayload, ForumUserResponsePayload } from "src/api/clients/forumHandler/routes/fetchForumUser/types"
import { useAuth } from "src/hooks/useAuth"
import { useFetch } from "src/hooks/useFetch"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import { genericApiDataResponse } from "src/api/shared/types"

export const useForumUserState = () => {
  const navigate = useNavigate()
  const [scheme, setScheme] = useContext(SchemeContext)
  const location = useLocation()
  const user = window.location.href
    .toString()
    .slice(window.location.href.lastIndexOf("/") + 1)
  const { authentication } = useAuth() 

  const { state, pull: post } = useFetch<ForumUserRequestPayload, genericApiDataResponse<ForumUserResponsePayload[]>>()
  
  useEffect(() => {
    if (!authentication.accessToken) {
      // HandleUnauthenticated()
      navigate(`/${forumPath}/${routes.forumRegister}`)
    }
    post({
      ApiImpl: fetchForumUser,
      auth: authentication.accessToken as string,
      varRoute: user,
      payload: {
        session_id: sessionStorage.getItem("session_id") ?? "error",
      },
    })
  }, [authentication])

  useEffect(() => {
    document.title = `Forum Home | ${scheme.title}`
  }, [])

  return {
    scheme,
    authentication,
    state,
    user,
  }
}
