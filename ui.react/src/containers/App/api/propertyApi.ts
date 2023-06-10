import {
  PropertyIndexResponse,
  PropertySearchRequest,
} from "@containers/propertyPage/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchProperty = (): Promise<
  GenericResponse<PropertyIndexResponse, ApiError>
> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints["property"], apiConfig)
}

export const fetchPropertySearch = (
  body: PropertySearchRequest,
): Promise<GenericResponse<PropertyIndexResponse, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: {
      ...body,
    },
  }
  return get(endpoints["propertySearch"], apiConfig)
}
