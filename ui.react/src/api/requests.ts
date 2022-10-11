import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleError } from './apiErrorHandler'

const checkStatus = (response: AxiosResponse) => {

  if(localStorage.getItem('environment') === 'Local') {
    console.log(
      `-- incoming API response, status ${response.status}, data: ${JSON.stringify(response.data)}`
    );
  }

  // if(response.status.toString().match(/2[0-9][0-9]/g)?.length) {
  if(response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }

}

const request = (config: AxiosRequestConfig): Promise<any> => {
  if(localStorage.getItem('environment') === 'Local') {
    console.log(
      `-- outgoing API request, data: ${JSON.stringify(config.data ?? {None: 'none'})}`
    );
  }
  return axios(config)
  .then(response => checkStatus(response))
    .catch(handleError)
}

export default request;