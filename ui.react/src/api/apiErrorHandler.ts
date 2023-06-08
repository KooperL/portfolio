import { GenericResponse } from "@containers/App/api/types"

export interface ApiError {
  code: number
  name: string
  message: string
}

// type RejectedPromise<T> = Promise<T> & {
//   error: {
//     <state>: "rejected",
//     <reason>: ApiError
//   }
// }

export const handleError = (error: any): GenericResponse<null, ApiError> => {
  console.log("error", error)
  const apiError: ApiError = {
    code: error?.response?.status || 500,
    name: error?.response?.data?.statusText || "API error",
    message:
      error?.response?.data?.error || "handleError triggered for API call.",
  }
  const returnVal: GenericResponse<null, ApiError> = {
    success: false,
    data: null,
    error: apiError
  }
  return returnVal 
}
