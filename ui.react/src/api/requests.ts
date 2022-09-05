import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleError } from './apiErrorHandler'

const checkStatus = (response: AxiosResponse) => {
  console.log(
    `-- incoming API response, status ${response.status}, data: ${JSON.stringify(response.data)}`
  );
  if(response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

const request = (config: AxiosRequestConfig): Promise<any> => {
  return axios(config)
  .then(response => checkStatus(response))
    .catch(handleError)
}

export default request;