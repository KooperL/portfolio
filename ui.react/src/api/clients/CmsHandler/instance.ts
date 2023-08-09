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

export {
  fetchCMS
}
