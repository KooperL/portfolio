import { ApiError } from "../../api/apiErrorHandler";

export interface FuelPricesState {
  details?: FuelPricesPayload;
  error?: boolean;
  errorMessage?: ApiError | null;
  loading?: boolean;
}

export interface fuelDataPull {
  'average': {
    'x': string;
    'y': number;
  }[];
  'max': {
    'x': string;
    'y': number;
  }[];
  'min': {
    'x': string;
    'y': number;
  }[];
  'wholesale': {
    'x': string;
    'y': number;
  }[];
}

export interface FuelPricesPayload {
  'success': boolean;
  'data'?: {
    'fuelprices': fuelDataPull;
    'stats': {
      'average': number;
      'relativePrice': number;
      'gradient': number;
      'decision': string;
    };
  };
  'error'?: string;
}


export const FuelPricesInitialState: FuelPricesState = {
  error: false,
  errorMessage: null,
  loading: true
} as const;