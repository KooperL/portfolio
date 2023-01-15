export interface ApiError {
  code: number;
  name: string;
  message: string;
}

// type RejectedPromise<T> = Promise<T> & {
//   error: {
//     <state>: "rejected",
//     <reason>: ApiError
//   }
// }

export const handleError = (error: any): ApiError => {
  console.log('error', error)
  const apiError = {
    code: error?.response?.status || 500,
    name: error?.response?.data?.statusText || 'API error',
    message: error?.response?.data?.error || 'handleError triggered for API call.',
  }
  return apiError;
}
