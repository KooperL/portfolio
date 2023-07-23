import { genericApiResponse } from "src/api/clients/ApiHandler/types"
import { ApiError } from "../../api/apiErrorHandler"

export interface ContactRequestPayload {
  session_id: string
  message: string
}

export interface ContactResponsePayload extends genericApiResponse<null>{
  
}
