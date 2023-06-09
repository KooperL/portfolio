import { ApiError } from "../../../api/apiErrorHandler"
import { get, post } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const postContact = (data: {
  session_id: string
  message: string
}): Promise<GenericResponse<null, ApiError>> => {
  const apiConfig = {
    headers: {},
    data: data,
  }
  return post(endpoints["contact"], apiConfig)
}
