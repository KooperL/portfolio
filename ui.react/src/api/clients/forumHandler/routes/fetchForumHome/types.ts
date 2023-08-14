import { ForumItemType } from "../../types"

export interface ForumHomeRequestPayload {
  session_id: string
  category: string | null
  search?: string | null
}

export interface ForumHomeResponsePayload {
  [key: string]: ForumItemType[]
}
