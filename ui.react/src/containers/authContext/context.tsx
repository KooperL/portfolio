import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react"
import { sendMonitor } from "src/api/clients/ApiHandler/routes/sendMonitor"
import { sendForumRefresh } from "src/api/clients/forumHandler/routes/sendForumRefresh"
// import { useNavigate } from 'react-router-dom';

type AccessTokenContext = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
]

export function monitor() {
  const currentPage = localStorage.getItem("currentPage")
  sendMonitor({
    payload: {
      uuid: localStorage.getItem("uuid") ?? "",
      session_id: sessionStorage.getItem("session_id") ?? "",
      page: encodeURIComponent(window.location.pathname),
      prevPage: encodeURIComponent(currentPage ?? "NULL"),
    }
  })
    .then(resp => {
      if (resp.data.success) {
        localStorage.setItem("currentPage", window.location.pathname)
        // } else {
        //   throw new Error((resp as ApiError))
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
  // }, [])
}

export function AccessTokenProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [accessTokenExpires, setAccessTokenExpires] = useState<Date | null>(
    null,
  )
  // const navigate = useNavigate();

  function refresh() {
    if (
      !window.location.href.includes("forum") ||
      (accessToken && !accessToken.length)
    )
      return
    sendForumRefresh({payload: {session_id: sessionStorage.getItem("session_id") ?? "" }})
      .then(resp => {
        if (resp.data.success && resp.data.accessToken && resp.data.expires) {
          // setPOSTState({
          //   details: resp,
          //   error: false,
          //   errorMessage: null,
          //   loading: false
          // });
          // navigate(`/${forumPath}/post`)
          setAccessToken(resp.data.accessToken)
          setAccessTokenExpires(new Date(resp.data.expires))
        } else {
          // RIP genuinely invalid
          // throw new Error(resp.error);
        }
      })
      .catch((err: any) => {
        setAccessToken("")
        console.log(err)
        // window.location.href = (`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`)
        // navigate(`/${ForumRouteType.ForumHome}/${ForumRouteType.ForumRegister}`)
        // setPOSTState({
        //   error: true,
        //   errorMessage: err,
        //   loading: false
        // });
      })
  }

  useEffect(() => {
    // Refresh if null or time elapsed
    if (accessToken === null) {
      console.log("No access token")
      refresh()
    }
    if (accessToken === "") {
      console.log("No refresh token cookie")
    } else {
      if (accessTokenExpires && new Date() > accessTokenExpires) {
        console.log("Access token expired")
        refresh()
      }
    }
  }, [accessToken])

  return (
    <AccessToken.Provider value={[accessToken, setAccessToken]}>
      {children}
    </AccessToken.Provider>
  )
}

// @ts-ignore
const AccessToken = createContext<AccessTokenContext>()

export const useAccessToken = (): AccessTokenContext =>
  useContext<AccessTokenContext>(AccessToken)
