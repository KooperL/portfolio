import { useContext, useEffect, useState } from "react"
import { fetchContact } from "../../containers/App/api/contactApi"
import {
  ContactPayload,
  ContactPOST,
  ContactPOSTInitialState,
  ContactPOSTPayload,
} from "../../containers/contactPage/types"
import { SchemeContext } from "../../containers/context/colourScheme"
import { useFetch } from "../../hooks/useFetch"
import { useSubmit } from "../../hooks/useSubmit"

export const useContactState = () => {
  // const [state, setState] = useState({ ...ContactInitialState })
  const [value, setValue] = useState("")
  const [scheme, setScheme] = useContext(SchemeContext)

  const { state, pull } = useFetch<ContactPayload, undefined>(fetchContact)

  const { state: POSTstate, handleSubmit } = useSubmit<
    ContactPOSTPayload,
    ContactPOST
  >(fetchContact)

  useEffect(() => {
    pull()
  }, [])

  return {
    scheme,
    handleSubmit,
    value,
    setValue,
    state,
    POSTstate,
  }
}
