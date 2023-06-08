import { ApiError } from "../../../api/apiErrorHandler"
import { get, post } from "../../../api/restApi"
import { ContactPOSTPayload } from "../../contactPage/types"
import { endpoints } from "./endpoints"

export const postContact = (data: {
  session_id: string
  message: string
}): Promise<ApiError | ContactPOSTPayload> => {
  const apiConfig = {
    headers: {},
    data: data,
  }
  return post(endpoints["contact"], apiConfig)
}
