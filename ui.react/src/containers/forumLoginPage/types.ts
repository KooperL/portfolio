import { genericApiDataResponse, genericApiTokenResponse } from "src/api/shared/types"

// Login component
export interface ForumLoginRequestPayload {
  session_id: string
}

export interface ForumLoginResponsePayload extends genericApiTokenResponse {}

// Register component
export interface ForumRegisterRequstPayload {
  session_id: string
}

export interface ForumRegisterResponsepayload extends genericApiDataResponse<null> {
}

// Refresh component
export interface ForumRefreshRequestPayload {
  session_id: string
}

export interface ForumRefreshResponsePayload extends genericApiTokenResponse {}

