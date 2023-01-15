import { ApiError } from "../../api/apiErrorHandler";

export interface ForumPostViewGETPayload {
  session_id: string;
}

export interface ForumPostViewGETResponse {
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

export interface ForumPostViewGETState {
  details?: ForumPostViewGETResponse;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}

export const ForumPostViewGETInitialState: ForumPostViewGETState = {
  error: false,
  errorMessage: null,
  loading: false
} as const;
