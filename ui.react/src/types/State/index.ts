import { ApiError } from "../../api/apiErrorHandler"

export interface State<T> {
  details: T | null
  error: boolean
  errorMessage: string | null
  loading: boolean
}
