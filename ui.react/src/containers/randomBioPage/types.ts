import { ApiError } from "../../api/apiErrorHandler";

export interface RandomBioState {
  details?: RandomBioPayload;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}

export interface RandomBioPayload {
  'success': boolean;
  'data'?:  string[];
  'error'?: string;
}

export interface RandomBioPOST {
  type: number;
  length: number;
  single?: number;
}

export const RandomBioInitialState: RandomBioState = {
  error: false,
  errorMessage: null,
  loading: false
} as const;