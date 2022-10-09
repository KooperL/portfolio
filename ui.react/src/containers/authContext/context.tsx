
import React, { useContext, createContext, FC, useState } from 'react'

type AccessTokenContext = [string, React.Dispatch<React.SetStateAction<string>>]

export function AccessTokenProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string>('')
  return (
    <AccessToken.Provider value={[accessToken, setAccessToken]} >
        {children}
    </AccessToken.Provider>
  )
}

// @ts-ignore
const AccessToken = createContext<AccessTokenContext>()

export const useAccessToken = (): AccessTokenContext => useContext<AccessTokenContext>(AccessToken)

