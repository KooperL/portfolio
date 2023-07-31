import { ForumItem } from "../../types";

export interface ForumUserRequestPayload {
  session_id: string
}

export interface ForumUserResponsePayload extends ForumItem {
}[]

