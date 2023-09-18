import { genericApiTokenResponse } from "src/api/shared/types"

export interface ForumRefreshRequestPayload {
  session_id: string
}

export interface ForumRefreshResponsePayload extends genericApiTokenResponse {}
