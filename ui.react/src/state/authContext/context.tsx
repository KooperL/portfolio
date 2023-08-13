import { forumPath, routes } from "src/containers/App/types"
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react"
import { useNavigate } from "react-router-dom"
import { sendMonitor } from "src/api/clients/ApiHandler/routes/sendMonitor"
import { sendForumRefresh } from "src/api/clients/forumHandler/routes/sendForumRefresh"
import { getPersistentKey, getSessionKey } from "./helper"
import { AuthContextType } from "./types"


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: any) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [accessTokenExpires, setAccessTokenExpires] = useState<Date | null>(
    null,
  )
  const navigate = useNavigate();
  const contextValue: AuthContextType = {
    authentication: {
      accessToken,
      setAccessToken
    },
    trackingInformation: {
      sessionKey: getSessionKey(),
      persistentKey: getPersistentKey()
    }
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext
}
