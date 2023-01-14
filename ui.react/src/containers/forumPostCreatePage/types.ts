export interface BlogPostCreatePOSTPayload {
  session_id: string;
  data: {
    forum_title: string;
    forum_body: string;
  }
}

export interface BlogPostCreatePOSTResponse {
  success: boolean;
  data?: {
    forumPostId: number
  };
  error?: string;
}

export interface BlogPostCreatePOSTState {
  details?: BlogPostCreatePOSTResponse;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export const BlogPostCreatePOSTInitialState: BlogPostCreatePOSTState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;
