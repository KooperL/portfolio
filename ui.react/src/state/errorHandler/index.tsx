import ErrorPage from 'src/containers/ErrorPage'
import React from 'react'
import { Props } from './types'
import { useError } from 'src/hooks/useError'

const Errorhandler: React.FC<Props> = ({ children }) => {
  const { hasError, error } = useError()

  if (hasError && error) {
    return <ErrorPage {...error} />
  }

  return <>{children}</>
}

export default Errorhandler
