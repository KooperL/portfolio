import { ForumItem } from "../../types";

export interface ForumHomeRequestPayload {
  session_id: string
  category?: string
  search?: string
}

export interface ForumHomeResponsePayload {
  [key: string]: ForumItem[]
}
