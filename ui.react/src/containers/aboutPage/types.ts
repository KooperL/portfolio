import { ApiError } from "../../api/apiErrorHandler"

export interface AboutState {
  details?: AboutPayload
  error?: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

export interface AboutPayload {
  data: {
    type: string
    data: string[]
    text?: string
  }[]
  success: boolean
}

export const AboutInitialState: AboutState = {
  error: false,
  errorMessage: null,
  loading: true,
} as const
