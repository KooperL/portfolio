import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"
import { genericApiDataResponse, genericApiRequestArgs } from "src/api/shared/types"
import { State } from "../../types/State"

interface useFetchOptions<T, U> {
  ApiImpl: (props: genericApiRequestArgs<T>) => Promise<AxiosResponse<genericApiDataResponse<U>>> 
  payload: T
  auth?: string
  varRoute?: string
    callback?: () => void
}

export const useFetch = <T, U>(
) => {
  const [state, setState] = useState<State<genericApiDataResponse<U>>>({
    loading: false,
    details: null,
    errorMessage: null,
    error: false,
  })
  const pull = useCallback(
    (props: useFetchOptions<T, U>) => {
      setState({
        loading: true,
        details: null,
        errorMessage: null,
        error: false,
      })
      props.ApiImpl({
        payload: props.payload,
        auth: props?.auth,
        varRoute: props?.varRoute
        })
        .then((resp) => {
          if (resp.data.hasOwnProperty("success") && resp.data.success) {
            setState({
              details: resp.data || null,
              error: false,
              errorMessage: null,
              loading: false,
            })
            props?.callback && props.callback()
          } else {
            setState({
              details: null,
              error: true,
              errorMessage: resp?.data?.errorMessage ?? null,
              loading: false,
            })
          }
        })
        .catch((err: AxiosError) => {
          setState({
            details: null,
            error: true,
            errorMessage: err.message,
            loading: false,
          })
        })
    },
    [state],
  )

  return { state, pull }
}
