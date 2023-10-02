import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios"
import { CacheKey, CacheMode } from "./types"

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

  addResponseInterceptor(
    onFulfilled: (resp: AxiosResponse) => any,
    onError: any,
  ) {
    return this.instance.interceptors.response.use(onFulfilled, onError)
  }

  async request<T>(config: AxiosRequestConfig<T>, cacheKey: CacheKey) {
    return this.instance.request(config)
    switch (cacheKey.CacheMode) {
      case CacheMode.CacheFirst:
        this.instance.request(config).then(resp => {
          this.store.set(cacheKey.CacheKey, resp)
          // what if nothing in cache
        })
        const cachedData = this.store.get(cacheKey.CacheKey)
        return cachedData
      // TODO: correct way to do this

      case CacheMode.NetworkFirst:
        const resp = this.instance.request(config)
        // this.store.set(cacheKey.CacheKey, resp)
        return resp
      case CacheMode.NetworkOnly:
        return this.instance.request(config)
    }
  }
}

export { ApiHandlerCore }
