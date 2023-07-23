import { environmentConfig } from "@containers/App/api/environmentMappings";
import path from "path";
import { ApiHandlerCore } from "src/api/ApiHandlerCore";
import { CacheMode } from "src/api/ApiHandlerCore/types";

const { apiHost } = environmentConfig()

const fetchCMS = new ApiHandlerCore(
  {
    baseURL: apiHost.apiHost,
  },
  2,
  CacheMode.NetworkFirst,
)

export {
  fetchCMS
}
