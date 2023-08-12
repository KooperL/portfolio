import { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Vchart from "../../components/Vchart"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "src/hooks/useFetch"
import { FuelPricesRequestPayload, FuelPricesResponsePayload } from "@containers/fuelPricesPage/types"
import { fetchFuelPrices } from "src/api/clients/ApiHandler/routes/fetchFuelPrices"
import { useCms } from "src/hooks/useCms"
import { useError } from "src/hooks/useError"

function useFuelPricesState() {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<FuelPricesRequestPayload, FuelPricesResponsePayload>()
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
