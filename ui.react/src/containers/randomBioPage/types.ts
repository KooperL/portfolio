import { ApiError } from "../../api/apiErrorHandler"


export interface RandombioRequest {
  type: number
  length: number
  single?: number
}
