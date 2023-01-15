// export interface ForumHomeState {
//   details?: ForumPostFetchPayload;
//   error?: boolean;
//   errorMessage?: ApiError | null;
//   loading?: boolean;
// }

import { ApiError } from "../../api/apiErrorHandler";
import { forumItem } from "../common/types";


// export interface ForumPostFetchPayload {
//   data: {
//   }[]
//   success: boolean;
// }

// export const ForumHomeInitialState: ForumHomeState = {
//   error: false,
//   errorMessage: null,
//   loading: true
// } as const;


export interface ForumHomeGETResponse {
  success: boolean;
  data?: {
    [key: string]: forumItem[]
  };
  error?: string;
}

export interface ForumHomeGETState {
  details?: ForumHomeGETResponse;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}

export const ForumHomeGETInitialState: ForumHomeGETState = {
  error: false,
  errorMessage: null,
  loading: false
} as const;