import { forumItem } from "../common/types";

export interface BlogUserGETResponse {
  success: boolean;
  data?: forumItem[];
  error?: string;
}

export interface BlogUserGETState {
  details?: BlogUserGETResponse;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export const BlogUserGETInitialState: BlogUserGETState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;