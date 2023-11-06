import { useError } from 'src/hooks/useError'
import ErrorPage from '../../containers/ErrorPage'

interface WithErrorHandlingProps {
  children: React.ReactNode
}

function WithErrorHandling(props: WithErrorHandlingProps) {
  const { hasError, error } = useError()

  if (hasError && error) {
    return (
      <ErrorPage
        errorMessage=""
        decorator=""
        errorType="NETWORK"
      />
    )
  }

  return <>{props.children}</>
}

export default WithErrorHandling
