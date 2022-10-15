
import React, { useContext, createContext, FC, useState, useEffect } from 'react'
import { postBlogRefresh } from '../App/api/blogApis'
import { BlogLoginPOSTPayload, BlogLoginPOSTResponse } from '../blogLoginPage/types'

type AccessTokenContext = [string, React.Dispatch<React.SetStateAction<string>>]

export function AccessTokenProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string>('')
  
  useEffect(() => {
    // Refresh if null or time elapsed
    if(!accessToken.length){
      console.log('No access token')
    
      postBlogRefresh({session_id: sessionStorage.getItem('session_id') ?? ''}).then((resp: BlogLoginPOSTResponse) => {
        if(resp.success && resp.accessToken) {
          // setPOSTState({
          //   details: resp,
          //   error: false,
          //   errorMessage: '',
          //   loading: false
          // });
          // navigate(`/${blogPath}/post`)
          setAccessToken(resp.accessToken)
        } else {
          throw new Error(resp.error);
        }
      }).catch((err: any) => {
        console.log(err)
        // setPOSTState({
        //   error: true,
        //   errorMessage: err,
        //   loading: false
        // });
      })
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

