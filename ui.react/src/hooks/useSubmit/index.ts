// import { useState, useEffect, useCallback } from 'react';
// import { ApiError } from '../../api/apiErrorHandler';

import { useCallback, useState } from "react"
import { ApiError } from "../../api/apiErrorHandler"
import { State } from "../../types/State"

export const useSubmit = <T, U>(
  dataCall: (body: U) => Promise<ApiError | T>,
) => {
  const [state, setState] = useState<State<T>>({
    loading: false,
    details: undefined,
    error: false,
  })
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>, payload: U) => {
      event.preventDefault()

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

  return { state, handleSubmit }
}
