import { useState, useCallback, useContext, useEffect } from "react"
import { fetchSecondary } from "../../containers/App/api/SecondaryApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useSubmit } from "../../hooks/useSubmit"
import { ApiError } from "../../api/apiErrorHandler"
import {
  SecondaryRequest,
  SecondaryResponse,
} from "../../containers/secondaryPage/types"
import { useFetch } from "src/hooks/useFetch"
import { CmsEndpoints } from "../../containers/App/api/types"
import { fetchCMSData } from "../../containers/App/api/genericCMSApi"
import { CMSPage } from "../../components/TypeLookup/types"

export const useSecondaryState = () => {
  // dataCall: (body: SecondaryPOST) => Promise<ApiError | SecondaryPayload>
  const [aa_field_id, setAa_field_id] = useState("")
  const [aaf_field_id, setAaf_field_id] = useState("s")
  const [detectthreshold, setDetectthreshold] = useState(4)
  const [leniency, setLeniency] = useState(3)
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useFetch<keyof CmsEndpoints, CMSPage>(
    fetchCMSData,
  )
  const { state: statePOST, handleSubmit } = useSubmit<
    SecondaryRequest,
    SecondaryResponse
  >(fetchSecondary)

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
