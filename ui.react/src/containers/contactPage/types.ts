import { ApiError } from "../../api/apiErrorHandler"

export interface ContactRequestPayload {
  session_id: string
  message: string
}
