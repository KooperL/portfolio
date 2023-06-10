import { ApiError } from "../../api/apiErrorHandler"

// export interface SecondaryResponse {
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

// }
//

export type SecondaryResponse = string
export interface SecondaryRequest {
  aa_field_id: string
  aaf_field_id?: string
  detectthreshold?: number
  leniency?: number
}
