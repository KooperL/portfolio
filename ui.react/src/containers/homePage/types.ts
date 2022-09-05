export interface HomeState {
  details?: HomePayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}


export interface HomePayload {
  data: {
    title: string;
    points: {
      address: string;
      name: string
    }[] | null;
  }[]
  success: boolean;
}

export const HomeInitialState: HomeState = {
  error: false,
  errorMessage: '',
  loading: true
} as const;