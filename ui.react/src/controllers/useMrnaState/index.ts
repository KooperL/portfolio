import { useState, useCallback, useContext, useEffect } from "react"
import { fetchMrna } from "../../containers/App/api/MrnaApi"
import { useSubmit } from "../../hooks/useSubmit"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "src/hooks/useFetch"
import { CmsEndpoints } from "../../containers/App/api/types"
import { fetchCMSData } from "../../containers/App/api/genericCMSApi"
import { CMSPage } from "../../components/TypeLookup/types"

export const useMrnaState = () => {
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: statePOST, handleSubmit } = useSubmit(fetchMrna)
  const { state: stateCMS, pull } = useFetch<keyof CmsEndpoints, CMSPage>(
    fetchCMSData,
  )

  useEffect(() => {
    document.title = `DNA decoder | ${scheme.title}`
    pull("mrnaCms")
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {
      dna_field_id: value,
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
