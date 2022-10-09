export interface BlogHomeState {
  details?: BlogPostFetchPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}


export interface BlogPostFetchPayload {
  data: {
  }[]
  success: boolean;
}

export const BlogHomeInitialState: BlogHomeState = {
  error: false,
  errorMessage: '',
  loading: true
} as const;

