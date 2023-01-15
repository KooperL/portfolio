import { ApiError } from "../../api/apiErrorHandler";
import { forumItem } from "../common/types";

export interface ForumUserGETResponse {
  success: boolean;
  data?: forumItem[];
  error?: string;
}

export interface ForumUserGETState {
  details?: ForumUserGETResponse;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}

export const ForumUserGETInitialState: ForumUserGETState = {
  error: false,
  errorMessage: null,
  loading: false
} as const;