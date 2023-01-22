import { useState, useCallback, useContext, useEffect } from "react"
import {
  SecondaryPayload,
  SecondaryState,
  SecondaryInitialState,
  SecondaryPOST,
} from "../../containers/secondaryPage/types"
import { fetchSecondary } from "../../containers/App/api/SecondaryApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useSubmit } from "../../hooks/useSubmit"
import { ApiError } from "../../api/apiErrorHandler"

export const useSecondaryState = () => {
  // dataCall: (body: SecondaryPOST) => Promise<ApiError | SecondaryPayload>
  const [aa_field_id, setAa_field_id] = useState("")
  const [aaf_field_id, setAaf_field_id] = useState("s")
  const [detectthreshold, setDetectthreshold] = useState(4)
  const [leniency, setLeniency] = useState(3)
  const [scheme, setScheme] = useContext(SchemeContext)

  const { state, handleSubmit } = useSubmit<SecondaryPayload, SecondaryPOST>(
    fetchSecondary,
  )

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {
      aa_field_id: aa_field_id,
      aaf_field_id: aaf_field_id,
      detectthreshold: detectthreshold,
      leniency: leniency,
    })
  }

  useEffect(() => {
    document.title = `Protein Secondary Structure | ${scheme.title}`
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
    state,
    onSubmit,
  }
}
