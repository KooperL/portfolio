import { useContext, useEffect, useState } from "react"
import { fetchHome } from "../../containers/App/api/homeApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { HomePayload } from "../../containers/homePage/types"
import { useFetch } from "../../hooks/useFetch"

export const useHomeState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)

  const { state, pull } = useFetch<HomePayload, undefined>(fetchHome)

  useEffect(() => {
    document.title = `Home | ${scheme.title}`
    pull()
  }, [])

  return {
    state,
    scheme,
  }
}
