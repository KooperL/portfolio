import { ContactRequestPayload, ContactResponsePayload } from "../../containers/contactPage/types"
import { useContext, useEffect, useState } from "react"
import { SchemeContext } from "../../state/colorScheme/colourScheme"
import { useFetch } from "../../hooks/useFetch"
import { CMSPageResponse } from "../../components/TypeLookup/types"
import { useCms } from "src/hooks/useCms"
import { sendContact } from "src/api/clients/ApiHandler/routes/sendContact"
import { useError } from "src/hooks/useError"
import { genericApiDataResponse } from "src/api/shared/types"

export const useContactState = () => {
  // const [state, setState] = useState({ ...ContactInitialState })
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)
  const { state: stateCMS, pull } = useCms()
  const { raiseError } = useError();
  
  useEffect(() => {
    if (stateCMS.error) {
      raiseError({
        errorType: 'NETWORK',
        errorMessage: 'Error fetching data'
      })
    }
  }, [stateCMS])

  const { state: POSTstate, pull: handleSubmit } = useFetch<
    ContactRequestPayload,
    genericApiDataResponse<ContactResponsePayload> 
  >()

  useEffect(() => {
    document.title = `Contact | ${scheme.title}`
    pull("contactCms")
  }, [])

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    payload: ContactRequestPayload
  ) => {
    e.preventDefault()
    handleSubmit({
      ApiImpl: sendContact,
      payload
    })
  }

  return {
    scheme,
    onSubmit,
    value,
    setValue,
    stateCMS,
    POSTstate,
  }
}
