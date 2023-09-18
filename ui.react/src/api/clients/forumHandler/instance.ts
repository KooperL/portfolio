import { ApiHandlerCore } from "src/api/ApiHandlerCore"
import { CacheMode } from "src/api/ApiHandlerCore/types"
import { environmentConfig } from "src/api/environmentMappings"
import { forumPath } from "./types"

const apiHost = environmentConfig()

const fetchForum = new ApiHandlerCore(
  {
    baseURL: `${apiHost.apiHost.toString()}/${forumPath}`,
  },
  2,
  CacheMode.NetworkOnly,
)

export { fetchForum }
