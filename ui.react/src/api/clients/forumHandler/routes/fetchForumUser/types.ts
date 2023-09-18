import { ForumItemType } from "../../types"

export interface ForumUserRequestPayload {
  session_id: string
}

export interface ForumUserResponsePayload extends ForumItemType {}
