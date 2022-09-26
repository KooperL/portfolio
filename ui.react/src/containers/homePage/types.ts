export interface HomeState {
  details?: HomePayload;
  error?: boolean;
  errorMessage?: string;
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
  errorMessage: '',
  loading: true
} as const;