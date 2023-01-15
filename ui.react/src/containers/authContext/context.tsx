
import React, { useContext, createContext, FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../../api/apiErrorHandler'
// import { useNavigate } from 'react-router-dom';
import { postForumRefresh } from '../App/api/forumApis'
import { ForumRouteType } from '../App/routeTypes'
import { ForumLoginPOSTPayload, ForumLoginPOSTResponse } from '../forumLoginPage/types'

type AccessTokenContext = [string | null, React.Dispatch<React.SetStateAction<string | null>>]

export function AccessTokenProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [accessTokenExpires, setAccessTokenExpires] = useState<Date | null>(null)
  // const navigate = useNavigate();

  function refresh() {
    postForumRefresh({session_id: sessionStorage.getItem('session_id') ?? ''}).then((resp) => {
      resp = resp as ForumLoginPOSTResponse
      if(resp.success && resp.accessToken && resp.expires) {
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
    }).catch((err: any) => {
      console.log('should')
      setAccessToken('')
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
    if(accessToken === null){
      console.log('No access token')
      refresh()
    } if(accessToken === ''){
      console.log('No refresh token cookie')
    } else {
      if(accessTokenExpires && (new Date() > accessTokenExpires)) {
        console.log('Access token expired')
        refresh()
      }
    }
  }, [accessToken])

  return (
    <AccessToken.Provider value={[accessToken, setAccessToken]} >
      {children}
    </AccessToken.Provider>
  )
}

// @ts-ignore
const AccessToken = createContext<AccessTokenContext>()

export const useAccessToken = (): AccessTokenContext => useContext<AccessTokenContext>(AccessToken)

