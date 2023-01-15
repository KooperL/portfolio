import { ApiError } from "../../api/apiErrorHandler";

export interface ForumLoginPOSTPayload {
  session_id: string;
}

export interface ForumLoginPOSTResponse {
  success: boolean;
  type?: string;
  accessToken?: string;
  expires?: number;
  error?: string;
}

export interface ForumLoginPOSTState {
  details?: ForumLoginPOSTResponse;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}

export const ForumLoginPOSTInitialState: ForumLoginPOSTState = {
  error: false,
  errorMessage: null,
  loading: false
} as const;


export interface ForumRegisterPOSTPayload {
  // data: ForumRegisterState;
  session_id: string;
}

export interface ForumRegisterPOSTResponse {
  success: boolean;
  error?: string
}

export interface ForumRegisterState {
  forum_username: string;
  forum_password: string;
}

export const ForumRegisterInitialState: ForumRegisterState = {
  forum_username: '',
  forum_password: ''
}

export interface ForumRegisterPOSTState {
  details?: ForumRegisterPOSTResponse;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}

export const ForumRegisterPOSTInitialState: ForumRegisterPOSTState = {
  error: false,
  errorMessage: null,
  loading: false
} as const;

