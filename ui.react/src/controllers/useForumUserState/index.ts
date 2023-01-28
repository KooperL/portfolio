import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { endpoints } from "../../containers/App/api/endpoints"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import { ForumUserGETResponse } from "../../containers/forumUserPage/types"
import { usePost } from "../../hooks/usePost"

export const useForumUserState = () => {
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext)
  const [token, setToken] = useAccessToken()
  const location = useLocation()
  const user = window.location.href
    .toString()
    .slice(window.location.href.lastIndexOf("/") + 1)

  const { state, post } = usePost<undefined, ForumUserGETResponse>()
  useEffect(() => {
    post({
      endpoint: endpoints["forumUser"] + user,
      method: "GET",
      authBearer: token ?? "",
      params: {
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
