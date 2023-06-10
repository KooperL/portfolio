import { postContact } from "../../containers/App/api/contactApi"
import { fetchCMSData } from "../../containers/App/api/genericCMSApi"
import { cmsData, CmsEndpoints } from "../../containers/App/api/types"
import { ContactRequestPayload } from "../../containers/contactPage/types"
import { useContext, useEffect, useState } from "react"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"
import { useSubmit } from "../../hooks/useSubmit"

export const useContactState = () => {
  // const [state, setState] = useState({ ...ContactInitialState })
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)

  const { state: stateCMS, pull } = useFetch<keyof CmsEndpoints, cmsData[]>(fetchCMSData)

  const { state: POSTstate, handleSubmit } = useSubmit<
    ContactRequestPayload,
    null 
  >(postContact)

  useEffect(() => {
    document.title = `Contact | ${scheme.title}`
    pull('contactCms')
  }, [])

  return {
    scheme,
    handleSubmit,
    value,
    setValue,
    stateCMS,
    POSTstate,
  }
}
