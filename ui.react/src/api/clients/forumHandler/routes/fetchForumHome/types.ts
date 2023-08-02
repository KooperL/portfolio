import { ForumItemType } from "../../types"

export interface ForumHomeRequestPayload {
  session_id: string
  category?: string
  search?: string
}

export interface ForumHomeResponsePayload {
  [key: string]: ForumItemType[]
}
