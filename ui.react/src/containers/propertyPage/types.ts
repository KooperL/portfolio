import { ApiError } from "../../api/apiErrorHandler";

export interface PropertyState {
  details?: PropertyPayload | PropertySearchPayload;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}


export interface PropertyPayload {
  'success': boolean;
  'data': {
    'highest': {
      'suburb': string;
      'meanMeans': number;
      'distcc': number;
      'count': number;
      'meanGradient': number;
      'desirability': number;
    }[];
    'stats': {
      'Min': number;
      'Q1': number;
      'median': number;
      'Q3': number;
      'Max': number;
      'IQR': number;
    };
  };
  'error'?: string;
}

export interface PropertySearchPayload {
  'success': boolean;
  'data'?: {
    'suburb': string;
    'stats': {
      'mean': number;
      'distance': number;
      'spread': number;
      'listingsCaptured': number;
      'linearGradient': number;
      'desirability': number;
    };
    'details': {
      'pricedata': {
        'count': number;
        'datekey': string[];
        'desirability': number;
        'frequency': number[];
        'mean_gradient': number[];
        'mean_means': number;
        'mean_stds': number;
        'means': number[];
        'std_gradient': number[];
        'stds': number[];
      };
    };
  };
  'error'?: string;
}

export interface PropertyPOST {
  prop_suburb: string;
}

export const PropertyInitialState: PropertyState = {
  error: false,
  errorMessage: null,
  loading: false
};