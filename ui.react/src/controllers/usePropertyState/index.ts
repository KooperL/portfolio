import { SchemeContext } from '../../state/colorScheme/colourScheme'
import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from 'src/hooks/useFetch'
import { useCms } from 'src/hooks/useCms'
import { fetchFuelPrices } from 'src/api/clients/ApiHandler/routes/fetchFuelPrices'
import { fetchPropertyIndex } from 'src/api/clients/ApiHandler/routes/fetchPropertyIndex'
import { genericApiDataResponse, projectPath } from 'src/api/shared/types'
import { useError } from 'src/hooks/useError'
import {
  PropertyIndexRequest,
  PropertyIndexResponse,
} from 'src/api/clients/ApiHandler/routes/fetchPropertyIndex/types'

function usePropertyState() {
  const ref = useRef<any>()
  const [scheme, setScheme] = useContext(SchemeContext)
  const navigate = useNavigate()
  const { state: stateCMS, pull: pullCMS } = useCms()
  const { state, pull } = useFetch<
    PropertyIndexRequest,
    genericApiDataResponse<PropertyIndexResponse>
  >()
  const { raiseError } = useError()

  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data',
      })
    }
  }, [stateCMS])

  useEffect(() => {
    pullCMS('propertyCms')
    pull({
      ApiImpl: fetchPropertyIndex,
      payload: {},
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
