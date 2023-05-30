import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { PropertyPayload, PropertyPOST } from "../../propertyPage/types"
import { endpoints } from "./endpoints"

export const fetchProperty = (): Promise<ApiError | PropertyPayload> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints["property"], apiConfig)
}

export const fetchPropertySearch = (
  body: PropertyPOST,
): Promise<ApiError | PropertyPayload> => {
  const apiConfig = {
    headers: {},
    params: {
      ...body,
    },
  }
  return get(endpoints["propertySearch"], apiConfig)
}
