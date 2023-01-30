import { useCallback, useEffect, useState } from "react"
import { ApiError } from "../../api/apiErrorHandler"
import { forumPost, Opts } from "../../containers/App/api/forumApis"
import { State } from "../../types/state"

export const usePost = <T, U>(callback?: (e: U) => void) => {
  const [state, setState] = useState<State<U>>({
    loading: false,
    details: undefined,
    error: false,
  })
  const post = useCallback(
    
    (opts: Opts<T>) => {
      setState({
        error: false,
        errorMessage: null,
        loading: true,
      })
      forumPost<T, U>(opts)
        .then(resp => {
          // if (resp.hasOwnProperty('success') && resp.hasOwnProperty('data')) {
          setState({
            details: resp as U,
            error: false,
            errorMessage: null,
            loading: false,
          })
          callback && callback(resp as U)
          // } else {
          //   resp = (resp as ApiError)
          //   throw new Error(resp);
          // }
        })
        .catch((err: any) => {
          setState({
            error: true,
            errorMessage: err as ApiError,
            loading: false,
          })
        })
    },
    [state],
  )

  return { state, post }
}
