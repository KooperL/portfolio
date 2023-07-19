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
  }

  async request<T>(
    config: AxiosRequestConfig<T>,
    cacheKey: CacheKey 
  ) {
    switch (cacheKey.CacheMode) {
      case CacheMode.CacheFirst:
        const cachedData = this.store.get(cacheKey.CacheKey)
        this.instance.request(config).then(resp => {
          this.store.set(cacheKey.CacheKey, resp)
        })

        return cachedData
      case CacheMode.NetworkFirst:
        const resp = await this.instance.request(config)
        this.store.set(cacheKey.CacheKey, resp)
        return resp
    }
  }
}

export { ApiHandlerCore };
