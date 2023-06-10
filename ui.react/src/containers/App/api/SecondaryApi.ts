import { SecondaryRequest, SecondaryResponse } from "@containers/secondaryPage/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchSecondary = (
  body: SecondaryRequest,
): Promise<GenericResponse<SecondaryResponse, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: { ...body },
  }
  return get(endpoints["secondary"], apiConfig)
}
