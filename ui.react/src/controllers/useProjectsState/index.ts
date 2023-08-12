import { useContext, useEffect } from "react"
import { useCms } from "src/hooks/useCms"
import { useError } from "src/hooks/useError"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"

export const useProjectsState = () => {
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
    pull("projectsCms")
    document.title = `Projects | ${scheme.title}`
  }, [])

  return {
    scheme,
    stateCMS,
  }
}
