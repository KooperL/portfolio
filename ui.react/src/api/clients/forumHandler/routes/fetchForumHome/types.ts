import { ApiError } from "../../api/apiErrorHandler"
import { forumItem } from "../common/types"

export interface ForumHomeResponsePayload {
  [key: string]: forumItem[]
}
