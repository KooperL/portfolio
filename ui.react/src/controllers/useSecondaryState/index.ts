import { useState, useCallback, useContext, useEffect } from "react"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import {
  SecondaryRequest,
  SecondaryResponse,
} from "../../containers/secondaryPage/types"
import { useFetch } from "src/hooks/useFetch"
import { useCms } from "src/hooks/useCms"
import { sendSecondary } from "src/api/clients/ApiHandler/routes/sendSecondary"
import { useError } from "src/hooks/useError"
import { genericApiDataResponse } from "src/api/shared/types"


export const useSecondaryState = () => {
  // dataCall: (body: SecondaryPOST) => Promise<ApiError | SecondaryPayload>
  const [aa_field_id, setAa_field_id] = useState("")
  const [aaf_field_id, setAaf_field_id] = useState("s")
  const [detectthreshold, setDetectthreshold] = useState(4)
  const [leniency, setLeniency] = useState(3)
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()
  const { state: statePOST, pull: handleSubmit } = useFetch<SecondaryRequest, genericApiDataResponse<SecondaryResponse>>()
  const { raiseError } = useError();
  
  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data'
      })
    }
  }, [stateCMS])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit({
    ApiImpl: sendSecondary,
    payload: {
        aa_field_id: aa_field_id,
        aaf_field_id: aaf_field_id,
        detectthreshold: detectthreshold,
        leniency: leniency,
      }
    })
  }

  useEffect(() => {
    document.title = `Protein Secondary Structure | ${scheme.title}`
    pull("secondaryCms")
  }, [])

  return {
    aa_field_id,
    setAa_field_id,
    aaf_field_id,
    setAaf_field_id,
    detectthreshold,
    setDetectthreshold,
    leniency,
    setLeniency,
    scheme,
    statePOST,
    onSubmit,
    stateCMS,
  }
}
