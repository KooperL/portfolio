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


export interface BlogRegisterPOSTPayload {
  data: BlogRegisterState;
  session_id: string;
}

export interface BlogRegisterPOSTResponse {
  success: boolean;
  error?: string
}

export interface BlogRegisterState {
  blog_username: string;
  blog_password: string;
}

export const BlogRegisterInitialState: BlogRegisterState = {
  blog_username: '',
  blog_password: ''
}

export interface BlogRegisterPOSTState {
  details?: BlogRegisterPOSTResponse;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export const BlogRegisterPOSTInitialState: BlogRegisterPOSTState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;


export interface BlogHomeGETResponse {
  success: boolean;
  data: {
    string: {
      id: number;
      date: string;
      author: string;
      title: string;
      body: string;
      views: number;
    }[]
  }
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