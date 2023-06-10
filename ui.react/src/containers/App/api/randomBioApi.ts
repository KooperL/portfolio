import { RandombioRequest } from "@containers/randomBioPage/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchRandomBio = (
  body: RandombioRequest,
): Promise<GenericResponse<string, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: { ...body },
  }
  return get(endpoints["randombio"], apiConfig)
}
