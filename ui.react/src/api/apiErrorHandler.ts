interface ApiError {
  code: number;
  name: string;
  message: string;
}

export const handleError = (error: any): Promise<ApiError> => {
  const apiError = {
    code: error?.code || 500,
    name: error?.name || 'API Error',
    message: error?.message || 'handleError triggered for API call.',
  }
  return Promise.reject(apiError);
}
