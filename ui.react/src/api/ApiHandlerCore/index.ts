import axios, { Axios, AxiosRequestConfig } from "axios";
import { CacheKey, CacheMode } from "./types";

class ApiHandlerCore {
  instance: Axios
  retryTimeSeconds: number
  defaultCacheMode: CacheMode
  store = new Map() 

  constructor(
    config: AxiosRequestConfig,
    retryTimeSeconds: number,
    defaultCacheMode: CacheMode,
  ) {
    this.instance = axios.create(config)
    this.retryTimeSeconds = retryTimeSeconds
    this.defaultCacheMode = defaultCacheMode

    this.instance.interceptors.response.use((response) => response, (error) => {
      if (error.config && error.response && error.response.status !== 429) {
          return axios.request(error.config);
      }
      return Promise.reject(error);
    })
  };

  async request<T>(
    config: AxiosRequestConfig<T>,
    cacheKey: CacheKey 
  ) {
    switch (cacheKey.CacheMode) {
      case CacheMode.CacheFirst:
        // const cachedData = this.store.get(cacheKey.CacheKey)
        // this.instance.request(config).then(resp => {
        //   this.store.set(cacheKey.CacheKey, resp)
        // })
        // return cachedData
        const resp1 = this.instance.request(config)
        return resp1

      case CacheMode.NetworkFirst:
        const resp = this.instance.request(config)
        this.store.set(cacheKey.CacheKey, resp)
        return resp
    }
  }
}

export { ApiHandlerCore };
