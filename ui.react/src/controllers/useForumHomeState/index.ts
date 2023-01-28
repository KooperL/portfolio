import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ForumRouteType } from "../../containers/App/routeTypes"
import { useAccessToken } from "../../containers/authContext/context"
import { SchemeContext } from "../../containers/context/colourScheme"
import { ForumHomeGETResponse } from "../../containers/forumHomePage/types"
import Redirect from "../../components/Redirect"
import { usePost } from "../../hooks/usePost"
import { endpoints } from "../../containers/App/api/endpoints"

export const useForumHomeState = () => {
  const [searchState, setSearchState] = useState("")
  // const [POSTstate, setPOSTState] = useState({...ContactPOSTInitialState});
  const [scheme, setScheme] = useContext(SchemeContext)
  const [token, setToken] = useAccessToken()
  const location = useLocation()
  const navigate = useNavigate()

  let paramString = window.location.href.split("?")[1]
  let queryString = new URLSearchParams(paramString)

  const { state, post } = usePost<undefined, ForumHomeGETResponse>()

  // function dataFetch() {
  //   props
  //     .dataCall(
  //       {
  //         session_id: sessionStorage.getItem("session_id"),
  //         category: queryString.get("category"),
  //         search: queryString.get("search"),
  //       },
  //       token,
  //     )
  //     .then((resp: ForumHomeGETResponse) => {
  //       setState({
  //         details: resp,
  //         error: false,
  //         errorMessage: null,
  //         loading: false,
  //       })
  //     })
  //     .catch((err: any) => {
  //       setState({
  //         error: true,
  //         errorMessage: err,
  //         loading: false,
  //       })
  //     })
  // }

  useEffect(() => {
    if (!token) {
      return
    }
    console.log(11111111111111111111111111111111111, token)
    post({
      endpoint: endpoints["forumHome"],
      authBearer: token ?? "",
      method: "GET",
      params: {
        session_id: sessionStorage.getItem("session_id"),
        category: queryString.get("category"),
        search: queryString.get("search"),
      },
    })
  }, [token, location])

  const handleSubmit = () => {
    navigate(`/${ForumRouteType.ForumHome}?search=${searchState}`)
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
