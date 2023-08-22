import { AxiosError } from "axios";
import { ApiHandlerCore } from "src/api/ApiHandlerCore";
import { CacheMode } from "src/api/ApiHandlerCore/types";
import { environmentConfig } from "src/api/environmentMappings";
import { cmsPath } from "./types";

const apiHost = environmentConfig()

const fetchCMS = new ApiHandlerCore(
  {
    baseURL: `${apiHost.apiHost.toString()}/${cmsPath}`,
  },
  2,
  CacheMode.NetworkFirst,
)

fetchCMS.addResponseInterceptor(
  (response) => response,
  (error: AxiosError) => {
    if (error.config && error.response && error.response.status !== 429) {
      // setTimeout(() => {}, fetchCMS.retryTimeSeconds)
      
      return fetchCMS.request(error.config, {
        CacheMode: CacheMode.NetworkFirst,
        CacheKey: null
      });
  }
      return Promise.reject(error);
    })

export {
  fetchCMS
}
