import { useCallback, useEffect, useState } from "react"
import { ApiError } from "../../api/apiErrorHandler"
import { forumPost, Opts } from "../../containers/App/api/forumApis"
import { State } from "../../types/State"

export const usePost = <T, U>(callback?: (e: U | null) => void) => {
  const [state, setState] = useState<State<U>>({
    loading: false,
    details: null,
    errorMessage: null,
    error: false,
  })
  const post = useCallback(
    (opts: Opts<T>) => {
      setState({
        loading: true,
        details: null,
        error: false,
        errorMessage: null,
      })
      forumPost<T, U>(opts).then(resp => {
        if (resp.hasOwnProperty("success") && resp.success) {
          setState({
            details: resp?.data || null,
            error: false,
            errorMessage: null,
            loading: false,
          })
          callback && callback(resp.data)
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
      //     errorMessage: err as ApiError,
      //     loading: false,
      //   })
      // })
    },
    [state],
  )

  return { state, post }
}
