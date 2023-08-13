import { useState, useCallback, useContext, useEffect } from "react"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import { useFetch } from "src/hooks/useFetch"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import { sendMrna } from "src/api/clients/ApiHandler/routes/sendMrna"
import { MrnaRequest, MrnaResponse } from "src/containers/mrnaPage/types"
import { useCms } from "src/hooks/useCms"
import { useError } from "src/hooks/useError"
import { genericApiDataResponse } from "src/api/shared/types"

export const useMrnaState = () => {
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: statePOST, pull: handleSubmit } = useFetch<MrnaRequest, genericApiDataResponse<MrnaResponse>>()
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
    document.title = `DNA decoder | ${scheme.title}`
    pull('mrnaCms')
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit({
      ApiImpl: sendMrna,
      payload: {
        dna_field_id: value,
      }
    })
  }
  return {
    scheme,
    value,
    setValue,
    onSubmit,
    statePOST,
    stateCMS,
  }
}
