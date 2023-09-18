export interface AuthContextType {
  authentication: {
    accessToken: string | null
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
  }
  trackingInformation: {
    getSessionKey: () => string
    getPersistentKey: () => string
  }
}
