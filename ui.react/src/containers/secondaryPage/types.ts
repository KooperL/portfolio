import { ApiError } from "../../api/apiErrorHandler"

export interface SecondaryState {
  details?: SecondaryPayload
  error?: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

export interface SecondaryPayload {
  success: boolean
  // 'data'?: {
  //   'aa_field': string;
  //   'ahp_field': number[];    // float??
  //   'ahl_field': number[];    // float??
  //   'ahm_field': number[];    // float??
  //   'bsp_field': number[];    // float??
  //   'bsl_field': number[];    // float??
  //   'bsm_field': number[];    // float??
  //   'pred_str': string;
  // };
  data?: string[]
  error?: string
}

export interface SecondaryPOST {
  aa_field_id: string
  aaf_field_id?: string
  detectthreshold?: number
  leniency?: number
}

export const SecondaryInitialState: SecondaryState = {
  error: false,
  errorMessage: null,
  loading: false,
} as const
