export interface BlogLoginPOSTPayload {
  session_id: string;
}

export interface BlogLoginPOSTResponse {
  success: boolean;
  type?: string;
  accessToken?: string;
  exprires?: number;
  error?: string;
}

export interface BlogLoginPOSTState {
  details?: BlogLoginPOSTResponse;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export const BlogLoginPOSTInitialState: BlogLoginPOSTState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;