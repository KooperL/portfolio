import { useState, useCallback } from "react"
import {
  SeqAlignPayload,
  SeqAlignState,
  SeqAlignInitialState,
  SeqAlignPOST,
} from "../../containers/seqAlignPage/types"
import { fetchSeqAlign } from "../../containers/App/api/seqAlignApi"

export const useSeqAlignState = (dataCall: Function) => {
  const [state, setState] = useState<SeqAlignState>(SeqAlignInitialState)

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>, payload: SeqAlignPOST) => {
      setState({ ...state, loading: true })
      event.preventDefault()

      dataCall(payload)
        .then((resp: SeqAlignPayload) => {
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
