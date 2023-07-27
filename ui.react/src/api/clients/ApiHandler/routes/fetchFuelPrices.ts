import { FuelPricesRequestPayload, FuelPricesResponsePayload } from "./../../../../containers/fuelPricesPage/types";
import { CacheKey, CacheMode } from "src/api/ApiHandlerCore/types";
import { ApiConsumer } from "../instance";
import { routes } from "../types";
import { genericApiDataResponse } from "src/api/shared/types";


export const fetchFuelPrices = (data: FuelPricesRequestPayload): Promise<genericApiDataResponse<FuelPricesResponsePayload>> => {
  const path = `${routes.fuelprices}`
  const config = {
    url: path,
  }
  const cacheKey: CacheKey = {
    CacheMode: CacheMode.CacheFirst,
    CacheKey: path
  }
  return ApiConsumer.request(
    config,
    cacheKey,
  )
}

export {
}
