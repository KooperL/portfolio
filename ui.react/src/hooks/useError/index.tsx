import { useContext } from 'react'
import { ErrorContext } from 'src/state/errorHandler/context'

export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}
