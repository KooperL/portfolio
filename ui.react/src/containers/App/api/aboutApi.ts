import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { AboutPayload } from "../../aboutPage/types"
import { endpoints } from "./endpoints"
import { Payload } from "./types"

export const fetchAbout = (): Promise<ApiError | AboutPayload> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints["about"], apiConfig)
}
