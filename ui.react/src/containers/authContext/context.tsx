
import React, { useContext, createContext, FC, useState, useEffect } from 'react'

type AccessTokenContext = [string, React.Dispatch<React.SetStateAction<string>>]

export function AccessTokenProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string>('')
  
  useEffect(() => {
    // Refresh if null or time elapsed  
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

