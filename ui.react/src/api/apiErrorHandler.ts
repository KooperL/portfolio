export interface ApiError {
  code: number;
  name: string;
  message: string;
}

export const handleError = (error: any): Promise<ApiError> => {
  console.log('error', error)
  const apiError = {
    code: error?.response?.status || 500,
    name: error?.response?.data?.statusText || 'API error',
    message: error?.response?.data?.error || 'handleError triggered for API call.',
  }
  return Promise.reject(apiError);
}
