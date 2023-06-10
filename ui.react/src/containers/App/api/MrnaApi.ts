import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { MrnaRequest, MrnaResponse } from "../../mrnaPage/types"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchMrna = (body: MrnaRequest): Promise<GenericResponse<MrnaResponse, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: {
      ...body,
    },
  }
  return get(endpoints["mrna"], apiConfig)
}
