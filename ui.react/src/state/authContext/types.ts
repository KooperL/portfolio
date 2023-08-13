export interface AuthContextType {
  authentication: {
    accessToken: string | null,
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
  }
  trackingInformation: {
    sessionKey: string,
    persistentKey: string,
  }
}
