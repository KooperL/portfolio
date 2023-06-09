import { ApiError } from "../../api/apiErrorHandler"

export interface SeqAlignResponse {
    results: {
      end: number
      score: number
      seqA: string
      seqB: string
      start: number
    }[]
    draw_res: string[]
}

export interface SeqAlignRequest {
  sampletxt: string
  referencetxt: string
  identical?: number
  mismatch?: number
  gaps?: number
  extgaps?: number
}
