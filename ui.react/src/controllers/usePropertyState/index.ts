import { SchemeContext } from "../../containers/context/colourScheme"
import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "src/hooks/useFetch"
import { PropertyIndexRequest, PropertyIndexResponse } from "../../containers/propertyPage/types"
import { useCms } from "src/hooks/useCms"
import { fetchFuelPrices } from "src/api/clients/ApiHandler/routes/fetchFuelPrices"
import { fetchPropertyIndex } from "src/api/clients/ApiHandler/routes/fetchPropertyIndex"
import { projectPath } from "src/api/shared/types"

function usePropertyState() {
  const ref = useRef()
  const [scheme, setScheme] = useContext(SchemeContext)
  const navigate = useNavigate()
  const { state: stateCMS, pull: pullCMS } = useCms()
  const { state, pull } = useFetch<PropertyIndexRequest, PropertyIndexResponse>()

  useEffect(() => {
    pullCMS("propertyCms")
    pull({
      ApiImpl: fetchPropertyIndex,
      payload: {}
    })
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
