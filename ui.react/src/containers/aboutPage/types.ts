export interface AboutState {
  details?: AboutPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}


export interface AboutPayload {
  data: {
    type: string;
    data: string[];
    text?:string;
  }[]
  success: boolean;
}

export const AboutInitialState: AboutState = {
  error: false,
  errorMessage: '',
  loading: true
} as const;