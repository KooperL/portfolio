import { ApiError } from "../../api/apiErrorHandler"

export interface ContactState {
  details?: ContactPayload
  error?: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

export interface ContactPOSTState {
  details?: ContactPOSTPayload
  error?: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

export interface ContactPOSTPayload {
  success: boolean
  error?: string
}

export interface ContactPOST {
  session_id: string
  message: string
}

export const ContactInitialState: ContactState = {
  error: false,
  errorMessage: null,
  loading: true,
} as const

export const ContactPOSTInitialState: ContactPOSTState = {
  error: false,
  errorMessage: null,
  loading: false,
} as const
