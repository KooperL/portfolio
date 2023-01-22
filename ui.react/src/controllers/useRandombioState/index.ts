import { useState, useCallback } from "react"
import {
  RandomBioPayload,
  RandomBioState,
  RandomBioInitialState,
  RandomBioPOST,
} from "../../containers/randomBioPage/types"
import { fetchRandomBio } from "../../containers/App/api/randomBioApi"

export const useRandomBioState = (dataCall: Function) => {
  const [state, setState] = useState<RandomBioState>(RandomBioInitialState)

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>, payload: RandomBioPOST) => {
      setState({ ...state, loading: true })
      event.preventDefault()
      dataCall(payload)
        .then((resp: RandomBioPayload) => {
          if (resp.success && resp.data) {
            setState({
              details: resp,
              error: false,
              errorMessage: null,
              loading: false,
            })
          } else {
            throw new Error(resp.error)
          }
        })
        .catch((err: any) => {
          setState({
            error: true,
            errorMessage: err,
            loading: false,
          })
        })
    },
    [dataCall, state],
  )

  return { state, handleSubmit }
}
