import { GenericResponse } from "@containers/App/api/types"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { ApiError, handleError } from "./apiErrorHandler"

const checkStatus = <T>(response: AxiosResponse): GenericResponse<T, ApiError> => {
  if (localStorage.getItem("environment") === "Local") {
    console.log(
      `-- incoming API response, status ${
        response.status
      }, data: ${JSON.stringify(response.data)}`,
    )
  }

  if (response.status >= 200 && response.status < 300) {
  // Might get confusing here, the struct below is the appearance as the response but it was made here
    const returnVal: GenericResponse<T, ApiError> = {
      success: true,
      data: response.data.data,
      error: null
    }
    return returnVal
   }
   throw new Error()
  // Promise.reject(response.data)
}

const request = <T>(
  config: AxiosRequestConfig,
): Promise<GenericResponse<T, ApiError>> => {
  return new Promise((res, rej) => {
    if (localStorage.getItem("environment") === "Local") {
      console.log(
        `-- outgoing API request, data: ${JSON.stringify(
          config.data ?? { None: "none" },
        )}`,
      )
    }
    
    let returnVal: GenericResponse<T | null, ApiError>
    const resp = axios(config)
      .then(response => {returnVal = (checkStatus<T>(response))})
      .catch(failedResponse => {returnVal = (handleError(failedResponse))})
      // @ts-ignore again.... This language brother
      .finally(() => res(returnVal))
  })
}

export default request
