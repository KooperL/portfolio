import { AxiosError } from 'axios'
import { ApiHandlerCore } from 'src/api/ApiHandlerCore'
import { CacheMode } from 'src/api/ApiHandlerCore/types'
import { environmentConfig } from 'src/api/environmentMappings'
import { cmsPath } from './types'
import { v4 } from 'uuid'

const apiHost = environmentConfig()

const fetchCMS = new ApiHandlerCore(
  {
    baseURL: `${apiHost.apiHost.toString()}/${cmsPath}`,
    headers: {
      'X-Request-ID': v4(),
    },
  },
  2,
  CacheMode.NetworkFirst,
)

{
  /** 
  fetchCMS.addResponseInterceptor(
    response => response,
    async (error) => {
      if (error.config && error.response && error.response.status !== 429) {
  
        // await new Promise(resolve => setTimeout(resolve, fetchCMS.retryTimeSeconds/1000));
  
        // return fetchCMS.request(error.config, {
        //   CacheMode: CacheMode.NetworkFirst,
        //   CacheKey: null,
        // });
      }
      return Promise.reject(error);
    },
  );
*/
}

export { fetchCMS }
