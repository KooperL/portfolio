import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import Redirect from "../../components/Redirect"
import { useFetch } from "src/hooks/useFetch"
import { fetchForumHome } from "src/api/clients/forumHandler/routes/fetchForumHome"
import { routes } from "src/api/clients/forumHandler/types"
import { forumPath } from "src/api/shared/types"
import { ForumHomeRequestPayload, ForumHomeResponsePayload } from "src/api/clients/forumHandler/routes/fetchForumHome/types"

export const useForumHomeState = () => {
  const [searchState, setSearchState] = useState("")
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext)
  const [token, setToken] = useAccessToken()
  const location = useLocation()
  const navigate = useNavigate()

  let paramString = window.location.href.split("?")[1]
  let queryString = new URLSearchParams(paramString)

  const { state, pull: post } = useFetch<ForumHomeRequestPayload, ForumHomeResponsePayload>()

  useEffect(() => {
    if (!token) {
      return
    }
    post({
      ApiImpl: fetchForumHome,
      auth: `Bearer ${token ?? ""}`,
      payload: {
        session_id: sessionStorage.getItem("session_id") ?? "",
        category: queryString.get("category") ?? "",
        search: queryString.get("search") ?? "",
      },
    })
  }, [token, location])

  const handleSubmit = () => {
    navigate(`${forumPath}?search=${searchState}`)
    // return (
    //   <Redirect
    //     destination={`/${ForumRouteType.ForumHome}?search=${searchState}`}
    //   />
    // )
  }

  useEffect(() => {
    document.title = `Forum Home | ${scheme.title}`
  }, [])

  return {
    scheme,
    token,
    handleSubmit,
    state,
    searchState,
    setSearchState,
  }
}
