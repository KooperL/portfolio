import { useState, useCallback, useContext, useEffect } from "react"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "src/hooks/useFetch"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import { sendMrna } from "src/api/clients/ApiHandler/routes/sendMrna"
import { MrnaRequest, MrnaResponse } from "src/containers/mrnaPage/types"
import { useCms } from "src/hooks/useCms"

export const useMrnaState = () => {
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: statePOST, pull: handleSubmit } = useFetch<MrnaRequest, MrnaResponse>()
  const { state: stateCMS, pull } = useCms()

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
