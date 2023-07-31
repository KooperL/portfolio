import path from "path";
import { ApiHandlerCore } from "src/api/ApiHandlerCore";
import { CacheMode } from "src/api/ApiHandlerCore/types";
import { environmentConfig } from "src/api/environmentMappings";

const { apiHost } = environmentConfig()

const ApiConsumer = new ApiHandlerCore(
  {
    baseURL: apiHost.apiHost,
  },
  2,
  CacheMode.NetworkFirst,
)

export {
  ApiConsumer 
}
