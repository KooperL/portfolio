
import React, { useContext, createContext, FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
import { postBlogRefresh } from '../App/api/blogApis'
import { BlogRouteType } from '../App/routeTypes'
import { BlogLoginPOSTPayload, BlogLoginPOSTResponse } from '../blogLoginPage/types'

type AccessTokenContext = [string | null, React.Dispatch<React.SetStateAction<string | null>>]

export function AccessTokenProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [accessTokenExpires, setAccessTokenExpires] = useState<Date | null>(null)
  // const navigate = useNavigate();

  function refresh() {
    postBlogRefresh({session_id: sessionStorage.getItem('session_id') ?? ''}).then((resp: BlogLoginPOSTResponse) => {
      if(resp.success && resp.accessToken && resp.expires) {
        // setPOSTState({
        //   details: resp,
        //   error: false,
        //   errorMessage: '',
        //   loading: false
        // });
        // navigate(`/${blogPath}/post`)
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
      // window.location.href = (`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogRegister}`)
      // navigate(`/${BlogRouteType.BlogHome}/${BlogRouteType.BlogRegister}`)
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

