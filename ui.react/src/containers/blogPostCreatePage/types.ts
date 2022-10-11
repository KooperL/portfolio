export interface BlogPostCreatePOSTPayload {
  session_id: string;
  data: {
    blog_title: string;
    blog_body: string;
  }
}

export interface BlogPostCreatePOSTResponse {
  success: boolean;
  data?: {
    blogPostId: number
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
