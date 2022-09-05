export interface FuelPricesState {
  details?: FuelPricesPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}


export interface FuelPricesPayload {
  'success': boolean;
  'data'?: {
    'fuelprices': {
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
    };
    'stats': [number, string, string, string, string];
  };
  'error'?: string;
}

export const FuelPricesInitialState: FuelPricesState = {
  error: false,
  errorMessage: '',
  loading: true
} as const;