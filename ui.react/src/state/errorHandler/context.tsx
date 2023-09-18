import { ErrorPageProps } from "@containers/ErrorPage/types"
import React, { createContext, useContext, useState } from "react"
import { ErrorContextType, Props } from "./types"

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<null | ErrorPageProps>(null)

  const raiseError = (err: ErrorPageProps) => {
    setHasError(true)
    setError(err)
  }

  const contextValue: ErrorContextType = {
    hasError,
    error,
    raiseError,
  }

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  )
}

export { ErrorContext }
