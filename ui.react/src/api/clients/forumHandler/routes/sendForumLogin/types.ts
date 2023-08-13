import { genericApiTokenResponse } from "src/api/shared/types"

export interface ForumLoginRequestPayload {
  session_id: string
}

export interface ForumLoginResponsePayload extends genericApiTokenResponse {}

