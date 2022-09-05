export interface SeqAlignState {
  details?: SeqAlignPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export interface SeqAlignPayload {
  'success': boolean;
  'data'?: {
    'results': {
      'end': number;
      'score': number;
      'seqA': string;
      'seqB': string;
      'start': number;
    }[];
    'draw_res': string[];
  };
  'error'?: string;
}

export interface SeqAlignPOST {
  sampletxt: string;
  referencetxt: string;
  identical?: number;
  mismatch?: number;
  gaps?: number;
  extgaps?: number;
}

export const SeqAlignInitialState: SeqAlignState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;

