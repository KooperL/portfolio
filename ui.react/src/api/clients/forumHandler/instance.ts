import { ApiHandlerCore } from 'src/api/ApiHandlerCore'
import { CacheMode } from 'src/api/ApiHandlerCore/types'
import { environmentConfig } from 'src/api/environmentMappings'
import { forumPath } from './types'
import { v4 } from 'uuid'

const apiHost = environmentConfig()

const fetchForum = new ApiHandlerCore(
  {
    baseURL: `${apiHost.apiHost.toString()}/${forumPath}`,
    headers: {
      'X-Request-ID': v4(),
    },
  },
  2,
  CacheMode.NetworkOnly,
)

export { fetchForum }
