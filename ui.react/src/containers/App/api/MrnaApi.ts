import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { MrnaPOST } from "../../mrnaPage/types"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchMrna = (body: MrnaPOST): Promise<GenericResponse<MrnaPayload, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: {
      ...body,
    },
  }
  return get(endpoints["mrna"], apiConfig)
}
