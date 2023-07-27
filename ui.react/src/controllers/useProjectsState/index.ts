import { useContext, useEffect } from "react"
import { useCms } from "src/hooks/useCms"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"

export const useProjectsState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()

  useEffect(() => {
    pull("projectsCms")
    document.title = `Projects | ${scheme.title}`
  }, [])

  return {
    scheme,
    stateCMS,
  }
}
