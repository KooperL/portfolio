import { useCallback, useEffect, useState } from "react"
import { ApiError } from "../../api/apiErrorHandler"

interface State<T> {
  details?: T
  error: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

export const useFetch = <T, U>(
  dataCall: (body?: U) => Promise<ApiError | T>,
) => {
  const [state, setState] = useState<State<T>>({
    loading: true,
    details: undefined,
    error: false,
  })
  const pull = useCallback(
    (payload?: U) => {
      dataCall(payload)
        .then(resp => {
          // if (resp.hasOwnProperty('success') && resp.hasOwnProperty('data')) {
          setState({
            details: resp as T,
            error: false,
            errorMessage: null,
            loading: false,
          })
          // } else {
          //   resp = (resp as ApiError)
          //   throw new Error(resp);
          // }
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

  return { state, pull }
}
