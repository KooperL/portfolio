export interface BlogPostViewGETPayload {
  session_id: string;
}

export interface BlogPostViewGETResponse {
  success: boolean;
  data?: {
    'id' : number;
    'date' : string;
    'author_id': number;
    'title': string;
    'category_id': number;
    'body': string;
    'visible': number;
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
