import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { FuelPricesPayload } from "../../fuelPricesPage/types"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchFuelPrices = (): Promise<GenericResponse< FuelPricesPayload, ApiError>> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints["fuelprices"], apiConfig)
}
