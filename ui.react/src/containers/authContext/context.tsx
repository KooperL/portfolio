import React, {
  useContext,
  createContext,
  FC,
  useState,
  useEffect,
} from "react"
import { useNavigate } from "react-router-dom"
import { ApiError } from "../../api/apiErrorHandler"
import { LoggingPOSTResponse } from "@components/Logger/types"
// import { useNavigate } from 'react-router-dom';
import { postForumRefresh } from "../App/api/forumApis"
import { postMonitor } from "../App/api/loggerApi"
import { ForumRouteType } from "../App/routeTypes"
import { ContactPOSTPayload } from "../contactPage/types"
import {
  ForumLoginPOSTPayload,
  ForumLoginPOSTResponse,
} from "../forumLoginPage/types"

type AccessTokenContext = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
]

export function monitor() {
  const currentPage = localStorage.getItem("currentPage")
  postMonitor({
    uuid: localStorage.getItem("uuid") ?? "",
    session_id: sessionStorage.getItem("session_id") ?? "",
    page: encodeURIComponent(window.location.pathname),
    prevPage: encodeURIComponent(currentPage ?? "NULL"),
  })
    .then(resp => {
      if ((resp as ContactPOSTPayload).success) {
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
    postForumRefresh({ session_id: sessionStorage.getItem("session_id") ?? "" })
      .then(resp => {
        resp = resp as ForumLoginPOSTResponse
        if (resp.success && resp.accessToken && resp.expires) {
          // setPOSTState({
          //   details: resp,
          //   error: false,
          //   errorMessage: null,
          //   loading: false
          // });
          // navigate(`/${forumPath}/post`)
          setAccessToken(resp.accessToken)
          setAccessTokenExpires(new Date(resp.expires))
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
