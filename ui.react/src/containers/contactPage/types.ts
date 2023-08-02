import { genericApiDataResponse } from "src/api/shared/types"

export interface ContactRequestPayload {
  session_id: string
  message: string
}

export interface ContactResponsePayload extends genericApiDataResponse<null>{
  
}
