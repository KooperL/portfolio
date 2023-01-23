import { useState, useCallback, useEffect, useContext } from "react"
import {
  RandomBioPayload,
  RandomBioState,
  RandomBioInitialState,
  RandomBioPOST,
} from "../../containers/randomBioPage/types"
import { fetchRandomBio } from "../../containers/App/api/randomBioApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useSubmit } from "../../hooks/useSubmit"

export const useRandomBioState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const [length, setLength] = useState(100)
  const [type, setType] = useState(1)
  const [single, setSingle] = useState(true)

  const { state, handleSubmit } = useSubmit<RandomBioPayload, RandomBioPOST>(fetchRandomBio)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {
      type: type,
      length: length,
      ...(type === 3 && { single: +single }),
    })
  }
  useEffect(() => {
    document.title = `Random generator | ${scheme.title}`
  }, [])

  return {
    scheme,
    length,
    setLength,
    type,
    setType,
    single,
    setSingle,
    onSubmit,
    state
  }
}
