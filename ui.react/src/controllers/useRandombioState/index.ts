import { fetchCMSData } from "../../containers/App/api/genericCMSApi"
import { CmsEndpoints } from "../../containers/App/api/types"
import { RandombioRequest } from "../../containers/randomBioPage/types"
import { useState, useCallback, useEffect, useContext } from "react"
import { useFetch } from "src/hooks/useFetch"
import { fetchRandomBio } from "../../containers/App/api/randomBioApi"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useSubmit } from "../../hooks/useSubmit"
import { CMSPage } from "../../components/TypeLookup/types"

export const useRandomBioState = () => {
  const [scheme, setScheme] = useContext(SchemeContext)
  const [length, setLength] = useState(100)
  const [type, setType] = useState(1)
  const [single, setSingle] = useState(true)
  const { state: stateCMS, pull } = useFetch<keyof CmsEndpoints, CMSPage>(
    fetchCMSData,
  )
  const { state: statePOST, handleSubmit } = useSubmit<
    RandombioRequest,
    string
  >(fetchRandomBio)
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
    statePOST,
    stateCMS,
  }
}
