import { RandombioRequest } from "../../containers/randomBioPage/types"
import { useState, useCallback, useEffect, useContext } from "react"
import { useFetch } from "src/hooks/useFetch"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useCms } from "src/hooks/useCms"
import { sendRandomBio } from "src/api/clients/ApiHandler/routes/sendRandomBio"

export const useRandomBioState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const [length, setLength] = useState(100)
  const [type, setType] = useState(1)
  const [single, setSingle] = useState(true)
  const { state: stateCMS, pull } = useCms()
  const { state: statePOST, pull: handleSubmit } = useFetch<RandombioRequest, string>()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit({
      ApiImpl: sendRandomBio,
      payload: {
        type: type,
        length: length,
        ...(type === 3 && { single: +single }),
      }
    })
  }
  useEffect(() => {
    pull("randombioCms")
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
    statePOST,
    stateCMS,
  }
}
