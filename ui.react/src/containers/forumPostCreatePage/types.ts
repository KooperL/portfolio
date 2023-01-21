import { ApiError } from "../../api/apiErrorHandler"

export interface ForumPostCreatePOSTPayload {
  session_id: string
  data: {
    forum_title: string
    forum_body: string
  }
}

export interface ForumPostCreatePOSTResponse {
  success: boolean
  data?: {
    forumPostId: number
  }
  error?: string
}

export interface ForumPostCreatePOSTState {
  details?: ForumPostCreatePOSTResponse
  error?: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

export const ForumPostCreatePOSTInitialState: ForumPostCreatePOSTState = {
  error: false,
  errorMessage: null,
  loading: false,
} as const
