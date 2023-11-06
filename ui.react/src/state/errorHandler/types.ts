import { ErrorPageProps } from 'src/containers/ErrorPage/types'

export interface Props {
  children: React.ReactNode
}

export interface ErrorContextType {
  hasError: boolean
  error: null | ErrorPageProps
  raiseError: (err: ErrorPageProps) => void
}
