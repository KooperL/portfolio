import { fetchProperty } from "../../containers/App/api/propertyApi"
import { cmsData, CmsEndpoints, projectPath } from "../../containers/App/api/types"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "src/hooks/useFetch"
import { useSubmit } from "src/hooks/useSubmit"
import { fetchCMSData } from "@containers/App/api/genericCMSApi"
import { PropertyIndexResponse } from "@containers/propertyPage/types"

function usePropertyState() {
  const ref = useRef()
  const [scheme, setScheme] = useContext(SchemeContext)
  const navigate = useNavigate()
  const { state: stateCMS, pull: pullCMS } = useFetch<keyof CmsEndpoints, cmsData[]>(fetchCMSData)
  const { state, pull } = useFetch<null, PropertyIndexResponse>(fetchProperty)

  useEffect(() => {
    pullCMS('propertyCms')
    pull(null)
    document.title = `Property | ${scheme.title}`
  }, [])

  const handleSubmit = () => {
    navigate(`/${projectPath}/property?suburb=${ref}`)
  }

  return {
    stateCMS,
    state,
    scheme,
    ref,
    handleSubmit,
  }
}

export default usePropertyState
