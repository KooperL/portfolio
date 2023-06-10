import { GenericResponse } from "@containers/App/api/types"
import { useCallback, useEffect, useState } from "react"
import { ApiError } from "../../api/apiErrorHandler"
import { State } from "../../types/State"

export const useFetch = <T, U>(
  dataCall: (body: T) => Promise<GenericResponse<U, ApiError>>,
) => {
  const [state, setState] = useState<State<U>>({
    loading: true,
    details: null,
    errorMessage: null,
    error: false,
  })
  const pull = useCallback(
    (payload: T) => {
      dataCall(payload).then((resp: GenericResponse<U, ApiError>) => {
        if (resp.hasOwnProperty("success") && resp.success) {
          setState({
            details: resp?.data || null,
            error: false,
            errorMessage: null,
            loading: false,
          })
        } else {
          setState({
            details: null,
            error: true,
            errorMessage: resp.error,
            loading: false,
          })
        }
      })
      // .catch((err: any) => {
      //   setState({
      //     error: true,
      //     errorMessage: err,
      //     loading: false,
      //   })
      // })
    },
    [dataCall, state],
  )

  return { state, pull }
}
