import { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Vchart from "../../components/Vchart"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import { useFetch } from "src/hooks/useFetch"
import { fetchFuelPrices } from "src/api/clients/ApiHandler/routes/fetchFuelPrices"
import { useCms } from "src/hooks/useCms"
import { useError } from "src/hooks/useError"
import { genericApiDataResponse } from "src/api/shared/types"
import { FuelPricesRequestPayload, FuelPricesResponsePayload } from "src/api/clients/ApiHandler/routes/fetchFuelPrices/types"

function useFuelPricesState() {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<FuelPricesRequestPayload, genericApiDataResponse<FuelPricesResponsePayload>>()
  const { state: stateCMS, pull: pullCMS } = useCms()
  const { raiseError } = useError();
  
  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data'
      })
    }
  }, [stateCMS])

  useEffect(() => {
    pull({
      ApiImpl: fetchFuelPrices,
      payload: {} 
    })
    pullCMS("fuelpricesCms")
    document.title = `Fuelprices | ${scheme.title}`
  }, [])

  return {
    state,
    stateCMS,
    scheme,
  }
}

export default useFuelPricesState
