export interface RandomBioState {
  details?: RandomBioPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export interface RandomBioPayload {
  'success': boolean;
  'data'?: {
    'results': string,
  };
  'error'?: string
}

export interface RandomBioPOST {
  type: number;
  length: number;
  single?: number;
}

export const RandomBioInitialState: RandomBioState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;