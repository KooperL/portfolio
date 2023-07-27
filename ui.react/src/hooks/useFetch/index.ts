import { AxiosRequestConfig } from "axios"
import { useCallback, useEffect, useState } from "react"
import { genericApiDataResponse } from "src/api/shared/types"
import { State } from "../../types/State"

interface useFetchOptions<T, U> {
  ApiImpl: (
    config: T,
    auth?: string | undefined,
    varRoute?: string
  ) => Promise<genericApiDataResponse<U>> 
  payload: T
  auth?: string
  varRoute?: string
}

export const useFetch = <T, U>(
) => {
  const [state, setState] = useState<State<U>>({
    loading: true,
    details: null,
    errorMessage: null,
    error: false,
  })
  const pull = useCallback(
    (props: useFetchOptions<T, U>) => {
      props.ApiImpl(
        props.payload,
        props?.auth,
        props?.varRoute
      )
        .then((resp) => {
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
              errorMessage: resp?.errorMessage ?? null,
              loading: false,
            })
          }
        })
        .catch((err: any) => {
          setState({
            details: null,
            error: true,
            errorMessage: err,
            loading: false,
          })
        })
    },
    [state],
  )

  return { state, pull }
}
