export interface BlogPostViewGETPayload {
  session_id: string;
}

export interface BlogPostViewGETResponse {
  success: boolean;
  data?: {
    'id' : number;
    'date' : string;
    'author_id': number;
    'author': string;
    'title': string;
    'body': string;
    'category': string;
    'views': number;
  }
  error?: string
}

export interface BlogPostViewGETState {
  details?: BlogPostViewGETResponse;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export const BlogPostViewGETInitialState: BlogPostViewGETState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;
