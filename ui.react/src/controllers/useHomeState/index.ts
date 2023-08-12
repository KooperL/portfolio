import { useContext, useEffect, useState } from "react"
import { useCms } from "src/hooks/useCms"
import { useError } from "src/hooks/useError"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import { useFetch } from "../../hooks/useFetch"

export const useHomeState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()
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
    document.title = `Home | ${scheme.title}`
    pull("homeCms")
  }, [])

  return {
    stateCMS,
    scheme,
  }
}

