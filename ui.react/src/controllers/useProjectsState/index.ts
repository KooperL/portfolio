import { fetchCMSData } from "../../containers/App/api/genericCMSApi"
import { CmsEndpoints } from "../../containers/App/api/types"
import { useContext, useEffect } from "react"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"
import { CMSPage } from "../../components/TypeLookup/types"

export const useProjectsState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useFetch<keyof CmsEndpoints, CMSPage>(
    fetchCMSData,
  )

  useEffect(() => {
    pull("projectsCms")
    document.title = `Projects | ${scheme.title}`
  }, [])

  return {
    scheme,
    stateCMS,
  }
}
