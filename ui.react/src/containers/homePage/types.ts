import { ApiError } from "../../api/apiErrorHandler";

export interface HomeState {
  details?: HomePayload;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}


export interface HomePayload {
  data: {
    type: string;
    data: string[];
    text: string;
  }[]
  success: boolean;
}

export const HomeInitialState: HomeState = {
  error: false,
  errorMessage: null,
  loading: true
} as const;