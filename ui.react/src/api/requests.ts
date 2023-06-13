import { GenericResponse } from "@containers/App/api/types"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { ApiError, handleError } from "./apiErrorHandler"

const checkStatus = <T>(response: AxiosResponse) => {
  if (localStorage.getItem("environment") === "Local") {
    console.log(
      `-- incoming API response, status ${
        response.status
      }, data: ${JSON.stringify(response.data)}`,
    )
  }

  if (response.status >= 200 && response.status < 300) {
    return response.data
  }
  throw new Error()
  // Promise.reject(response.data)
}

const request = <T>(
  config: AxiosRequestConfig,
): Promise<GenericResponse<T, ApiError>> => {
  return new Promise((res) => {
    if (localStorage.getItem("environment") === "Local") {
      console.log(
        `-- outgoing API request, data: ${JSON.stringify(
          config.data ?? { None: "none" },
        )}`,
      )
    }

    const resp = axios(config)
      .then(response => res(checkStatus<GenericResponse<T, string>>(response)))
      .catch(response => res(handleError(response)))
  })
}

export default request
