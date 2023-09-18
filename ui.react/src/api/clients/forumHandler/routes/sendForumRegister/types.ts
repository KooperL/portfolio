import { genericApiDataResponse } from "src/api/shared/types"

export interface ForumRegisterRequstPayload {
  session_id: string
}

export interface ForumRegisterResponsepayload
  extends genericApiDataResponse<null> {}
