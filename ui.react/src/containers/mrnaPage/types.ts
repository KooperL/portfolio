import { ApiError } from "../../api/apiErrorHandler"

export interface MrnaState {
  details?: MrnaPayload
  error?: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

interface MrnaData {
  dna_field: string
  mrna_field: string
  rdna_field: string
  simplecount: {
    a: number
    t: number
    g: number
    c: number
  }
  gccontent: number
  aa: string
  aa_s: string
  molweight: number
  tm: number
}


export interface MrnaPOST {
  dna_field_id: string
}

export const MrnaInitialState: MrnaState = {
  error: false,
  errorMessage: null,
  loading: false,
} as const
