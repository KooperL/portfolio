import { ApiError } from "../../api/apiErrorHandler"

export interface ForumPostCreateRequestPayload {
  session_id: string
  data: {
    forum_title: string
    forum_body: string
  }
}

export interface ForumPostCreateResponsePayload {
  forumPostId: number
}
