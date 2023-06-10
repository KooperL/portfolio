import { FuelPricesResponse } from "@containers/fuelPricesPage/types"
import { ApiError } from "../../../api/apiErrorHandler"
import { get } from "../../../api/restApi"
import { endpoints } from "./endpoints"
import { GenericResponse } from "./types"

export const fetchFuelPrices = (): Promise<
  GenericResponse<FuelPricesResponse, ApiError>
> => {
  const apiConfig = {
    headers: {},
    params: {},
  }
  return get(endpoints["fuelprices"], apiConfig)
}
