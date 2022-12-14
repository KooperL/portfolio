import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError, handleError } from './apiErrorHandler'

const checkStatus = <T>(response: AxiosResponse) => {
  console.log('response.data')
  if(localStorage.getItem('environment') === 'Local') {
    console.log(
      `-- incoming API response, status ${response.status}, data: ${JSON.stringify(response.data)}`
    );
  }

  // if(response.status.toString().match(/2[0-9][0-9]/g)?.length) {
  if(response.status === 200 || response.status === 201) {
    return Promise.resolve(response.data as T);
  }
  throw new Error()
}

const request = <T>(config: AxiosRequestConfig): Promise<T | ApiError> => {
  if(localStorage.getItem('environment') === 'Local') {
    console.log(
      `-- outgoing API request, data: ${JSON.stringify(config.data ?? {None: 'none'})}`
    );
  }
  return axios(config)
    .then(response => checkStatus<T>(response))
    .catch(response => handleError(response))
}

export default request;