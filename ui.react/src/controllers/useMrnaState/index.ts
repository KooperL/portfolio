import { useState, useCallback } from "react"
import {
  MrnaPayload,
  MrnaState,
  MrnaInitialState,
  MrnaPOST,
} from "../../containers/mrnaPage/types"
import { fetchMrna } from "../../containers/App/api/MrnaApi"

export const useMrnaState = (dataCall: Function) => {
  const [state, setState] = useState<MrnaState>(MrnaInitialState)

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>, payload: MrnaPOST) => {
      setState({ ...state, loading: true })
      event.preventDefault()
      dataCall(payload)
        .then((resp: MrnaPayload) => {
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
