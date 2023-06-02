import { fetchProperty } from "../../containers/App/api/propertyApi"
import { projectPath } from "../../containers/App/api/types"
import { SchemeContext } from "../../containers/context/colourScheme"
import {
  PropertyPayload,
  PropertyPOST,
  PropertySearchPayload,
} from "../../containers/propertyPage/types"
import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "src/hooks/useFetch"
import { useSubmit } from "src/hooks/useSubmit"

function usePropertyState() {
  const ref = useRef()
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, pull } = useFetch<PropertyPayload, undefined>(fetchProperty)
  const navigate = useNavigate()

  useEffect(() => {
    pull()
    document.title = `Property | ${scheme.title}`
  }, [])

  const handleSubmit = () => {
    navigate(`/${projectPath}/property?suburb=${ref}`)
  }

  return {
    state,
    scheme,
    ref,
    handleSubmit,
  }
}

export default usePropertyState
