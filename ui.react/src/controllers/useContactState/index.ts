import { ContactRequestPayload, ContactResponsePayload } from "../../containers/contactPage/types"
import { useContext, useEffect, useState } from "react"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import { useCms } from "src/hooks/useCms"
import { sendContact } from "src/api/clients/ApiHandler/routes/sendContact"

export const useContactState = () => {
  // const [state, setState] = useState({ ...ContactInitialState })
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()

  const { state: POSTstate, pull: handleSubmit } = useFetch<
    ContactRequestPayload,
    ContactResponsePayload 
  >()

  useEffect(() => {
    document.title = `Contact | ${scheme.title}`
    pull("contactCms")
  }, [])

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    payload: ContactRequestPayload
  ) => {
    handleSubmit({
      ApiImpl: sendContact,
      payload
    })
  }

  // ^^^ what???

  return {
    scheme,
    handleSubmit,
    value,
    setValue,
    stateCMS,
    POSTstate,
  }
}
