import { useContext, useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import Vchart from "../../components/Vchart"
import { fetchFuelPrices } from "@containers/App/api/fuelPricesApi"
import "./style.css"
import { SchemeContext } from "../../containers/context/colourScheme"
import {
  FuelPricesInitialState,
  FuelPricesPayload,
  FuelPricesState,
} from "@containers/fuelPricesPage/types"
import { useFetch } from "src/hooks/useFetch"

function useFuelPricesState() {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<FuelPricesPayload, undefined>(
    fetchFuelPrices,
  )

  useEffect(() => {
    pull()
    document.title = `Fuelprices | ${scheme.title}`
  }, [])
  return {
    state,
    scheme,
  }
}

export default useFuelPricesState
