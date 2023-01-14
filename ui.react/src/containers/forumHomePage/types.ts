// export interface BlogHomeState {
//   details?: BlogPostFetchPayload;
//   error?: boolean;
//   errorMessage?: string;
//   loading?: boolean;
// }

import { forumItem } from "../common/types";


// export interface BlogPostFetchPayload {
//   data: {
//   }[]
//   success: boolean;
// }

// export const BlogHomeInitialState: BlogHomeState = {
//   error: false,
//   errorMessage: '',
//   loading: true
// } as const;


export interface BlogHomeGETResponse {
  success: boolean;
  data?: {
    [key: string]: forumItem[]
  };
  error?: string;
}

export interface BlogHomeGETState {
  details?: BlogHomeGETResponse;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export const BlogHomeGETInitialState: BlogHomeGETState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;