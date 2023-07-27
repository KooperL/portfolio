import { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Vchart from "../../components/Vchart"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "src/hooks/useFetch"
import { FuelPricesRequestPayload, FuelPricesResponsePayload } from "@containers/fuelPricesPage/types"
import { fetchFuelPrices } from "src/api/clients/ApiHandler/routes/fetchFuelPrices"
import { useCms } from "src/hooks/useCms"

function useFuelPricesState() {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<FuelPricesRequestPayload, FuelPricesResponsePayload>()
  const { state: stateCMS, pull: pullCMS } = useCms()

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
