import { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Vchart from "../../components/Vchart"
import { fetchFuelPrices } from "../../containers/App/api/fuelPricesApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "src/hooks/useFetch"
import { FuelPricesResponse } from "@containers/fuelPricesPage/types"
import { cmsData, CmsEndpoints } from "@containers/App/api/types"
import { fetchCMSData } from "@containers/App/api/genericCMSApi"

function useFuelPricesState() {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<null, FuelPricesResponse>(
    fetchFuelPrices,
  )
  const { state: stateCMS, pull: pullCMS } = useFetch<keyof CmsEndpoints, cmsData[]>(fetchCMSData)

  useEffect(() => {
    pull(null)
    pullCMS('fuelpricesCms')
    document.title = `Fuelprices | ${scheme.title}`
  }, [])
  return {
    state,
    stateCMS,
    scheme,
  }
}

export default useFuelPricesState
