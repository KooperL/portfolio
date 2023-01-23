import { useState, useCallback, useContext, useEffect } from "react"
import {
  MrnaPayload,
  MrnaState,
  MrnaInitialState,
  MrnaPOST,
} from "../../containers/mrnaPage/types"
import { fetchMrna } from "../../containers/App/api/MrnaApi"
import { useSubmit } from "../../hooks/useSubmit"
import { SchemeContext } from "../../containers/context/colourScheme"

export const useMrnaState = () => {
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state, handleSubmit } = useSubmit(fetchMrna)

  useEffect(() => {
    document.title = `DNA decoder | ${scheme.title}`
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
    state
   }
}
