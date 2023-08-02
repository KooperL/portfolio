import { useContext, useEffect, useState } from "react"
import { useCms } from "src/hooks/useCms"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"

export const useHomeState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()

  useEffect(() => {
    document.title = `Home | ${scheme.title}`
    pull("homeCms")
  }, [])

  return {
    stateCMS,
    scheme,
  }
}
