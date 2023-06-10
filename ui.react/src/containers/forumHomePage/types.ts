import { ApiError } from "../../api/apiErrorHandler"
import { forumItem } from "../common/types"

export interface ForumHomeResponse {
  [key: string]: forumItem[]
}
