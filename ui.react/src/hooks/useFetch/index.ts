import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"
import { genericApiDataResponse } from "src/api/shared/types"
import { State } from "../../types/State"

interface useFetchOptions<T, U> {
  ApiImpl: (
    config: T,
    auth?: string | undefined,
    varRoute?: string
  ) => Promise<AxiosResponse<genericApiDataResponse<U>>> 
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
          if (resp.data.hasOwnProperty("success") && resp.data.success) {
            setState({
              // @ts-ignore, come back to this, should satisfy U
              details: resp?.data || null,
              error: false,
              errorMessage: null,
              loading: false,
            })
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
