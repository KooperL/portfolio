import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { fetchForumUser } from "src/api/clients/forumHandler/routes/fetchForumUser"
import { ForumUserRequestPayload, ForumUserResponsePayload } from "src/api/clients/forumHandler/routes/fetchForumUser/types"
import { useFetch } from "src/hooks/useFetch"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"

export const useForumUserState = () => {
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext)
  const [token, setToken] = useAccessToken()
  const location = useLocation()
  const user = window.location.href
    .toString()
    .slice(window.location.href.lastIndexOf("/") + 1)

  const { state, pull: post } = useFetch<ForumUserRequestPayload, ForumUserResponsePayload[]>()
  useEffect(() => {
    post({
      ApiImpl: fetchForumUser,
      auth: `Bearer ${token ?? ""}`,
      varRoute: user,
      payload: {
        session_id: sessionStorage.getItem("session_id") ?? "error",
      },
    })
  }, [token])

  useEffect(() => {
    document.title = `Forum Home | ${scheme.title}`
  }, [])

  return {
    scheme,
    token,
    state,
    user,
  }
}
