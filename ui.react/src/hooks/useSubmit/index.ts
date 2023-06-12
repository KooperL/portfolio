// import { useState, useEffect, useCallback } from 'react';
// import { ApiError } from '../../api/apiErrorHandler';

import { GenericResponse } from "@containers/App/api/types"
import { useCallback, useState } from "react"
import { ApiError } from "../../api/apiErrorHandler"
import { State } from "../../types/State"

export const useSubmit = <T, U>(
  dataCall: (body: T) => Promise<GenericResponse<U, ApiError>>,
) => {
  const [state, setState] = useState<State<U>>({
    loading: false,
    details: null,
    error: false,
    errorMessage: null,
  })
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>, payload: T) => {
      event.preventDefault()
      dataCall(payload)
        .then(resp => {
          if (
            resp.hasOwnProperty("success") &&
            resp.success &&
            resp.hasOwnProperty("data")
          ) {
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
        .catch((err: any) => {
          const error: ApiError = {
            name: "React Error",
            code: -1,
            message: "Uncaught error",
          }
          setState({
            details: null,
            error: true,
            errorMessage: error,
            loading: false,
          })
        })
    },
    [dataCall, state],
  )

  return { state, handleSubmit }
}
