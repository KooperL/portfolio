import { AxiosRequestConfig } from "axios";
import { Payload } from "../containers/App/api/types";
import request from "./requests";

const noCacheHeaders = {
  'cacheControl': 'no-cache'
};

const defaultOptions = {
  headers: {
    // 'Accept': 'application/json',
    // 'access-control-allow-origin': 'http://localhost:5000',
    // 'Sec-Fetch-Site': 'same-site'
  },
  // Other headers
}

export const get = async<T> (
  url: string,
  options: AxiosRequestConfig,
  noCache: Boolean = true                                   // TODO
): Promise<T> => {
  const requestConfig: AxiosRequestConfig = {
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(noCache && noCacheHeaders),
      ...options.headers,
      ...(options.hasOwnProperty('data') && {'content-type': 'application/json'})
    },
    method: 'GET',
    url: url
  };
  return request(requestConfig);
}


export const post = async<T> (
  url: string,
  options: AxiosRequestConfig,
  noCache: Boolean = true                                   // TODO
): Promise<T> => {
  const requestConfig: AxiosRequestConfig = {
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(noCache && noCacheHeaders),
      ...options.headers,
      ...(options.hasOwnProperty('data') && {'content-type': 'application/json'})
    },
    method: 'POST',
    url: url
  };

  return request(requestConfig);
}