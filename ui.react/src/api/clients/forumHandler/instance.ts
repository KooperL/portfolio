import { environmentConfig } from "@containers/App/api/environmentMappings";
import { ApiHandlerCore } from "src/api/ApiHandlerCore";
import { CacheMode } from "src/api/ApiHandlerCore/types";

const { apiHost } = environmentConfig()

const fetchForum = new ApiHandlerCore(
  {
    baseURL: apiHost.apiHost,
  },
  2,
  CacheMode.NetworkFirst,
)

export {
  fetchForum 
}
